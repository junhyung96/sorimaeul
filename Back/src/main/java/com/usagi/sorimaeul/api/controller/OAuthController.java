package com.usagi.sorimaeul.api.controller;

import com.usagi.sorimaeul.api.service.OAuthService;
import com.usagi.sorimaeul.dto.response.TokenResponse;
import com.usagi.sorimaeul.utils.JwtTokenProvider;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

@RestController
@RequestMapping("/oauth")
@RequiredArgsConstructor
@Tag(name = "OAuth 컨트롤러", description = "로그인 기능을 위한 API")
public class OAuthController {

    private final OAuthService oAuthService;

    @Operation(summary = "소셜 로그인 페이지로 이동",
            description = "소셜 로그인 페이지로 이동하여 소셜 로그인 후 code 받음")
    @ApiResponse(responseCode = "303", description = "소셜 로그인 페이지로 이동")
    @GetMapping("/code/{provider}")
    public ResponseEntity<?> getCode(@PathVariable String provider) throws URISyntaxException {
        URI redirectUri = oAuthService.getCode(provider);

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setLocation(redirectUri);

        return new ResponseEntity<>(httpHeaders, HttpStatus.SEE_OTHER);
    }

    @Operation(summary = "로그인",
            description = "소셜 로그인 code를 받아 소리마을 로그인 실행")
    @ApiResponse(responseCode = "200", description = "토큰 제공")
    @GetMapping("/login/{provider}")
    public ResponseEntity<TokenResponse> login(@PathVariable String provider,
                                       @RequestParam("code") String code) {
        TokenResponse response = oAuthService.login(provider, code);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "로그아웃",
            description = "토큰을 받아 로그아웃")
    @ApiResponse(responseCode = "200", description = "로그아웃 성공")
    @GetMapping("/logout")
    public ResponseEntity<?> logout(@RequestParam String accessToken, @RequestParam String refreshToken) {
        oAuthService.logout(accessToken, refreshToken);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "토큰 재발급",
            description = "액세스 토큰 만료 시 리프레시 토큰 재발급")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "토큰 재발급"),
            @ApiResponse(responseCode = "401", description = "만료된 리프레시 토큰")
    })
    @GetMapping("/reissue")
    public ResponseEntity<?> reissue(@RequestHeader("Authorization") String token) {
        String refreshToken = token.substring(7);
        TokenResponse response = oAuthService.reissue(refreshToken);
        if (response != null) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("JWT token expired");
        }
    }

}
