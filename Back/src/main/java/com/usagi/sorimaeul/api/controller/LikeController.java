package com.usagi.sorimaeul.api.controller;

import com.usagi.sorimaeul.api.service.LikeService;
import com.usagi.sorimaeul.utils.JwtTokenProvider;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/like")
@RequiredArgsConstructor
@Tag(name = "Like 컨트롤러", description = "좋아요 관리를 위한 API")
public class LikeController {

    private final JwtTokenProvider jwtTokenProvider;
    private final LikeService likeService;

    @Operation(summary = "더빙 좋아요 추가", description = "더빙 영상에 좋아요를 추가한다.")
    @ApiResponse(responseCode = "200", description = "더빙 좋아요 추가 성공")
    @GetMapping("/dub/{dubCode}")
    public ResponseEntity<?> dubLike(@RequestHeader("Authorization") String token,
                                                          @PathVariable int dubCode) {
        long userCode = Long.parseLong(jwtTokenProvider.getPayload(token.substring(7)));
        return likeService.dubLike(userCode, dubCode);
    }


    @Operation(summary = "AI 커버 좋아요 추가", description = "AI 커버 게시글에 좋아요를 추가한다.")
    @ApiResponse(responseCode = "200", description = "커버 좋아요 추가 성공")
    @GetMapping("/cover/{coverCode}")
    public ResponseEntity<?> coverLike(@RequestHeader("Authorization") String token,
                                          @PathVariable int coverCode) {
        long userCode = Long.parseLong(jwtTokenProvider.getPayload(token.substring(7)));
        return likeService.coverLike(userCode, coverCode);
    }


    @Operation(summary = "더빙 좋아요 취소", description = "더빙 영상에서 좋아요를 취소한다.")
    @ApiResponse(responseCode = "200", description = "더빙 좋아요 취소 성공")
    @DeleteMapping("/dub/{dubCode}")
    public ResponseEntity<?> dubLikeCancel(@RequestHeader("Authorization") String token,
                                          @PathVariable int dubCode) {
        long userCode = Long.parseLong(jwtTokenProvider.getPayload(token.substring(7)));
        return likeService.dubLikeCancel(userCode, dubCode);
    }


    @Operation(summary = "AI 커버 좋아요 취소", description = "AI 커버 게시글에서 좋아요를 취소한다.")
    @ApiResponse(responseCode = "200", description = "커버 좋아요 취소 성공")
    @DeleteMapping("/cover/{coverCode}")
    public ResponseEntity<?> coverLikeCancel(@RequestHeader("Authorization") String token,
                                          @PathVariable int coverCode) {
        long userCode = Long.parseLong(jwtTokenProvider.getPayload(token.substring(7)));
        return likeService.coverLikeCancel(userCode, coverCode);
    }



}
