package com.usagi.sorimaeul.api.service;

import com.usagi.sorimaeul.dto.dto.CoverInfoDto;
import com.usagi.sorimaeul.dto.dto.CoverSourceInfoDto;
import com.usagi.sorimaeul.dto.request.CoverBoardRequest;
import com.usagi.sorimaeul.dto.request.CoverCreateRequest;
import com.usagi.sorimaeul.dto.response.CoverCreateResponse;
import com.usagi.sorimaeul.dto.response.CoverDetailResponse;
import com.usagi.sorimaeul.dto.response.CoverListResponse;
import com.usagi.sorimaeul.dto.response.CoverSourceListResponse;
import com.usagi.sorimaeul.entity.*;
import com.usagi.sorimaeul.repository.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.client.WebClient;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Transactional
public class CoverServiceImpl implements CoverService {

    private final CoverRepository coverRepository;
    private final UserRepository userRepository;
    private final LikeRepository likeRepository;
    private final VoiceModelRepository voiceModelRepository;
    private final CoverSourceRepository coverSourceRepository;
    private final S3Service s3Service;

    // AI 커버 리스트 조회
    public ResponseEntity<CoverListResponse> getCoverList(long userCode, String target, String keyword, Integer page) {
        // 사용자 정보 확인
        User user = userRepository.getUser(userCode);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        // 배열 선언
        List<Cover> covers = new ArrayList<>();
        List<CoverInfoDto> customCovers = new ArrayList<>();
        // 인덱스 선언
        int startIdx = 0;
        int endIdx = 0;
        // 총 페이지 수 선언
        int totalPages = 1;
        // 모든 게시물 조회
        if (target.equals("all")) {
            // keyword 가 null 이면 전체 조회, isComplete = true : 제작 완료된 게시물만
            if (keyword == null) covers = coverRepository.findByIsCompleteAndIsPublic(true, true);
            // keyword 가 null 이 아니면 CoverName = keyword 인 데이터 조회, isComplete = true : 제작 완료된 게시물만, isPublic = true : 공개 설정된 게시물만
            else covers = coverRepository.findByCoverNameContainingAndIsCompleteAndIsPublic(keyword, true, true);
            // page 가 null 이 아니면
            if (page != null) {
                // 한 페이지 당 10개씩 조회, 초과 페이지 요청시 마지막 페이지 조회
                startIdx = Math.min((page - 1) * 10, covers.size()) / 10 * 10;
                endIdx = Math.min(startIdx + 10, covers.size());
            }
            // page 가 null 이면 전체 조회
            else {
                endIdx = covers.size();
            }
            // 총 페이지 수 계산
            totalPages = (int) Math.ceil((double) covers.size() / 10);

        // 마이 페이지 - 나의 게시물 조회
        } else if (target.equals("mine")) {
            // keyword 가 null 이면 내 게시물 모두 조회
            if (keyword == null) covers = coverRepository.findByUser_userCode(userCode);
            // keyword 가 null 이 아니면 CoverName = keyword 인 내 게시물 조회
            else covers = coverRepository.findByCoverNameContainingAndUser_UserCode(keyword, userCode);
            // page 가 null 이 아니면
            if (page != null) {
            // 한 페이지 당 6개씩 조회, 초과 페이지 요청시 마지막 페이지 조회
                startIdx = Math.min((page - 1) * 6, covers.size()) / 6 * 6;
                endIdx = Math.min(startIdx + 6, covers.size());
            }
            // page 가 null 이면 전체 조회
            else {
                endIdx = covers.size();
            }
            // // 총 페이지 수 계산
            totalPages = (int) Math.ceil((double) covers.size() / 6);

        // 마이 페이지 - 관심 컨텐츠 - 좋아요 누른 게시물 조회
        } else if (target.equals("like")){
            // 나의 유저 코드와 일치하는 like 리스트를 가져온다. (isComplete 처리를 하지 않은 이유 : 제작 완료되지 않은 게시물에 좋아요를 누를 수 없다.)
            List<Like> likes = likeRepository.findByUser_userCode(userCode);
            // like 와 매핑되는 Cover 들을 covers 에 넣는다.
            for (Like like : likes) {
                Cover cover = like.getCover();
                // 공개 설정, 제작 완료된 것만 추가
                if (cover != null && cover.getIsPublic() && cover.getIsComplete()) {
                    covers.add(cover);
                }
            }
            // page 가 null 이 아니면
            if (page != null) {
                // 한 페이지 당 6개씩 조회, 초과 페이지 요청시 마지막 페이지 조회
                startIdx = Math.min((page - 1) * 6, covers.size()) / 6 * 6;
                endIdx = Math.min(startIdx + 6, covers.size());
            }
            // page 가 null 이면 전체 조회
            else {
                endIdx = covers.size();
            }

            // 총 페이지 수 계산
            totalPages = (int) Math.ceil((double) covers.size() / 6);

        // 인기 게시글 조회
        } else if (target.equals("popular")) {
            // 커버 게시글 좋아요 순, 최신 순으로 5개 조회
            covers = coverRepository.findTop5ByIsCompleteAndIsPublicOrderByLikeCountDescCoverCodeDesc(true, true);
            // 인덱스 0 ~ covers.size() 로 정의
            endIdx = covers.size();
        }
        // 최신순으로 보여주기 위해 covers 뒤집기
        if (!target.equals("popular")) reverseList(covers);
        // cover 리스트 페이지네이션
        List<Cover> pageCovers = covers.subList(startIdx, endIdx);
        // cover 리스트를 순회
        for (Cover cover : pageCovers) {
            // Dto 에 담기
            CoverInfoDto coverInfoDto = CoverInfoDto.builder()
                    .coverCode(cover.getCoverCode())
                    .coverName(cover.getCoverName())
                    .storagePath(cover.getStoragePath())
                    .isPublic(cover.getIsPublic())
                    .likeCount(cover.getLikeCount())
                    .thumbnailPath(cover.getThumbnailPath())
                    .nickname(cover.getUser().getNickname())
                    .profileImage(cover.getUser().getProfileImage())
                    .coverSinger(cover.getCoverSinger())
                    .singer(cover.getSinger())
                    .title(cover.getTitle())
                    .isComplete(cover.getIsComplete())
                    .createdTime(cover.getCreatedTime())
                    .postTime(cover.getPostTime())
                    .build();
            // customCovers 에 담기
            customCovers.add(coverInfoDto);
        }

        // 리스폰스 생성
        CoverListResponse coverListResponse = CoverListResponse.builder()
                .covers(customCovers)
                .totalPages(totalPages)
                .build();

        return ResponseEntity.ok(coverListResponse);
    }


