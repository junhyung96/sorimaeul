package com.usagi.sorimaeul.api.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.usagi.sorimaeul.api.service.DubbingService;
import com.usagi.sorimaeul.dto.request.*;
import com.usagi.sorimaeul.dto.response.*;
import com.usagi.sorimaeul.utils.JwtTokenProvider;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/dub")
@Tag(name = "Dub 컨트롤러", description = "더빙학원 기능을 위한 API")
public class DubbingController {

    private final JwtTokenProvider jwtTokenProvider;
    private final DubbingService dubbingService;

    @Operation(summary = "더빙 영상 제작", description = "더빙 영상을 제작한다")
    @ApiResponse(responseCode = "201", description = "더빙 영상 제작 성공")
    @PostMapping("/create")
    public ResponseEntity<DubbingCreateResponse> createDubbing(@RequestHeader("Authorization") String token,
                                                               @RequestBody DubbingCreateRequest request) {
        // API 요청 시 헤더 중 Authorization 키에 담긴 값을 받아옴
        // 유저 코드 받아오기
        long userCode = Long.parseLong(jwtTokenProvider.getPayload(token.substring(7)));

        return dubbingService.createDubbing(userCode, request);
    }

    @Operation(summary = "더빙 영상 저장", description = "더빙 영상을 S3 서버에 저장한다")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "더빙 영상 S3 저장 성공"),
            @ApiResponse(responseCode = "400", description = "더빙 영상 S3 저장 실패")
    })
    @PostMapping("/save")
    public ResponseEntity<?> saveDubbing(@RequestBody DubbingSaveRequest request) {
        // 유저 코드 받아오기
        return dubbingService.saveDubbing(request);
    }

    @Operation(summary = "더빙 원본 영상 목록 조회", description = "더빙 원본 영상 목록 조회한다.")
    @ApiResponse(responseCode = "200", description = "더빙 원본 영상 목록 조회 성공")
    @GetMapping("/video")
    public ResponseEntity<VideoSourceListResponse> getVideoSourceList(@RequestHeader("Authorization") String token,
                                                                      @RequestParam(required = false) Integer page,
                                                                      @RequestParam(required = false) String target
    ) {
        long userCode = Long.parseLong(jwtTokenProvider.getPayload(token.substring(7)));
        return dubbingService.getVideoSourceList(userCode, page, target);
    }

    @Operation(summary = "더빙 원본 영상 상세 조회", description = "더빙 원본 영상을 상세 조회한다.")
    @ApiResponse(responseCode = "200", description = "더빙 원본 영상 상세 조회 성공")
    @GetMapping("/video/{videoSourceCode}")
    public ResponseEntity<VideoSourceDetailResponse> getVideoSourceDetail(@RequestHeader("Authorization") String token,
                                                                          @PathVariable int videoSourceCode) {
        long userCode = Long.parseLong(jwtTokenProvider.getPayload(token.substring(7)));
        return dubbingService.getVideoSourceDetail(userCode, videoSourceCode);
    }

    @Operation(summary = "더빙 원본 영상 파일 조회", description = "더빙 원본 영상 파일을 조회한다.")
    @ApiResponse(responseCode = "200", description = "더빙 원본 영상 파일 조회 성공")
    @GetMapping("/file/{videoSourceCode}")
    public ResponseEntity<Resource> getSourceVideo(@RequestHeader("Authorization") String token,
                                                   @PathVariable int videoSourceCode) {

        long userCode = Long.parseLong(jwtTokenProvider.getPayload(token.substring(7)));
        return dubbingService.getSourceVideo(userCode, videoSourceCode);
    }

    @Operation(summary = "더빙 영상 목록 조회", description = "더빙 영상 목록을 조회한다.")
    @ApiResponse(responseCode = "200", description = "더빙 영상 목록 조회 성공")
    @GetMapping
    public ResponseEntity<DubbingListResponse> getDubbingList(@RequestHeader("Authorization") String token,
                                                              @RequestParam String target,
                                                              @RequestParam(required = false) String keyword,
                                                              @RequestParam(required = false) Integer page,
                                                              @RequestParam(required = false) Integer videoSourceCode
    ) {
        long userCode = Long.parseLong(jwtTokenProvider.getPayload(token.substring(7)));
        return dubbingService.getDubbingList(userCode, target, keyword, page, videoSourceCode);
    }

    @Operation(summary = "더빙 영상 상세 조회", description = "더빙 영상을 상세 조회한다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "더빙 영상 상세 조회 성공"),
            @ApiResponse(responseCode = "400", description = "더빙 영상 상세 조회 실패")
    })
    @GetMapping("/{dubCode}")
    public ResponseEntity<?> getDubbingDetail(@RequestHeader("Authorization") String token,
                                                                  @PathVariable int dubCode) {
        long userCode = Long.parseLong(jwtTokenProvider.getPayload(token.substring(7)));
        return dubbingService.getDubbingDetail(userCode, dubCode);
    }

    @Operation(summary = "더빙 영상 파일 조회", description = "더빙 영상 파일을 조회한다.")
    @ApiResponse(responseCode = "200", description = "더빙 영상 파일 조회 성공")
    @GetMapping("/file/{dubCode}")
    public ResponseEntity<Resource> getDubbingVideo(@RequestHeader("Authorization") String token,
                                                    @PathVariable int dubCode) {

        long userCode = Long.parseLong(jwtTokenProvider.getPayload(token.substring(7)));
        return dubbingService.getDubbingVideo(userCode, dubCode);
    }

    @Operation(summary = "더빙 영상 게시글 등록/수정", description = "더빙 영상 게시글을 등록하거나 수정한다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "더빙 영상 등록/수정 성공"),
            @ApiResponse(responseCode = "400", description = "더빙 영상 등록/수정 실패")
    })
    @PatchMapping("/{dubCode}")
    public ResponseEntity<?> patchDubbingBoard(@RequestHeader("Authorization") String token,
                                               @PathVariable int dubCode,
                                               @RequestBody DubbingBoardRequest request) {
        long userCode = Long.parseLong(jwtTokenProvider.getPayload(token.substring(7)));
        return dubbingService.patchDubbingBoard(userCode, dubCode, request);
    }

    @Operation(summary = "더빙 영상 삭제", description = "더빙 영상을 삭제한다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "더빙 영상 삭제 성공"),
            @ApiResponse(responseCode = "400", description = "더빙 영상 삭제 실패")
    })
    @DeleteMapping("/{dubCode}")
    public ResponseEntity<?> deleteDubbing(@RequestHeader("Authorization") String token,
                                           @PathVariable int dubCode) {
        long userCode = Long.parseLong(jwtTokenProvider.getPayload(token.substring(7)));
        return dubbingService.deleteDubbing(userCode, dubCode);
    }

    @Operation(summary = "더빙 영상 분리된 음성 조회", description = "더빙 영상 분리된 음성을 조회한다.")
    @ApiResponse(responseCode = "200", description = "더빙 영상 분리된 음성 조회 성공")
    @GetMapping("/audio/{videoSourceCode}")
    public ResponseEntity<VideoSourceVoiceResponse> getVideoSourceVoice(@RequestHeader("Authorization") String token,
                                                                        @PathVariable int videoSourceCode) {
        long userCode = Long.parseLong(jwtTokenProvider.getPayload(token.substring(7)));
        return dubbingService.getVideoSourceVoice(userCode, videoSourceCode);
    }


    @Operation(summary = "더빙 영상 녹음 업로드", description = "더빙 영상 녹음을 업로드한다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "더빙 영상 녹음 업로드 성공",
                    content = @Content(schema = @Schema(implementation = DubbingRecordResponse.class))),
            @ApiResponse(responseCode = "400", description = "더빙 영상 녹음 업로드 실패")})
    @PostMapping("/record/{videoSourceCode}/{num}")
    public ResponseEntity<?> uploadDubbingRecord(@RequestHeader("Authorization") String token,
                                                 @PathVariable int num,
                                                 @PathVariable int videoSourceCode,
                                                 @RequestParam("recordFile") MultipartFile recordFile) {
        long userCode = Long.parseLong(jwtTokenProvider.getPayload(token.substring(7)));

        return dubbingService.uploadDubbingRecord(userCode, num, videoSourceCode, recordFile);
    }

    @Operation(summary = "더빙 음성 변환", description = "더빙 음성을 변환한다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "더빙 음성 변환 성공"),
            @ApiResponse(responseCode = "400", description = "더빙 음성 변환 실패")
    })
    @PostMapping("/convert/{voiceIndex}")
    public ResponseEntity<?> convertDubbingRecord(@RequestHeader("Authorization") String token,
                                                  @PathVariable int voiceIndex,
                                                  @RequestBody DubbingRecordConvertRequest request) {
        long userCode = Long.parseLong(jwtTokenProvider.getPayload(token.substring(7)));
        return dubbingService.convertDubbingRecord(userCode, voiceIndex, request);
    }


    @Operation(summary = "더빙 생성 성공 여부 확인", description = "더빙 생성 성공 여부를 확인한다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "더빙 생성 성공!"),
            @ApiResponse(responseCode = "204", description = "더빙 생성 실패!")
    })
    @GetMapping("/check/{dubCode}/{isSuccess}")
    public ResponseEntity<String> checkDubbingCreate(@PathVariable int dubCode, @PathVariable Boolean isSuccess) {
        return dubbingService.checkDubbingCreate(dubCode, isSuccess);
    }
}
