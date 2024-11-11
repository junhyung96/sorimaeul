package com.usagi.sorimaeul.api.service;

import com.usagi.sorimaeul.dto.dto.ModelInfoDto;
import com.usagi.sorimaeul.dto.dto.ScriptInfoDto;
import com.usagi.sorimaeul.dto.request.ModelTableCreateRequest;
import com.usagi.sorimaeul.dto.request.ModelTrainingRequest;
import com.usagi.sorimaeul.dto.request.ModelUpdateRequest;
import com.usagi.sorimaeul.dto.response.GetScriptResponse;
import com.usagi.sorimaeul.dto.response.ModelInfoResponse;
import com.usagi.sorimaeul.dto.response.ModelListResponse;
import com.usagi.sorimaeul.dto.response.ModelTableCreateResponse;
import com.usagi.sorimaeul.entity.Script;
import com.usagi.sorimaeul.entity.User;
import com.usagi.sorimaeul.entity.VideoSource;
import com.usagi.sorimaeul.entity.VoiceModel;
import com.usagi.sorimaeul.repository.ScriptRepository;
import com.usagi.sorimaeul.repository.UserRepository;
import com.usagi.sorimaeul.repository.VideoSourceRepository;
import com.usagi.sorimaeul.repository.VoiceModelRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.MultipartBodyBuilder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import static com.usagi.sorimaeul.utils.Const.EC2_BASE_PATH;
import static com.usagi.sorimaeul.utils.FileUtil.*;
import static com.usagi.sorimaeul.utils.InMemoryMultipartFile.createMultipartFilesWithAllowedExtensions;

@Service
@RequiredArgsConstructor
@Transactional
public class ModelServiceImpl implements ModelService {

    private final UserRepository userRepository;
    private final VoiceModelRepository voiceModelRepository;
    private final VideoSourceRepository videoSourceRepository;
    private final ScriptRepository scriptRepository;

    // 모델 테이블 생성
    public ResponseEntity<?> createModelTable(ModelTableCreateRequest request, long userCode) {
        // 사용자 정보 확인
        User user = userRepository.getUser(userCode);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        // 학습 가능 횟수 예외 처리
        if (user.getLearnCount() < 1) return ResponseEntity.badRequest().body("모델 학습 가능 횟수가 부족합니다. 상점 페이지에서 구매후 다시 시도해주세요.");

        // 모델 테이블 생성
        // modelCode = auto_increment, video_code = null, image_path = null, state = 기본값 0
        // record_count = null, created_time = now()
        VoiceModel voiceModel = VoiceModel.builder()
                .modelName(request.getModelName())
                .user(user)
                .imagePath(request.getImagePath())
                .build();
        voiceModelRepository.save(voiceModel);
        // 리스폰스 생성
        ModelTableCreateResponse response = ModelTableCreateResponse.builder()
                .modelCode(voiceModel.getModelCode())
                .build();
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }


    // 음성 녹음 파일 업로드
    public ResponseEntity<String> uploadRecordFile(int modelCode, int num, long userCode, MultipartFile recordingFile) {
        // 사용자 정보 확인
        User user = userRepository.getUser(userCode);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        VoiceModel voiceModel = voiceModelRepository.findByModelCode(modelCode);

        // 예외 처리
        // 모델 소유자와 클라이언트가 일치하지 않거나 모델 학습 상태가 녹음중 또는 학습전이 아니면 BAD_REQUEST 반환
        if (voiceModel.getUser() != user)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("타인의 모델에는 접근할 수 없습니다.");
        if (voiceModel.getState() > 1) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("모델을 학습하기에 적절한 상태가 아닙니다.");
        }
        // 모델 학습 가능 횟수 검사
        if (user.getLearnCount() < 1)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("모델 학습 가능 횟수가 부족합니다. 상점 페이지에서 구매후 다시 시도해주세요.");
        // 파일 업로드 확인
        if (recordingFile == null || recordingFile.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("음성 파일이 올바르게 업로드되지 않았습니다.");
        }

        // 확장자 검사
        String originalFilename = recordingFile.getOriginalFilename();
        String fileExtension = getFileExtension(originalFilename);
        if (!isAllowedExtension(fileExtension, ALLOWED_EXTENSIONS_AUDIO)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("허용되지 않는 파일 형식입니다.");
        }


        // 폴더 경로 설정
        String folderPath = EC2_BASE_PATH + "/model_" + modelCode + "/record/";