    // AI 커버 상세 조회
    public ResponseEntity<?> getCoverDetail(long userCode, int coverCode) {
        // 사용자 정보 확인
        User user = userRepository.getUser(userCode);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        Cover cover = coverRepository.findByCoverCode(coverCode);
        // 비공개인데 작성자가 아닌 경우 BadRequest 반환
        if (!cover.getIsPublic() && cover.getUser() != user)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("접근이 불가능한 AI 커버입니다.");

        boolean isLiked;
        isLiked = likeRepository.findByUser_userCodeAndCover_coverCode(userCode, coverCode) != null;
        // 리스폰스 생성
        CoverDetailResponse response = CoverDetailResponse.builder()
                .coverName(cover.getCoverName())
                .coverDetail(cover.getCoverDetail())
                .storagePath(cover.getStoragePath())
                .likeCount(cover.getLikeCount())
                .thumbnailPath(cover.getThumbnailPath())
                .nickname(cover.getUser().getNickname())
                .profileImage(cover.getUser().getProfileImage())
                .coverSinger(cover.getCoverSinger())
                .singer(cover.getSinger())
                .title(cover.getTitle())
                .isLiked(isLiked)
                .isComplete(cover.getIsComplete())
                .isPublic(cover.getIsPublic())
                .createdTime(cover.getCreatedTime())
                .postTime(cover.getPostTime())
                .build();

        return ResponseEntity.ok(response);
    }


    // AI 커버 생성
    public ResponseEntity<?> createCover(long userCode, CoverCreateRequest request) {
        // 사용자 정보 확인
        User user = userRepository.getUser(userCode);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        VoiceModel voiceModel = voiceModelRepository.findByModelCode(request.getModelCode());
        // 클라이언트의 모델이 맞는지 검증
        if (voiceModel.getUser() != user && voiceModel.getUser() != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("타인의 모델로는 AI 커버를 생성할 수 없습니다.");
        }

        // 더빙 영상용 모델에는 접근 불가
        if (voiceModel.getVideoSource() != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("더빙용 모델로는 AI 커버를 생성할 수 없습니다.");
        }

        // 학습 가능한 상태의 모델이 아니면 400 반환
        if (voiceModel.getState() != 3) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("해당 모델은 AI 커버를 생성할 수 있는 상태가 아닙니다. 학습이 완료된 후에 시도해주세요.");
        }

