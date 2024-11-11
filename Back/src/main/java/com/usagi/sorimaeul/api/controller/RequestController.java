package com.usagi.sorimaeul.api.controller;

import com.usagi.sorimaeul.api.service.RequestBoardService;
import com.usagi.sorimaeul.dto.request.RequestCreateRequest;
import com.usagi.sorimaeul.dto.response.RequestCreateResponse;
import com.usagi.sorimaeul.dto.response.RequestDetailResponse;
import com.usagi.sorimaeul.dto.response.RequestListResponse;
import com.usagi.sorimaeul.utils.JwtTokenProvider;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/request")
@RequiredArgsConstructor
@Tag(name = "Request 컨트롤러", description = "문의(요청) 게시판 관리를 위한 API")
public class RequestController {
    private final JwtTokenProvider jwtTokenProvider;
    private final RequestBoardService requestBoardService;

    @Operation(summary = "문의 게시글 목록 조회", description = "문의 게시글 목록을 조회한다.")
    @ApiResponse(responseCode = "200", description = "문의 게시글 목록 조회 성공")
    @GetMapping
    public ResponseEntity<RequestListResponse> getRequestList(@RequestHeader("Authorization") String token,
                                                              @RequestParam(required = false) int page,
                                                              @RequestParam(required = false) int typeCode) {
        long userCode = Long.parseLong(jwtTokenProvider.getPayload(token.substring(7)));
        return requestBoardService.getRequestList(userCode, typeCode, page);
    }

    @Operation(summary = "문의 게시글 상세 조회", description = "문의 게시글을 조회한다.")
    @ApiResponse(responseCode = "200", description = "문의 게시글 조회 성공")
    @GetMapping("/{boardCode}")
    public ResponseEntity<RequestDetailResponse> getRequestDetail(@RequestHeader("Authorization") String token,
                                                                            @PathVariable int boardCode) {
        long userCode = Long.parseLong(jwtTokenProvider.getPayload(token.substring(7)));
        return requestBoardService.getRequestDetail(userCode, boardCode);
    }

    @Operation(summary = "문의 게시글 생성", description = "문의 게시글을 생성한다.")
    @ApiResponse(responseCode = "201", description = "문의 게시글 생성 성공",
            content = @Content(schema = @Schema(implementation = RequestCreateResponse.class)))
    @PostMapping
    public ResponseEntity<?> createRequest(@RequestHeader("Authorization") String token,
                                           @RequestBody RequestCreateRequest request) {
        long userCode = Long.parseLong(jwtTokenProvider.getPayload(token.substring(7)));
        return requestBoardService.createRequest(userCode, request);
    }

    @Operation(summary = "문의 게시글 수정", description = "문의 게시글을 수정한다.")
    @ApiResponse(responseCode = "200", description = "문의 게시글 수정 성공")
    @PutMapping("/{boardCode}")
    public ResponseEntity<?> updateRequest(@RequestHeader("Authorization") String token,
                                           @PathVariable int boardCode,
                                           @RequestBody RequestCreateRequest request) {
        long userCode = Long.parseLong(jwtTokenProvider.getPayload(token.substring(7)));
        return requestBoardService.updateRequest(userCode, boardCode, request);
    }

    @Operation(summary = "문의 게시글 삭제", description = "문의 게시글을 삭제한다.")
    @ApiResponse(responseCode = "204", description = "문의 게시글 삭제 성공")
    @DeleteMapping("/{boardCode}")
    public ResponseEntity<?> deleteRequest(@RequestHeader("Authorization") String token,
                                           @PathVariable int boardCode) {
        long userCode = Long.parseLong(jwtTokenProvider.getPayload(token.substring(7)));
        return requestBoardService.deleteRequest(userCode, boardCode);
    }

    @Operation(summary = "자주 묻는 질물 목록 조회", description = "자주 묻는 질문 목록을 조회한다.")
    @ApiResponse(responseCode = "200", description = "자주 묻는 질물 목록 조회 성공")
    @GetMapping("/faq")
    public ResponseEntity<?> getFAQList(@RequestHeader("Authorization") String token) {
        long userCode = Long.parseLong(jwtTokenProvider.getPayload(token.substring(7)));
        return requestBoardService.getFAQList(userCode);
    }
}
