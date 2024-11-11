package com.usagi.sorimaeul.api.controller;

import com.usagi.sorimaeul.api.service.CoverService;
import com.usagi.sorimaeul.dto.request.CoverBoardRequest;
import com.usagi.sorimaeul.dto.request.CoverCreateRequest;
import com.usagi.sorimaeul.dto.response.CoverCreateResponse;
import com.usagi.sorimaeul.dto.response.CoverDetailResponse;
import com.usagi.sorimaeul.dto.response.CoverListResponse;
import com.usagi.sorimaeul.dto.response.CoverSourceListResponse;
import com.usagi.sorimaeul.utils.JwtTokenProvider;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/cover")
@RequiredArgsConstructor
@Tag(name = "Cover 컨트롤러", description = "AI 커버 관리를 위한 API")
public class CoverController {

    private final JwtTokenProvider jwtTokenProvider;
    private final CoverService coverService;

    @Operation(summary = "AI 커버 목록 조회", description = "AI 커버 목록을 조회한다.")
    @ApiResponse(responseCode = "200", description = "AI 커버 목록 조회 성공")
    @GetMapping
    public ResponseEntity<CoverListResponse> getCoverList(@RequestHeader("Authorization") String token,
                                                          @RequestParam String target,
                                                          @RequestParam(required = false) String keyword,
                                                          @RequestParam(required = false) Integer page) {
        long userCode = Long.parseLong(jwtTokenProvider.getPayload(token.substring(7)));
        return coverService.getCoverList(userCode, target, keyword, page);
    }


    @Operation(summary = "AI 커버 상세 조회", description = "AI 커버 상세 조회한다.")
    @ApiResponse(responseCode = "200", description = "AI 커버 상세 조회 성공",
            content = @Content(schema = @Schema(implementation = CoverDetailResponse.class)))
    @GetMapping("/{coverCode}")
    public ResponseEntity<?> getCoverDetail(@RequestHeader("Authorization") String token,
                                                            @PathVariable int coverCode) {
        long userCode = Long.parseLong(jwtTokenProvider.getPayload(token.substring(7)));
        return coverService.getCoverDetail(userCode, coverCode);
    }


    @Operation(summary = "AI 커버 생성", description = "AI 커버를 생성한다.")
    @ApiResponse(responseCode = "201", description = "AI 커버 생성 성공",
            content = @Content(schema = @Schema(implementation = CoverCreateResponse.class)))
    @PostMapping("/create")
    public ResponseEntity<?> createCover(@RequestHeader("Authorization") String token,
                                                           @RequestBody CoverCreateRequest request) {
        long userCode = Long.parseLong(jwtTokenProvider.getPayload(token.substring(7)));
        return coverService.createCover(userCode, request);
    }


    @Operation(summary = "AI 커버 등록/수정", description = "AI 커버를 등록하거나 수정한다.")
    @ApiResponse(responseCode = "200", description = "AI 커버 등록/수정 성공")
    @PatchMapping("/board/{coverCode}")
    public ResponseEntity<?> createCoverBoard(@RequestHeader("Authorization") String token,
                                         @PathVariable int coverCode,
                                         @RequestBody CoverBoardRequest request) {
        long userCode = Long.parseLong(jwtTokenProvider.getPayload(token.substring(7)));
        return coverService.createCoverBoard(userCode, coverCode, request);
    }


    @Operation(summary = "AI 커버 삭제", description = "AI 커버를 삭제한다.")
    @ApiResponse(responseCode = "204", description = "AI 커버 삭제 성공")
    @DeleteMapping("/board/{coverCode}")
    public ResponseEntity<?> deleteCover(@RequestHeader("Authorization") String token,
                                              @PathVariable int coverCode) {
        long userCode = Long.parseLong(jwtTokenProvider.getPayload(token.substring(7)));
        return coverService.deleteCover(userCode, coverCode);
    }


    @Operation(summary = "생성된 AI 커버 저장", description = "생성된 AI 커버를 저장한다.")
    @ApiResponse(responseCode = "201", description = "생성된 AI 커버 저장 성공")
    @PostMapping("/save/{coverCode}")
    public ResponseEntity<?> saveCreatedCover(@PathVariable int coverCode, MultipartFile file) {
        return coverService.saveCreatedCover(coverCode, file);
    }


    @Operation(summary = "AI 커버 소스 목록 조회", description = "서버에서 제공하는 AI 커버 소스 목록을 조회한다.")
    @ApiResponse(responseCode = "200", description = "AI 커버 소스 목록 조회 성공",
            content = @Content(schema = @Schema(implementation = CoverSourceListResponse.class)))
    @GetMapping("/source")
    public ResponseEntity<?> getCoverSourceList(@RequestHeader("Authorization") String token) {
        long userCode = Long.parseLong(jwtTokenProvider.getPayload(token.substring(7)));
        return coverService.getCoverSourceList(userCode);
    }


    @Operation(summary = "AI 커버 생성 성공 여부 확인", description = "AI 커버 생성 성공 여부를 확인한다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "AI 커버 생성 성공!"),
            @ApiResponse(responseCode = "204", description = "AI 커버 생성 실패!")
    })
    @GetMapping("/check/{coverCode}/{isSuccess}")
    public ResponseEntity<String> checkCoverCreate(@PathVariable int coverCode, @PathVariable Boolean isSuccess) {
        return coverService.checkCoverCreate(coverCode, isSuccess);
    }

}
