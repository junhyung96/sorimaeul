package com.usagi.sorimaeul.api.controller;

import com.usagi.sorimaeul.api.service.S3Service;
import com.usagi.sorimaeul.dto.dto.ResponseS3Dto;
import com.usagi.sorimaeul.utils.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/s3")
public class S3Controller {

    private final S3Service s3Service;
    private final JwtTokenProvider jwtTokenProvider;

    // presigned url 요청 api
    // 파일 종류
    // 녹음 m4a, mp3, wav
    // 이미지 jpeg, jpg, png
    // 외부모델 pth, index
    @GetMapping("/upload")
    public ResponseEntity<?> getPresignedUrlToUpload(@RequestHeader("Authorization") String token,
                                                  @RequestParam(value = "fileName") String fileName,
                                                  @RequestParam(value = "mimeType") String mimeType,
                                                  @RequestParam(value = "fileSize") long fileSize) throws IOException {

        long userCode = Long.parseLong(jwtTokenProvider.getPayload(token.substring(7)));

        final long maxSize = 10 * 1024 * 1024; // 10MB
        if (fileSize > maxSize){
            return ResponseEntity.badRequest().body("File size exceeds the limit of 10MB.");
        }

        ResponseS3Dto response = s3Service.getPresignedUrlToUpload(userCode, fileName, mimeType);

        return ResponseEntity.ok(response);
    }

}