        // 커버 가능 횟수가 남아있지 않으면 400 반환
        if (user.getCoverCount() < 1) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("AI 커버 생성 가능 횟수를 모두 소진하였습니다. 결제후 이용해주세요.");
        }

        // coverCode 자동 생성, coverDetail, thumbnailPath 나중에 입력, createdTime & postTime = null, likeCount 기본값 0
        Cover cover = Cover.builder()
                .user(user)
                .coverName(request.getCoverName())
                .coverSinger(voiceModel.getModelName())
                .singer(request.getSinger())
                .title(request.getTitle())
                .build();
        coverRepository.save(cover);
        int coverCode = cover.getCoverCode();

        // 커버 생성시 커버 가능 횟수 1 차감
        user.setCoverCount(user.getCoverCount() - 1);
        userRepository.save(user);

        // GPU 서버에 AI 커버 생성 요청 보내기
        String youtubeLink = request.getYoutubeLink();
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("youtubeLink", youtubeLink);
        requestBody.put("userCode", userCode);
        requestBody.put("modelCode", request.getModelCode());
        requestBody.put("coverCode", coverCode);
        requestBody.put("coverName", request.getCoverName());
        requestBody.put("pitch", request.getPitch());
        try {
            WebClient.create("http://222.107.238.124:7866")
                    .post()
                    .uri("/rvc/cover")
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();
            // response 반환
            CoverCreateResponse response = CoverCreateResponse.builder()
                    .coverCode(coverCode)
                    .build();

            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            // 실패했으면 커버 삭제
            coverRepository.delete(cover);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("AI 커버 생성 실패: " + e.getMessage());
        }
    }


    // AI 커버 등록/수정
    public ResponseEntity<?> createCoverBoard(long userCode, int coverCode, CoverBoardRequest request) {
        // 사용자 정보 확인
        User user = userRepository.getUser(userCode);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        Cover cover = coverRepository.findByCoverCode(coverCode);
        // 클라이언트와 커버 생성자 일치하지 않으면 400 반환
        User coverCreator = cover.getUser();
        if (coverCreator != user) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        // 비공개 -> 공개 설정시 postTime 이 null 이면 postTime 업데이트
        if (request.getIsPublic() && !cover.getIsPublic() && cover.getPostTime() == null) {
            cover.setPostTime(LocalDateTime.now());
        }
        System.out.println(request.getIsPublic());
        // 커버 수정
        cover.setCoverName(request.getCoverName());
        cover.setCoverDetail(request.getCoverDetail());
        cover.setThumbnailPath(request.getThumbnailPath());
        cover.setIsPublic(request.getIsPublic());
        coverRepository.save(cover);

        return ResponseEntity.status(HttpStatus.OK).body("수정 성공");

    }


    // AI 커버 게시글 삭제
    public ResponseEntity<?> deleteCover(long userCode, int coverCode) {
        // 사용자 정보 확인
        User user = userRepository.getUser(userCode);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        Cover cover = coverRepository.findByCoverCode(coverCode);
        // 클라이언트와 커버 생성자 일치하지 않으면 400 반환
        User coverCreator = cover.getUser();
        if (coverCreator != user) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("타인의 게시글에는 접근할 수 없습니다.");
        }

        // 커버 삭제
        coverRepository.deleteById(coverCode);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("삭제 성공");
    }


    // 생성된 AI 커버 저장
    public ResponseEntity<?> saveCreatedCover(int coverCode, MultipartFile file)  {
        Cover cover = coverRepository.findByCoverCode(coverCode);
        String folderPath = "cover/";
        String fileName = "cover_" + coverCode + ".mp3";

        // 변환된 파일을 s3에 저장
        byte[] responseFile;
        try {
            responseFile = file.getBytes();
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("파일을 읽는 중 오류가 발생했습니다.");
        }
        s3Service.saveByteToS3(folderPath + fileName, responseFile);

        // 완료 표시와 생성 시간 업데이트
        cover.setCreatedTime(LocalDateTime.now());
        cover.setStoragePath(folderPath + fileName);
        coverRepository.save(cover);
        return ResponseEntity.status(HttpStatus.CREATED).body("저장 성공!");
    }


    // AI 커버 소스 목록 조회
    public ResponseEntity<?> getCoverSourceList(long userCode) {
        // 사용자 정보 확인
        User user = userRepository.getUser(userCode);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        List<CoverSource> coverSources = coverSourceRepository.findAll(Sort.by("singer", "title"));
        List<CoverSourceInfoDto> coverSourceInfoDtos = new ArrayList<>();
        for (CoverSource coverSource : coverSources) {
            CoverSourceInfoDto coverSourceInfoDto = CoverSourceInfoDto.builder()
                    .coverSourceCode(coverSource.getCoverSourceCode())
                    .singer(coverSource.getSinger())
                    .title(coverSource.getTitle())
                    .youtubeLink(coverSource.getYoutubeLink())
                    .thumbnailPath(coverSource.getThumbnailPath())
                    .build();
            coverSourceInfoDtos.add(coverSourceInfoDto);
        }

        CoverSourceListResponse response = CoverSourceListResponse.builder()
                .coverSources(coverSourceInfoDtos)
                .build();

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }


    // AI 커버 생성 성공 여부 확인
    public ResponseEntity<String> checkCoverCreate(int coverCode, Boolean isSuccess) {
        if (!isSuccess) {
            coverRepository.deleteById(coverCode);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("AI 커버 생성에 실패했습니다.");
        } else {
            Cover cover = coverRepository.findByCoverCode(coverCode);
            cover.setIsComplete(true);
            return ResponseEntity.status(HttpStatus.OK).body("AI 커버 생성에 성공했습니다.");
        }
    }


    // 리스트 뒤집기
    public void reverseList(List<Cover> list) {
        int start = 0;
        int end = list.size() - 1;

        while (start < end) {
            // 리스트의 앞과 뒤 요소를 교환
            Cover temp = list.get(start);
            list.set(start, list.get(end));
            list.set(end, temp);

            // 다음 요소로 이동
            start++;
            end--;
        }
    }

}
