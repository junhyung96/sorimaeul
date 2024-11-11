package com.usagi.sorimaeul.api.service;

import com.usagi.sorimaeul.dto.dto.DubbingInfoDto;
import com.usagi.sorimaeul.dto.dto.VideoSourceInfoDto;
import com.usagi.sorimaeul.dto.dto.VideoSourceVoiceInfoDto;
import com.usagi.sorimaeul.dto.request.*;
import com.usagi.sorimaeul.dto.response.*;
import com.usagi.sorimaeul.entity.*;
import com.usagi.sorimaeul.repository.*;
import io.swagger.v3.oas.models.parameters.RequestBody;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.ExchangeStrategies;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import static com.usagi.sorimaeul.utils.Const.EC2_BASE_PATH;
import static com.usagi.sorimaeul.utils.FileUtil.createFolder;
import static com.usagi.sorimaeul.utils.FileUtil.saveFile;

@Service
@RequiredArgsConstructor
@Transactional
public class DubbingServiceImpl implements DubbingService {

    private final UserRepository userRepository;
    private final DubbingRepository dubbingRepository;
    private final LikeRepository likeRepository;
    private final VideoSourceRepository videoSourceRepository;
    private final VoiceSourceRepository voiceSourceRepository;
    private final VoiceModelRepository voiceModelRepository;
    private final S3Service s3Service;

    // 원본 영상 목록 조회
    public ResponseEntity<VideoSourceListResponse> getVideoSourceList(long userCode, Integer page, String target) {
        // 사용자 정보 확인
        User user = userRepository.getUser(userCode);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        // 배열 선언
        List<VideoSource> videoSources = new ArrayList<>();
        List<VideoSourceInfoDto> customVideoSources = new ArrayList<>();
        // 인덱스 선언
        int startIdx = 0;
        int endIdx = 0;
        // 총 페이지 수 선언
        int totalPages = 1;

        // 인기 영상 조회
        if (target.equals("popular")) {
            videoSources = videoSourceRepository.findTop5VideoSourcesOrderByDubbingCountDesc();

            // Dto 에 담기
            for (VideoSource videoSource : videoSources) {
                // Dto 에 담기
                VideoSourceInfoDto videoSourceInfoDto = VideoSourceInfoDto.builder()
                        .videoSourceCode(videoSource.getVideoSourceCode())
                        .sourceName(videoSource.getSourceName())
                        .thumbnailPath(videoSource.getThumbnailPath())
                        .build();
                // customVideoSources 에 담기
                customVideoSources.add(videoSourceInfoDto);
            }
            // Response 생성
            VideoSourceListResponse response = VideoSourceListResponse.builder()
                    .videoSources(customVideoSources)
                    .build();

            return ResponseEntity.ok(response);
        }
        // 전체 영상 조회
        else {
            videoSources = videoSourceRepository.findAllByOrderByCreatedTimeDesc();

            if (page != null) {
                startIdx = (page - 1) * 10;
                endIdx = Math.min(startIdx + 10, videoSources.size());
            } else {
                endIdx = videoSources.size();
            }
            // 총 페이지 수 계산
            totalPages = (int) Math.ceil((double) videoSources.size() / 10);

            // 원본 영상 페이지네이션
            List<VideoSource> pageVideoSources = videoSources.subList(startIdx, endIdx);
            // 원본 영상 리스트 순회
            for (VideoSource videoSource : pageVideoSources) {
                // Dto 에 담기
                VideoSourceInfoDto videoSourceInfoDto = VideoSourceInfoDto.builder()
                        .videoSourceCode(videoSource.getVideoSourceCode())
                        .sourceName(videoSource.getSourceName())
                        .thumbnailPath(videoSource.getThumbnailPath())
                        .build();
                // customVideoSources 에 담기
                customVideoSources.add(videoSourceInfoDto);
            }

            // Response 생성
            VideoSourceListResponse videoSourceListResponse = VideoSourceListResponse.builder()
                    .videoSources(customVideoSources)
                    .totalPages(totalPages)
                    .build();

            return ResponseEntity.ok(videoSourceListResponse);
        }
    }

