package com.usagi.sorimaeul.api.service;

import com.usagi.sorimaeul.dto.dto.PlaylistCoverInfoDto;
import com.usagi.sorimaeul.dto.dto.PlaylistInfoDto;
import com.usagi.sorimaeul.dto.request.PlaylistCreateRequest;
import com.usagi.sorimaeul.dto.request.PlaylistUpdateRequest;
import com.usagi.sorimaeul.dto.response.PlaylistCreateResponse;
import com.usagi.sorimaeul.dto.response.PlaylistDetailResponse;
import com.usagi.sorimaeul.dto.response.PlaylistListResponse;
import com.usagi.sorimaeul.entity.Cover;
import com.usagi.sorimaeul.entity.Playlist;
import com.usagi.sorimaeul.entity.PlaylistCover;
import com.usagi.sorimaeul.entity.User;
import com.usagi.sorimaeul.repository.CoverRepository;
import com.usagi.sorimaeul.repository.PlaylistCoverRepository;
import com.usagi.sorimaeul.repository.PlaylistRepository;
import com.usagi.sorimaeul.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class PlaylistServiceImpl implements PlaylistService {

    private final UserRepository userRepository;
    private final PlaylistRepository playlistRepository;
    private final PlaylistCoverRepository playlistCoverRepository;
    private final CoverRepository coverRepository;

    // 플레이리스트 전체 조회
    public ResponseEntity<PlaylistListResponse> getPlaylistList(long userCode, Integer page) {
        // 사용자 정보 확인
        User user = userRepository.getUser(userCode);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        // 클라이언트 userCode 와 일치하는 Playlist 모두 조회
        List<Playlist> playlists = playlistRepository.findByUser_UserCode(userCode);
        List<PlaylistInfoDto> playlistInfoDtos = new ArrayList<>();
        // 인덱스 선언
        int startIdx = 0;
        int endIdx = 0;
        // 총 페이지 수 선언
        int totalPages = 1;
        if (page != null) {
            // 한 페이지 당 10개씩 조회
            startIdx = Math.min((page - 1) * 8, playlists.size()) / 8 * 8;
            endIdx = Math.min(startIdx + 8, playlists.size());
            // 총 페이지 수 계산
            totalPages = (int) Math.ceil((double) playlists.size() / 8);
        }
        // page 가 null 이면 전체 조회
        else {
            endIdx = playlists.size();
        }
        // 최신순으로 보여주기 위해 covers 뒤집기
        reverseList(playlists);
        // cover 리스트 페이지네이션
        List<Playlist> pagePlaylists = playlists.subList(startIdx, endIdx);

        // 플레이리스트들을 순회하며
        for (Playlist playlist : pagePlaylists) {
            // playlistInfoDto 생성
            PlaylistInfoDto playlistInfoDto = PlaylistInfoDto.builder()
                    .playlistCode(playlist.getPlaylistCode())
                    .playlistName(playlist.getPlaylistName())
                    .createdTime(playlist.getCreatedTime())
                    .build();
            
            // playlistInfoDtos 리스트에 추가
            playlistInfoDtos.add(playlistInfoDto);
        }
        
        // 리스폰스 생성
        PlaylistListResponse playlistListResponse = PlaylistListResponse.builder()
                .playlists(playlistInfoDtos)
                .totalPages(totalPages)
                .build();

        return ResponseEntity.status(HttpStatus.OK).body(playlistListResponse);

    }


    // 플레이리스트 상세 조회 - AI 커버 리스트 조회
    public ResponseEntity<?> getPlaylistCoverList(long userCode, int playlistCode) {
        // 사용자 정보 확인
        User user = userRepository.getUser(userCode);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        // 예외 처리
        // 플레이리스트 존재하지 않으면 404 반환
        Playlist playlist = playlistRepository.findByPlaylistCode(playlistCode);
        if (playlist == null) {
            return  ResponseEntity.status(HttpStatus.NOT_FOUND).body("플레이리스트가 존재하지 않습니다.");
        }
        // 플레이리스트 생성자 조회
        User playlistCreator = playlist.getUser();
        // 클라이언트와 플레이리스트 생성자가 일치하지 않으면 400 반환
        if (user != playlistCreator) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("타인의 플레이리스트에는 접근할 수 없습니다.");
        }


        // PlaylistCode 로 플레이리스트 조회하기
        List<PlaylistCover> playlistCovers = playlistCoverRepository.findByPlaylist_PlaylistCode(playlistCode);
        // PlaylistCoverInfoDto 리스트 빈 리스트 생성
        List<PlaylistCoverInfoDto> playlistCoverInfoDtos = new ArrayList<>();
        // AI 커버 목록 순회하며
        for (PlaylistCover playlistCover : playlistCovers) {
            // 커버 불러오기
            Cover cover = playlistCover.getCover();
            // Dto 에 값 넣기
            PlaylistCoverInfoDto playlistCoverInfoDto = PlaylistCoverInfoDto.builder()
                    .coverCode(cover.getCoverCode())
                    .coverSinger(cover.getCoverSinger())
                    .singer(cover.getSinger())
                    .title(cover.getTitle())
                    .nickname(cover.getUser().getNickname())
                    .storagePath(cover.getStoragePath())
                    .isPublic(cover.getIsPublic())
                    .build();
            // List 안에 Dto 추가
            playlistCoverInfoDtos.add(playlistCoverInfoDto);
        }

        // 반환할 Dto 생성
        PlaylistDetailResponse playlistDetailResponse = PlaylistDetailResponse.builder()
                .playlist(playlistCoverInfoDtos)
                .build();

        return ResponseEntity.status(HttpStatus.OK).body(playlistDetailResponse);
    }


    // 플레이리스트 - AI 커버 추가
    public ResponseEntity<?> addPlaylistCover(long userCode, int playlistCode, int coverCode) {
        // 사용자 정보 확인
        User user = userRepository.getUser(userCode);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        // 예외 처리
        // playlistCode 로 플레이리스트 조회
        Playlist playlist = playlistRepository.findByPlaylistCode(playlistCode);
        // 데이터 없으면 404 반환
        if (playlist == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("플레이리스트가 존재하지 않습니다.");
        }
        // 플레이리스트 생성자 조회
        User playlistCreator = playlist.getUser();
        // 클라이언트와 플레이리스트 생성자가 일치하지 않으면 400 반환
        if (user != playlistCreator) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("타인의 플레이리스트에는 접근할 수 없습니다.");
        }
        // 이미 플레이리스트에 해당 AI 커버가 존재하면 400 반환
        PlaylistCover tempPlaylistCover = playlistCoverRepository.findByPlaylist_PlaylistCodeAndCover_CoverCode(playlistCode, coverCode);
        if (tempPlaylistCover != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("플레이리스트에 이미 해당 AI 커버가 존재합니다.");
        }
        // 제작 완료 여부, 공개 여부에 따른 예외 처리
        Cover cover = coverRepository.findByCoverCode(coverCode);
        if (!cover.getIsComplete() || !cover.getIsPublic()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("해당 AI 커버에는 접근할 수 없습니다.");
        }

        
        // 플레이리스트 코드로 AI 커버들을 조회후 개수 + 1만큼 index 값 정하기
        List<PlaylistCover> playlistCovers = playlistCoverRepository.findByPlaylist_PlaylistCode(playlistCode);
        int coverIndex;
        if (playlistCovers.isEmpty()) {
            coverIndex = 1;
        } else {
            coverIndex = playlistCovers.size() + 1;
        }

        // 플레이리스트에 커버 생성
        PlaylistCover playlistCover = PlaylistCover.builder()
                .playlist(playlistRepository.findByPlaylistCode(playlistCode))
                .cover(cover)
                .coverIndex(coverIndex)
                .build();
        playlistCoverRepository.save(playlistCover);

        return ResponseEntity.status(HttpStatus.CREATED).body("추가 성공!");
    }


    // 플레이리스트 - AI 커버 삭제
    public ResponseEntity<?> deletePlaylistCover(long userCode, int playlistCode, int coverCode) {
        // 사용자 정보 확인
        User user = userRepository.getUser(userCode);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        // 예외 처리
        // 클라이언트가 요청한 플레이리스트가 존재하지 않으면 404 반환
        // playlistCode 로 플레이리스트 조회
        Playlist playlist = playlistRepository.findByPlaylistCode(playlistCode);
        if (playlist == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("플레이리스트가 존재하지 않습니다.");
        }
        // 클라이언트와 플레이리스트 생성자가 일치하지 않으면 400 반환
        // 플레이리스트 생성자 조회
        User playlistCreator = playlist.getUser();
        if (user != playlistCreator) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("타인의 플레이리스트에는 접근할 수 없습니다.");
        }
        // 요청한 AI 커버 데이터가 없으면 404 반환
        // 플레이리스트 코드와 커버 코드가 일치하는 값 찾기
        PlaylistCover playlistCover = playlistCoverRepository.findByPlaylist_PlaylistCodeAndCover_CoverCode(playlistCode, coverCode);
        if (playlistCover == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("해당 플레이리스트 안에 해당 AI 커버가 존재하지 않습니다.");
        }


        // coverIndex 값 저장해두기
        int coverIndex = playlistCover.getCoverIndex();
        // 커버 삭제
        playlistCoverRepository.delete(playlistCover);
        // 플레이리스트의 커버들을 가져옴
        List<PlaylistCover> playlistCovers = playlistCoverRepository.findByPlaylist_PlaylistCode(playlistCode);
        // 순회하면서 index 가 더 큰 것들 index 1씩 감소 시키기
        for (PlaylistCover cover : playlistCovers) {
            if (cover.getCoverIndex() > coverIndex) {
                cover.setCoverIndex(cover.getCoverIndex() - 1);
            }
        }
        // 바뀐 인덱스 모두 저장
        playlistCoverRepository.saveAll(playlistCovers);

        return ResponseEntity.status(HttpStatus.OK).body("삭제 성공!");

    }


    // 플레이리스트 생성
    public ResponseEntity<?> createPlaylist(long userCode, PlaylistCreateRequest request) {
        // 사용자 정보 확인
        User user = userRepository.getUser(userCode);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        // 플레이리스트 생성
        // playlist_code = auto_increment, created_time = now()
        Playlist playlist = Playlist.builder()
                .user(user)
                .playlistName(request.getPlaylistName())
                .build();

        playlistRepository.save(playlist);

        PlaylistCreateResponse response = PlaylistCreateResponse.builder()
                .playlistCode(playlist.getPlaylistCode())
                .playlistName(playlist.getPlaylistName())
                .createdTime(playlist.getCreatedTime())
                .build();

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }


    // 플레이리스트 수정
    public ResponseEntity<?> updatePlaylist(long userCode, int playlistCode, PlaylistUpdateRequest request) {
        // 사용자 정보 확인
        User user = userRepository.getUser(userCode);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        // 예외 처리
        // 클라이언트가 요청한 플레이리스트가 존재하지 않으면 404 반환
        // playlistCode 로 플레이리스트 조회
        Playlist playlist = playlistRepository.findByPlaylistCode(playlistCode);
        // 데이터 없으면 404 반환
        if (playlist == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("플레이리스트가 존재하지 않습니다.");
        }
        // 클라이언트와 플레이리스트 생성자가 일치하지 않으면 400 반환
        // 플레이리스트 생성자 조회
        User playlistCreator = playlist.getUser();
        if (user != playlistCreator) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("타인의 플레이리스트에는 접근할 수 없습니다.");
        }


        // 플레이리스트 이름 변경
        playlist.setPlaylistName(request.getPlaylistName());
        // 변동사항 반영
        playlistRepository.save(playlist);

        return ResponseEntity.status(HttpStatus.OK).body("수정 성공!");
    }


    // 플레이리스트 삭제
    public ResponseEntity<?> deletePlaylist(long userCode, int playlistCode) {
        // 사용자 정보 확인
        User user = userRepository.getUser(userCode);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        // 예외 처리
        // 클라이언트가 요청한 플레이리스트가 존재하지 않으면 404 반환
        // playlistCode 로 플레이리스트 조회
        Playlist playlist = playlistRepository.findByPlaylistCode(playlistCode);
        if (playlist == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("플레이리스트가 존재하지 않습니다.");
        }
        // 클라이언트와 플레이리스트 생성자가 일치하지 않으면 400 반환
        // 플레이리스트 생성자 조회
        User playlistCreator = playlist.getUser();
        if (user != playlistCreator) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("타인의 플레이리스트에는 접근할 수 없습니다.");
        }

        // 삭제
        playlistRepository.delete(playlist);

        return ResponseEntity.status(HttpStatus.CREATED).body("삭제 성공!");
    }


    public void reverseList(List<Playlist> list) {
        int start = 0;
        int end = list.size() - 1;

        while (start < end) {
            // 리스트의 앞과 뒤 요소를 교환
            Playlist temp = list.get(start);
            list.set(start, list.get(end));
            list.set(end, temp);

            // 다음 요소로 이동
            start++;
            end--;
        }
    }

}