        try {
            // 폴더 생성
            createFolder(folderPath);
            // record_1.wav 형식으로 저장
            String fileName = "record_" + num + ".wav";
            // 파일 생성
            saveFile(folderPath + fileName, recordingFile.getBytes());
            // 녹음 문장 개수 갱신(200이면 state = 1 로 변경)
            countRecord(voiceModel, num);
            return ResponseEntity.ok(num + "번 녹음 파일 업로드 성공!");

            // 서버 오류 처리
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("녹음 파일을 업로드하는 과정에서 오류가 발생했습니다." + e.getMessage());
        }
    }


    // 외부 음성 녹음 파일 업로드
    public ResponseEntity<String> uploadExRecordFile(int modelCode, long userCode, MultipartFile[] files) {
        // 사용자 정보 확인
        User user = userRepository.getUser(userCode);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        // 예외 처리
        // 모델 소유자와 클라이언트가 일치하지 않으면 BAD_REQUEST 반환
        VoiceModel voiceModel = voiceModelRepository.findByModelCode(modelCode);
        if (voiceModel.getUser() != user)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("타인의 모델에는 접근할 수 없습니다.");
        // 학습 상태가 '녹음중', '학습전'일 때만 학습 가능
        if (voiceModel.getState() > 1) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("녹음중 단계일 때만 업로드 가능합니다.");
        }
        // 모델 학습 가능 횟수 검사
        if (user.getLearnCount() < 1)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("모델 학습 가능 횟수가 부족합니다. 상점 페이지에서 구매후 다시 시도해주세요.");
        // 파일 업로드 확인
        if (files == null || files.length == 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("음성 파일이 올바르게 업로드되지 않았습니다.");
        }


        // 폴더 경로 설정
        String folderPath = EC2_BASE_PATH + "/model_" + modelCode + "/record/";

        // 허용되지 않는 확장자의 파일들을 저장할 리스트 생성
        List<String> invalidFiles = new ArrayList<>();

        try {
            // 폴더 생성
            createFolder(folderPath);

            for (int i = 0; i < files.length; i++) {
                String originalFilename = files[i].getOriginalFilename();
                String fileExtension = getFileExtension(originalFilename);

                // 확장자 검사
                if (!isAllowedExtension(fileExtension, ALLOWED_EXTENSIONS_AUDIO)) {
                    invalidFiles.add(originalFilename);
                    continue; // 유효하지 않은 파일은 스킵하고 다음 파일 처리
                }
                // record_1.wav 형식으로 저장
                String fileName = "record_" + (i + 1) + ".wav";
                // 파일 저장
                saveFile(folderPath + fileName, files[i].getBytes());
            }

            // 유효하지 않은 파일에 대한 처리
            if (!invalidFiles.isEmpty()) {
                String errorMessage = "다음 파일들은 허용되지 않는 확장자입니다: " + String.join(", ", invalidFiles);
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessage);
            }

            // state = 1 : '학습전'으로 DB 갱신
            voiceModel.setState(1);
            voiceModelRepository.save(voiceModel);
            return ResponseEntity.ok("외부 녹음 파일 업로드 성공!");

            // 서버 오류 처리
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("녹음 파일을 업로드하는 과정에서 오류가 발생했습니다." + e.getMessage());
        }
    }


    // 외부 음성 모델 업로드
    public ResponseEntity<String> uploadModelFile(int modelCode, long userCode, MultipartFile[] modelFiles) {
        // 사용자 정보 확인
        User user = userRepository.getUser(userCode);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        VoiceModel voiceModel = voiceModelRepository.findByModelCode(modelCode);

        // 예외 처리
        // 모델 소유자와 클라이언트가 일치하지 않으면 BAD_REQUEST 반환
        if (voiceModel.getUser() != user)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("타인의 모델에는 접근할 수 없습니다.");
        // 학습 상태가 '녹음중'일 때만 학습 가능
        if (voiceModel.getState() != 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("녹음중 단계일 때만 업로드 가능합니다.");
        }
        // 모델 학습 가능 횟수 검사
        if (user.getLearnCount() < 1)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("모델 학습 가능 횟수가 부족합니다. 상점 페이지에서 구매후 다시 시도해주세요.");
        // 파일 업로드 확인
        if (modelFiles == null || modelFiles.length == 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("모델 파일이 올바르게 업로드되지 않았습니다.");
        }

        // 확장자 검사
        for (MultipartFile file : modelFiles) {
            String originalFilename = file.getOriginalFilename();
            String fileExtension = getFileExtension(originalFilename);

            if (!isAllowedExtension(fileExtension, ALLOWED_EXTENSIONS_MODEL)) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("허용되지 않는 파일 형식입니다.");
            }
        }



        // GPU 서버에 모델 업로드 요청 보내기
        MultipartBodyBuilder builder = new MultipartBodyBuilder();
        builder.part("file", modelFiles[0].getResource());
        try {
            WebClient.create("http://222.107.238.124:7865")
                    .post()
                    .uri("/model/" + modelCode)
                    .body(BodyInserters.fromMultipartData(builder.build()))
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();

            // state = 3 : '학습완료'로 DB 갱신
            voiceModel.setState(3);
            voiceModelRepository.save(voiceModel);
            return ResponseEntity.status(HttpStatus.OK).body("모델 업로드 성공!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("모델 업로드 실패: " + e.getMessage());
        }


    }


    // 음성 모델 학습 시작
    public ResponseEntity<String> learnVoiceModel(int modelCode, long userCode) {
        // 사용자 정보 확인
        User user = userRepository.getUser(userCode);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        // 예외 처리
        VoiceModel voiceModel = voiceModelRepository.findByModelCode(modelCode);
        // 모델 소유자와 클라이언트가 일치하지 않으면 BAD_REQUEST 반환
        if (voiceModel.getUser() != user)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("타인의 모델에는 접근할 수 없습니다.");
        // 학습 상태가 '학습전'일 때만 학습 가능
        if (voiceModel.getState() != 1) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("학습전 단계일 때만 학습을 시작할 수 있습니다.");
        }
        // 모델 학습 가능 횟수 검사
        if (user.getLearnCount() < 1)
            return ResponseEntity.badRequest().body("모델 학습 가능 횟수가 부족합니다. 상점 페이지에서 구매후 다시 시도해주세요.");

        // GPU 서버에 음성 파일 업로드
        String folderPath = EC2_BASE_PATH + "/model_" + modelCode + "/record/";
        List<MultipartFile> multipartFiles = createMultipartFilesWithAllowedExtensions(folderPath, ALLOWED_EXTENSIONS_AUDIO);
        MultipartBodyBuilder builder = new MultipartBodyBuilder();
        for (int i = 0; i < multipartFiles.size(); i++) {
            MultipartFile multipartFile = multipartFiles.get(i);
            builder.part("files", multipartFile.getResource());
        }
        try {
            // state = 2: '학습중'으로 갱신
            voiceModel.setState(2);
            voiceModelRepository.save(voiceModel);

            // 음성 파일 업로드
            WebClient.create("http://222.107.238.124:7865")
                    .post()
                    .uri("/voice/" + modelCode)
                    .body(BodyInserters.fromMultipartData(builder.build()))
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();

            // GPU 서버에 모델 학습 요청 보내기
            WebClient.create("http://222.107.238.124:7865")
                    .post()
                    .uri("/training")
                    .bodyValue(new ModelTrainingRequest(modelCode, userCode, voiceModel.getModelName()))
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();

            // 모델 학습 가능 횟수 차감
            user.setLearnCount(user.getLearnCount() - 1);
            userRepository.save(user);

            return ResponseEntity.status(HttpStatus.OK).body("모델 학습 성공!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("모델 학습 실패: " + e.getMessage());
        }
    }


    // 모델 조회
    public ResponseEntity<ModelListResponse> getModelList(Integer page, long userCode, Integer videoSourceCode) {
        // 사용자 정보 확인
        User user = userRepository.getUser(userCode);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        List<ModelInfoDto> mergedModelDtos = new ArrayList<>();
        VideoSource videoSource = videoSourceRepository.findByVideoSourceCode(videoSourceCode);
        // 총 페이지 수 선언
        int totalPages = 1;

        // videoSourceCode 와 page 가 모두 null 이면 AI 커버 음성 모델 조회(기본 제공 모델, 내가 학습 시킨 모델)
        if (page == null && videoSourceCode == null) {
            // 기본 제공 모델
            List<VoiceModel> commonModelList = voiceModelRepository.commonModelList();
            // dto 로 변환
            List<ModelInfoDto> commonModelDtos = modelListToDto(commonModelList, false, false);
            // 나의 모델
            List<VoiceModel> myModelList = voiceModelRepository.userModelList(user, 3);
            // dto 로 변환
            List<ModelInfoDto> myModelDtos = modelListToDto(myModelList, true, false);
            // 합치기
            mergedModelDtos = new ArrayList<>(commonModelDtos);
            mergedModelDtos.addAll(myModelDtos);

            // videoSourceCode 만 null 이면 마이페이지 음성 모델 조회(페이지 네이션, 내가 학습 시킨 모델)
        } else if (videoSourceCode == null) {
            // 나의 모델
            List<VoiceModel> myModelList = voiceModelRepository.userModelList(user, -1);
            // 최신순 조회를 위해 뒤집기
            reverseList(myModelList);
            // dto 로 변환
            List<ModelInfoDto> myModelDtos = modelListToDto(myModelList, true, false);
            // 페이지네이션
            int startIdx = (page - 1) * 6;
            int endIdx = Math.min(startIdx + 6, myModelList.size());
            mergedModelDtos = myModelDtos.subList(startIdx, endIdx);
            // 총 페이지 수 계산
            totalPages = (int) Math.ceil((double) myModelList.size() / 6);

            // page 만 null 이면 더빙 음성 모델 조회(영상 제공 모델, 내가 학습 시킨 모델, 기본 제공 모델)
        } else if (page == null) {
            // 영상 제공 모델
            List<VoiceModel> videoSourceModelList = voiceModelRepository.videoSourceModelList(videoSource);
            // dto 로 변환
            List<ModelInfoDto> videoSourceModelDtos = modelListToDto(videoSourceModelList, false, true);
            // 나의 모델
            List<VoiceModel> myModelList = voiceModelRepository.userModelList(user, 3);
            // dto 로 변환
            List<ModelInfoDto> myModelDtos = modelListToDto(myModelList, true, false);
            // 기본 제공 모델
            List<VoiceModel> commonModelList = voiceModelRepository.commonModelList();
            // dto 로 변환
            List<ModelInfoDto> commonModelDtos = modelListToDto(commonModelList, false, false);
            // 합치기
            mergedModelDtos = new ArrayList<>(videoSourceModelDtos);
            mergedModelDtos.addAll(myModelDtos);
            mergedModelDtos.addAll(commonModelDtos);
        } else {
            // 잘못된 요청
            return ResponseEntity.badRequest().build();
        }

        // 리스폰스 생성
        ModelListResponse modelListResponse = ModelListResponse.builder()
                .voiceModels(mergedModelDtos)
                .totalPages(totalPages)
                .build();

        return ResponseEntity.ok(modelListResponse);
    }


    // 모델 상세 조회
    public ResponseEntity<ModelInfoResponse> getModelInfo(int modelCode, long userCode) {
        // 사용자 정보 확인
        User user = userRepository.getUser(userCode);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        VoiceModel voiceModel = voiceModelRepository.findByModelCode(modelCode);

        // 예외 처리
        // 기본 제공 모델, 영상 제공 모델에 접근시 BAD_REQUEST 반환
        User modelUser = voiceModel.getUser();
        if (modelUser==null) {
            return ResponseEntity.badRequest().body(ModelInfoResponse.withError("플랫폼에서 제공하는 모델에는 접근할 수 없습니다."));
        }
        long modelUserCode = modelUser.getUserCode();
        // 모델 소유자와 클라이언트가 일치하지 않으면 BAD_REQUEST 반환
        if (modelUserCode != userCode) {
            return ResponseEntity.badRequest().body(ModelInfoResponse.withError("타인의 모델에는 접근할 수 없습니다."));
        }


        // 리스폰스 생성
        ModelInfoResponse response = ModelInfoResponse.builder()
                .modelCode(voiceModel.getModelCode())
                .modelName(voiceModel.getModelName())
                .imagePath(voiceModel.getImagePath())
                .recordCount(voiceModel.getRecordCount())
                .state(voiceModel.getState())
                .build();

        return ResponseEntity.ok(response);
    }


    // 모델 수정(모델 이름, 대표 이미지)
    public ResponseEntity<String> updateModel(int modelCode, long userCode, ModelUpdateRequest request) {
        // 사용자 정보 확인
        User user = userRepository.getUser(userCode);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        VoiceModel voiceModel = voiceModelRepository.findByModelCode(modelCode);

        // 예외 처리
        // 기본 제공 모델, 영상 제공 모델에 접근시 BAD_REQUEST 반환
        User modelUser = voiceModel.getUser();
        if (modelUser==null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("플랫폼에서 제공하는 모델에는 접근할 수 없습니다.");
        }
        long modelUserCode = modelUser.getUserCode();
        // 모델 소유자와 클라이언트가 일치하지 않으면 BAD_REQUEST 반환
        if (modelUserCode != userCode) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("타인의 모델에는 접근할 수 없습니다.");
        }

        // 모델 이름과 대표 이미지 경로 DB 수정
        voiceModel.setModelName(request.getModelName());
        voiceModel.setImagePath(request.getImagePath());
        voiceModelRepository.save(voiceModel);
        return ResponseEntity.status(HttpStatus.OK).body("모델 수정 성공!");
    }


    // 모델 삭제
    public ResponseEntity<String> deleteModel(long userCode, int modelCode) {
        // 사용자 정보 확인
        User user = userRepository.getUser(userCode);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        VoiceModel voiceModel = voiceModelRepository.findByModelCode(modelCode);

        // 예외 처리
        // 기본 제공 모델, 영상 제공 모델에 접근시 BAD_REQUEST 반환
        User modelUser = voiceModel.getUser();
        if (modelUser==null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("플랫폼에서 제공하는 모델에는 접근할 수 없습니다.");
        }
        long modelUserCode = modelUser.getUserCode();
        // 모델 소유자와 클라이언트가 일치하지 않으면 BAD_REQUEST 반환
        if (modelUserCode != userCode) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("타인의 모델에는 접근할 수 없습니다.");
        }

        voiceModelRepository.delete(voiceModel);
        return ResponseEntity.status(HttpStatus.OK).body("모델 삭제 성공!");
    }


    // 스크립트 조회
    public ResponseEntity<GetScriptResponse> getScript(long userCode) {
        // 사용자 정보 확인
        User user = userRepository.getUser(userCode);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        // 모든 스크립트 조회
        List<Script> scriptList = scriptRepository.findAll();
        // Dto 형태로 스크립트를 담을 빈 리스트 생성
        List<ScriptInfoDto> scripts = new ArrayList<>();
        // 스크립트 순회
        for (Script script : scriptList) {
            // Dto 에 담기
            ScriptInfoDto scriptInfoDto = ScriptInfoDto.builder()
                    .no(script.getScriptCode())
                    .script(script.getScript())
                    .build();
            // 리스트에 하나씩 추가
            scripts.add(scriptInfoDto);
        }
        // 리스폰스 생성
        GetScriptResponse response = GetScriptResponse.builder()
                .scripts(scripts)
                .build();

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }


    // 모델 생성 성공 여부 확인
    public ResponseEntity<String> checkModelCreate(int modelCode, Boolean isSuccess) {
        // 모델 코드로 모델 찾기
        if (!isSuccess) {
            voiceModelRepository.deleteById(modelCode);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("모델 생성에 실패하였습니다.");
        } else {
            // state = 3: '학습완료'로 갱신
            VoiceModel voiceModel = voiceModelRepository.findByModelCode(modelCode);
            voiceModel.setState(3);
            voiceModelRepository.save(voiceModel);
            return ResponseEntity.status(HttpStatus.OK).body("모델 생성에 성공하였습니다.");
        }

    }



    // 녹음 문장 개수(record_count) 갱신
    private void countRecord(VoiceModel voiceModel, int num) {
        voiceModel.setRecordCount(num);
        // 녹음 문장 개수가 200개가 되면 state = 1: '학습전'으로 DB 갱신
        if (num == 200) voiceModel.setState(1);
        voiceModelRepository.save(voiceModel);
    }


    // 리스트 뒤집기
    public void reverseList(List<VoiceModel> list) {
        int start = 0;
        int end = list.size() - 1;

        while (start < end) {
            // 리스트의 앞과 뒤 요소를 교환
            VoiceModel temp = list.get(start);
            list.set(start, list.get(end));
            list.set(end, temp);

            // 다음 요소로 이동
            start++;
            end--;
        }
    }


    // 리스트를 dto 로 바꿔주기
    public List<ModelInfoDto> modelListToDto(List<VoiceModel> list, boolean isMine, boolean isExistSource) {
        List<ModelInfoDto> changedList = new ArrayList<>();
        for (VoiceModel model : list) {
            // dto 에 필요한 값 넣기
            ModelInfoDto modelInfoDto = ModelInfoDto.builder()
                    .isMine(isMine)
                    .isExistSource(isExistSource)
                    .modelCode(model.getModelCode())
                    .modelName(model.getModelName())
                    .imagePath(model.getImagePath())
                    .recordCount(model.getRecordCount())
                    .state(model.getState())
                    .build();
            // 합치기
            changedList.add(modelInfoDto);
        }
        return changedList;
    }

}
