package com.usagi.sorimaeul.api.service;

import com.usagi.sorimaeul.dto.dto.ResponseS3Dto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;


public interface S3Service {

    ResponseS3Dto getPresignedUrlToUpload(long userCode, String fileName, String mimeType);

    String saveFileToS3(String path, MultipartFile multipartFile) throws IOException;

    byte[] downloadFile(String key);

    void saveByteToS3(String key, byte[] fileBytes);
}