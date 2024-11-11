package com.usagi.sorimaeul.api.controller;

import com.usagi.sorimaeul.api.service.CommentService;
import com.usagi.sorimaeul.dto.dto.CommentInfoDto;
import com.usagi.sorimaeul.dto.request.CommentCreateRequest;
import com.usagi.sorimaeul.dto.response.CommentListResponse;
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
@RequestMapping("/comment")
@RequiredArgsConstructor
@Tag(name = "Comment 컨트롤러", description = "댓글 관리를 위한 API")
public class CommentController {

    private final JwtTokenProvider jwtTokenProvider;
    private final CommentService commentService;

    @Operation(summary = "AI 커버 댓글 리스트 조회", description = "AI 커버 댓글 리스트를 조회한다.")
    @ApiResponse(responseCode = "200", description = "AI 커버 댓글 리스트 조회 성공")
    @GetMapping("/cover/{coverCode}")
    public ResponseEntity<CommentListResponse> getCoverCommentList(@RequestHeader("Authorization") String token,
                                                                   @PathVariable int coverCode) {
        long userCode = Long.parseLong(jwtTokenProvider.getPayload(token.substring(7)));
        return commentService.getCoverCommentList(userCode, coverCode);
    }


    @Operation(summary = "더빙 댓글 리스트 조회", description = "더빙 댓글 리스트를 조회한다.")
    @ApiResponse(responseCode = "200", description = "더빙 댓글 리스트 조회 성공")
    @GetMapping("/dub/{dubCode}")
    public ResponseEntity<CommentListResponse> getDubCommentList(@RequestHeader("Authorization") String token,
                                                                   @PathVariable int dubCode) {
        long userCode = Long.parseLong(jwtTokenProvider.getPayload(token.substring(7)));
        return commentService.getDubCommentList(userCode, dubCode);
    }


    @Operation(summary = "AI 커버 댓글 등록", description = "AI 커버 게시글에 댓글을 등록한다.")
    @ApiResponse(responseCode = "201", description = "AI 커버 게시글에 댓글 등록 성공",
            content = @Content(schema = @Schema(implementation = CommentInfoDto.class)))
    @PostMapping("/cover/{coverCode}")
    public ResponseEntity<?> createCoverComment(@RequestHeader("Authorization") String token,
                                                @PathVariable int coverCode,
                                                @RequestBody CommentCreateRequest request) {
        long userCode = Long.parseLong(jwtTokenProvider.getPayload(token.substring(7)));
        return commentService.createCoverComment(userCode, coverCode, request);
    }


    @Operation(summary = "더빙 댓글 등록", description = "더빙 게시글에 댓글을 등록한다.")
    @ApiResponse(responseCode = "201", description = "더빙 게시글에 댓글 등록 성공",
            content = @Content(schema = @Schema(implementation = CommentInfoDto.class)))
    @PostMapping("/dub/{dubCode}")
    public ResponseEntity<?> createDubComment(@RequestHeader("Authorization") String token,
                                                @PathVariable int dubCode,
                                                @RequestBody CommentCreateRequest request) {
        long userCode = Long.parseLong(jwtTokenProvider.getPayload(token.substring(7)));
        return commentService.createDubComment(userCode, dubCode, request);
    }


    @Operation(summary = "댓글 삭제", description = "댓글을 삭제한다.")
    @ApiResponse(responseCode = "200", description = "댓글 삭제 성공")
    @DeleteMapping("/{commentCode}")
    public ResponseEntity<?> deleteComment(@RequestHeader("Authorization") String token,
                                                @PathVariable int commentCode) {
        long userCode = Long.parseLong(jwtTokenProvider.getPayload(token.substring(7)));
        return commentService.deleteComment(userCode, commentCode);
    }

}