    // 원본 영상 상세 조회
    public ResponseEntity<VideoSourceDetailResponse> getVideoSourceDetail(long userCode, int videoSourceCode) {
        // 사용자 정보 확인
        User user = userRepository.getUser(userCode);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        VideoSource videoSource = videoSourceRepository.findByVideoSourceCode(videoSourceCode);
        // 리스폰스 생성
        VideoSourceDetailResponse response = VideoSourceDetailResponse.builder()
                .videoSourceCode(videoSourceCode)
                .sourceName(videoSource.getSourceName())
                .sourceDetail(videoSource.getSourceDetail())
                .videoPlaytime(videoSource.getVideoPlaytime())
                .storagePath(videoSource.getStoragePath())
                .thumbnailPath(videoSource.getThumbnailPath())
                .createdTime(videoSource.getCreatedTime())
                .build();

        return ResponseEntity.ok(response);
    }

    // 원본 영상 파일 조회
    public ResponseEntity<Resource> getSourceVideo(long userCode, int videoSourceCode) {
        VideoSource videoSource = videoSourceRepository.findByVideoSourceCode(videoSourceCode);

        if (videoSource == null) {
            return ResponseEntity.notFound().build();
        }

        String videoPath = videoSource.getStoragePath();
        Resource videoResource = new FileSystemResource(videoPath);
        if (!videoResource.exists()) {
            return ResponseEntity.notFound().build();
        }

        String mimeType = "video/mp4"; // 예시로, 실제 파일 타입에 따라 변경 필요 inline : 재생, attachment : 다운로드
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(mimeType))
//                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + videoResource.getFilename() + "\"")
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + videoResource.getFilename() + "\"")
                .body(videoResource);
    }

    // 더빙 영상 목록 조회
    public ResponseEntity<DubbingListResponse> getDubbingList(long userCode, String target, String keyword, Integer page, Integer videoSourceCode) {
        // 사용자 정보 확인
        User user = userRepository.getUser(userCode);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        // 배열 선언
        List<Dubbing> dubbings = new ArrayList<>();
        List<DubbingInfoDto> customDubbings = new ArrayList<>();
        // 인덱스 선언
        int startIdx = 0;
        int endIdx = 0;
        // 총 페이지 수 선언
        int totalPages = 1;

        // 모든 게시물 조회 - 더빙 학원에서만 ( 키워드 검색 없음 )
        if (target.equals("all")) {
            dubbings = dubbingRepository.findByIsCompleteAndIsPublicAndVideoSource_videoSourceCodeOrderByCreatedTimeDesc(true, true, videoSourceCode);

            // page 가 null 이 아니면
            if (page != null) {
                // 한 페이지 당 10개씩 조회, 초과 페이지 요청시 마지막 페이지 조회
                startIdx = Math.min((page - 1) * 8, dubbings.size()) / 8 * 8;
                endIdx = Math.min(startIdx + 8, dubbings.size());
            }
            // page 가 null 이면 전체 조회
            else {
                endIdx = dubbings.size();
            }
            // 총 페이지 수 계산
            totalPages = (int) Math.ceil((double) dubbings.size() / 8);
        }

        // 마이 페이지 - 나의 게시물 조회 ( 키워드 검색 가능 )
        else if (target.equals("mine")) {
            // keyword 가 null 이면 전체 조회
            if (keyword == null) {
                dubbings = dubbingRepository.findByUser_userCodeOrderByCreatedTimeDesc(userCode);
            }
            // keyword 가 null 이 아니면 dubName = keyword 를 포함한 데이터 조회
            else {
                dubbings = dubbingRepository.findByUser_userCodeAndDubNameContainingOrderByCreatedTimeDesc(userCode, keyword);
            }
            // page 가 null 이 아니면
            if (page != null) {
                // 한 페이지 당 6개씩 조회, 초과 페이지 요청시 마지막 페이지 조회
                startIdx = Math.min((page - 1) * 6, dubbings.size()) / 6 * 6;
                endIdx = Math.min(startIdx + 6, dubbings.size());
            }
            // page 가 null 이면 전체 조회
            else {
                endIdx = dubbings.size();
            }
            // // 총 페이지 수 계산
            totalPages = (int) Math.ceil((double) dubbings.size() / 6);
        }

        // 마이 페이지 - 관심 컨텐츠 - 좋아요 누른 게시물 조회
        else if (target.equals("like")) {
            // 나의 유저 코드와 일치하는 like 리스트를 가져온다.
            List<Like> likes = likeRepository.findByUser_userCode(userCode);
            // like 와 매핑되는 Dubbing 들을 dubbings 에 넣는다.
            for (Like like : likes) {
                Dubbing dubbing = like.getDubbing();
                if (dubbing != null && dubbing.getIsPublic() && dubbing.getIsComplete()) {
                    dubbings.add(dubbing);
                }
            }
            // page 가 null 이 아니면
            if (page != null) {
                // 한 페이지 당 6개씩 조회, 초과 페이지 요청시 마지막 페이지 조회
                startIdx = Math.min((page - 1) * 6, dubbings.size()) / 6 * 6;
                endIdx = Math.min(startIdx + 6, dubbings.size());
            }
            // page 가 null 이면 전체 조회
            else {
                endIdx = dubbings.size();
            }
            // // 총 페이지 수 계산
            totalPages = (int) Math.ceil((double) dubbings.size() / 6);
        }

        // 인기 더빙 영상 목록 조회
        else if (target.equals("popular")) {
            // 좋아요 수를 기준으로 상위 5개 항목을 가져온다.
            dubbings = dubbingRepository.findTop5ByVideoSource_videoSourceCodeAndIsCompleteAndIsPublicOrderByLikeCountDesc(videoSourceCode, true, true);
            endIdx = dubbings.size();
        }


        // dubbing 리스트 페이지네이션
        List<Dubbing> pageDubbings = dubbings.subList(startIdx, endIdx);
        // dubbing 리스트를 순회
        for (Dubbing dubbing : pageDubbings) {
            // Dto 에 담기
            DubbingInfoDto dubbingInfoDto = DubbingInfoDto.builder()
                    .dubCode(dubbing.getDubCode())
                    .videoSourceCode(dubbing.getVideoSource().getVideoSourceCode())
                    .dubName(dubbing.getDubName())
                    .isPublic(dubbing.getIsPublic())
                    .isComplete(dubbing.getIsComplete())
                    .thumbnailPath(dubbing.getVideoSource().getThumbnailPath())
                    .likeCount(dubbing.getLikeCount())
                    .nickname(dubbing.getUser().getNickname())
                    .profileImage(dubbing.getUser().getProfileImage())
                    .createdTime(dubbing.getCreatedTime())
                    .build();

            // customDubbings에 담기
            customDubbings.add(dubbingInfoDto);
        }
        // 리스폰스 생성
        DubbingListResponse dubbingListResponse = DubbingListResponse.builder()
                .dubbings(customDubbings)
                .totalPages(totalPages)
                .build();

        return ResponseEntity.ok(dubbingListResponse);
    }

    // 더빙 영상 상세 조회
    public ResponseEntity<?> getDubbingDetail(long userCode, int dubCode) {
        // 사용자 정보 확인
        User user = userRepository.getUser(userCode);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        Dubbing dubbing = dubbingRepository.findByDubCode(dubCode);
        // 비공개일 때 작성자가 아닌 경우 잘못된 접근 오류 반환
        if (!dubbing.getIsPublic() && dubbing.getUser() != user) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("잘못된 접근입니다.");
        }

        // 좋아요 여부 확인
        boolean isLiked;
        isLiked = likeRepository.findByUser_userCodeAndDubbing_dubCode(userCode, dubCode) != null;
        // response 생성
        DubbingDetailResponse response = DubbingDetailResponse.builder()
                .dubCode(dubCode)
                .videoSourceCode(dubbing.getVideoSource().getVideoSourceCode())
                .dubName(dubbing.getDubName())
                .dubDetail(dubbing.getDubDetail())
                .nickname(dubbing.getUser().getNickname())
                .profileImage(dubbing.getUser().getProfileImage())
                .likeCount(dubbing.getLikeCount())
                .createdTime(dubbing.getCreatedTime())
                .storagePath(dubbing.getStoragePath())
                .thumbnailPath(dubbing.getVideoSource().getThumbnailPath())
                .isLiked(isLiked)
                .isPublic(dubbing.getIsPublic())
                .isComplete(dubbing.getIsComplete())
                .build();

        return ResponseEntity.ok(response);
    }

    // 더빙 영상 파일 조회
    public ResponseEntity<Resource> getDubbingVideo(long userCode, int dubCode) {
        Dubbing dubbing = dubbingRepository.findByDubCode(dubCode);

        if (dubbing == null) {
            return ResponseEntity.notFound().build();
        }

        String videoPath = dubbing.getStoragePath();
        Resource videoResource = new FileSystemResource(videoPath);
        if (!videoResource.exists()) {
            return ResponseEntity.notFound().build();
        }

        String mimeType = "video/mp4"; // 예시로, 실제 파일 타입에 따라 변경 필요
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(mimeType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + videoResource.getFilename() + "\"")
                .body(videoResource);
    }

    // 더빙 영상 게시글 등록/수정
    public ResponseEntity<?> patchDubbingBoard(long userCode, int dubCode, DubbingBoardRequest request) {
        // 사용자 정보 확인
        User user = userRepository.getUser(userCode);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        // 현재유저, 더빙영상작성유저 비교
        Dubbing dubbing = dubbingRepository.findByDubCode(dubCode);
        if (user != dubbing.getUser()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("타인의 더빙 영상에는 접글할 수 없습니다.");
        }

        // 더빙 영상 등록/수정
        dubbing.setDubName(request.getDubName());
        dubbing.setDubDetail(request.getDubDetail());
        dubbing.setIsPublic(request.getIsPublic());
        dubbingRepository.save(dubbing);

        return ResponseEntity.status(HttpStatus.OK).body("수정 성공");
    }

    // 더빙 영상 삭제
    public ResponseEntity<?> deleteDubbing(long userCode, int dubCode) {
        // 사용자 정보 확인
        User user = userRepository.getUser(userCode);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        // 더빙 삭제
        dubbingRepository.deleteById(dubCode);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("삭제 성공");
    }

    // 더빙 영상 분리된 음성 및 원본 영상 조회
    public ResponseEntity<VideoSourceVoiceResponse> getVideoSourceVoice(long userCode, int videoSourceCode) {
        // 사용자 정보 확인
        User user = userRepository.getUser(userCode);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        // 더빙 가능 횟수가 남아있지 않으면 400 반환
        if (user.getDubCount() < 1) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        // 음성 조회
        List<VoiceSource> voiceSources = voiceSourceRepository.findByVideoSource_videoSourceCode(videoSourceCode);
        List<VideoSourceVoiceInfoDto> videoSourceVoiceInfoDtos = new ArrayList<>();
        for (VoiceSource voiceSource : voiceSources) {
            // Dto에 담기
            VideoSourceVoiceInfoDto videoSourceVoiceInfoDto = VideoSourceVoiceInfoDto.builder()
                    .voiceIndex(voiceSource.getVoiceIndex())
                    .voicePath(voiceSource.getVoicePath())
                    .voiceName(voiceSource.getVoiceModel().getModelName())
                    .build();
            videoSourceVoiceInfoDtos.add(videoSourceVoiceInfoDto);
        }
        // 음성 제거된 영상 경로
        String videoPath = "/dub/source_" + videoSourceCode + "/origin/video/videoNoVoice.mp4";

        // 리스폰스 생성
        VideoSourceVoiceResponse response = VideoSourceVoiceResponse.builder()
                .videoSourceCode(videoSourceCode)
                .videoPath(videoPath)
                .voiceSources(videoSourceVoiceInfoDtos)
                .build();

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    // 더빙 음성 녹음 업로드
    public ResponseEntity<?> uploadDubbingRecord(long userCode, int num, int videoSourceCode, MultipartFile recordFile) {
        // 사용자 정보 확인
        User user = userRepository.getUser(userCode);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        // 응답 경로 설정
        String voicePath = "/dub/source_" + videoSourceCode + "/user_" + user.getUserCode() + "/unconverted/";

        // 폴더 경로 설정
        String folderPath = EC2_BASE_PATH + voicePath;

        // 원본 파일명
        String originName = recordFile.getOriginalFilename();
        String fileExtension = originName.substring(originName.lastIndexOf("."));

        try {
            // 폴더 생성
            createFolder(folderPath);

            // record_1.wav 형식으로 저장
            String fileName = num + fileExtension;
            // 파일 생성
            saveFile(folderPath + fileName, recordFile.getBytes());

            DubbingRecordResponse response = DubbingRecordResponse.builder()
                    .voicePath(voicePath + fileName)
                    .build();
            return ResponseEntity.status(HttpStatus.OK).body(response);

            // 서버 오류 처리
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("녹음 파일을 업로드하는 과정에서 오류가 발생했습니다." + e.getMessage());
        }
    }

    //더빙 음성 변환
    public ResponseEntity<?> convertDubbingRecord(long userCode, int voiceIndex, DubbingRecordConvertRequest request) {

        // 사용자 정보 확인
        User user = userRepository.getUser(userCode);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("사용자를 찾을 수 없습니다.");
        }

        // 변환된 파일을 저장할 폴더 경로 설정
        String folderPath = "/dub/source_" + request.getVideoSourceCode() + "/user_" + user.getUserCode() + "/converted/";

        // 변환된 파일을 저장할 폴더 경로 설정
        String folderPathUnconverted = "/dub/source_" + request.getVideoSourceCode() + "/user_" + user.getUserCode() + "/unconverted/";

        // 로컬 파일 시스템에서 파일 가져오기
        byte[] fileToSend;
        Path path;
        try {
            path = Paths.get(EC2_BASE_PATH + "/" + request.getVoicePath()); // 로컬 파일 경로
            fileToSend = Files.readAllBytes(path);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("파일을 읽는 중 오류가 발생했습니다.");
        }
        // 미변환 음성 파일 S3에 저장하기
        s3Service.saveByteToS3(folderPathUnconverted.substring(1) + voiceIndex + ".wav", fileToSend);

        // 최대 버퍼 크기를 16MB로 설정
        int bufferSize = 16 * 1024 * 1024;

        ExchangeStrategies exchangeStrategies = ExchangeStrategies.builder()
                .codecs(configurer -> configurer.defaultCodecs().maxInMemorySize(bufferSize))
                .build();

//        WebClient client = WebClient.create("http://222.107.238.124:7867");
        WebClient client = WebClient.builder()
                .baseUrl("http://222.107.238.124:7867")
                .exchangeStrategies(exchangeStrategies)
                .build();

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        // ByteArrayResource를 사용하여 byte[]를 MultiValueMap에 추가
        body.add("file", new ByteArrayResource(fileToSend) {
            @Override
            public String getFilename() {
                return path.getFileName().toString(); // 실제 파일 이름 반환
            }
        });

//        // S3 에서 파일 가져오기
//        byte[] fileToSend = s3Service.downloadFile(request.getVoicePath());
//
//        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
//        // 바디에 담아서 AI 서버에 전달
//        body.add("file", fileToSend[0]);

        // 음성 변환 요청
        Mono<byte[]> responseFile = client.post()
                .uri(uriBuilder -> uriBuilder.path("/rvc/infer/{userCode}/{videoSourceCode}/{voiceIndex}/{modelCode}/{pitch}")
                        .build(userCode, request.getVideoSourceCode(), voiceIndex, request.getModelCode(), request.getPitch()))
                .contentType(MediaType.MULTIPART_FORM_DATA)
                .body(BodyInserters.fromMultipartData(body))
                .retrieve()
                .bodyToMono(byte[].class);

        // 변환된 파일을 s3에 저장
        String fileName = voiceIndex + ".wav";
        byte[] convertedFileBytes = responseFile.block();
        s3Service.saveByteToS3(folderPath.substring(1) + fileName, convertedFileBytes);

        DubbingRecordConvertResponse response = DubbingRecordConvertResponse.builder()
                .voicePath(folderPath+fileName)
                .build();

        return ResponseEntity.ok(response);
    }

    // 더빙 영상 제작
    public ResponseEntity<DubbingCreateResponse> createDubbing(long userCode, DubbingCreateRequest request) {
        User user = userRepository.getUser(userCode);
        VideoSource videoSource = videoSourceRepository.findByVideoSourceCode(request.getVideoSourceCode());

        Dubbing dubbing = Dubbing.builder()
                .user(user)
                .videoSource(videoSource)
                .dubName(request.getDubName())
                .build();

        dubbingRepository.save(dubbing);

        // 음성 제거된 영상 경로
        String videoPath = "/dub/source_" + request.getVideoSourceCode() + "/origin/video/videoNoVoice.mp4";

        // 더빙 영상 제작 요청 보내기 Python 서버로
        WebClient client = WebClient.create("https://j10e201.p.ssafy.io");

        DubbingCreateRequestToPythonServer requestBody = DubbingCreateRequestToPythonServer.builder()
                .userCode(userCode)
                .dubCode(dubbing.getDubCode())
                .dubName(dubbing.getDubName())
                .videoURL(videoPath)
                .voiceURL(request.getVoicePaths())
                .build();

        Mono<String> responseClient = client.post()
                .uri("/create-dubbing")
                .contentType(MediaType.APPLICATION_JSON)
                .body(Mono.just(requestBody), DubbingCreateRequestToPythonServer.class)
                .retrieve()
                .bodyToMono(String.class);

        // Python 서버 응답
        responseClient.block();

        // 더빙 생성시 더빙 가능 횟수 1 차감
        user.setDubCount(user.getDubCount() - 1);
        userRepository.save(user);

        DubbingCreateResponse response = DubbingCreateResponse.builder()
                .dubCode(dubbing.getDubCode())
                .storagePath(dubbing.getStoragePath())
                .build();

        return ResponseEntity.ok(response);
    }

    // 더빙 영상 저장
    public ResponseEntity<?> saveDubbing(DubbingSaveRequest request) {

        Dubbing dubbing = dubbingRepository.findByDubCode(request.getDubCode());

        String savePath = "dub/source_" + dubbing.getVideoSource().getVideoSourceCode() + "/dub_" + dubbing.getDubCode() + "/dub_" + dubbing.getDubCode() + ".mp4";
        // 로컬 파일 시스템에서 파일 가져오기
        byte[] fileToSave;
        Path path;
        try {
            path = Paths.get(request.getPath()); // 로컬 파일 경로
            fileToSave = Files.readAllBytes(path);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("파일을 읽는 중 오류가 발생했습니다.");
        }

        // 더빙 영상 S3에 저장하기
        s3Service.saveByteToS3(savePath, fileToSave);

        dubbing.setStoragePath("/" + savePath);
        dubbing.setIsComplete(true);
        dubbingRepository.save(dubbing);

        return ResponseEntity.status(HttpStatus.OK).body("저장 성공");
    }


    // 더빙 생성 성공 여부 확인
    public ResponseEntity<String> checkDubbingCreate(int dubCode, Boolean isSuccess) {
        if (!isSuccess) {
            dubbingRepository.deleteById(dubCode);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("더빙 생성에 실패했습니다.");
        } else {
            Dubbing dubbing = dubbingRepository.findByDubCode(dubCode);
            dubbing.setIsComplete(true);
            return ResponseEntity.status(HttpStatus.OK).body("더빙 생성에 성공했습니다.");
        }
    }
}

