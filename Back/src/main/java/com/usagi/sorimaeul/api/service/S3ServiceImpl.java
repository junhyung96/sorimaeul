package com.usagi.sorimaeul.api.service;

import com.amazonaws.HttpMethod;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.*;
import com.usagi.sorimaeul.dto.dto.ResponseS3Dto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Date;
import java.util.TimeZone;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class S3ServiceImpl implements S3Service {

    private final AmazonS3 amazonS3;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    // 파일 업로드를 위한 presignedUrl 요청
    @Override
    public ResponseS3Dto getPresignedUrlToUpload(long userCode, String fileName, String mimeType) {
        // 현재 시간을 기준으로 30분 후의 시간을 얻습니다.
        Date expiration = new Date(System.currentTimeMillis() + TimeUnit.MINUTES.toMillis(30));

        // 한국 시간대로 변경합니다.
        TimeZone timeZone = TimeZone.getTimeZone("Asia/Seoul");
        expiration.setTime(expiration.getTime() + timeZone.getRawOffset());

        // fileName ( Front에서 파일명 생성 날짜 + 파일명 + 난수 )
        // 경로 구성 => filePath = mimeType 앞부분 + 파일명
        String filePath = mimeType.split("/")[0] + "/" + fileName;
        GeneratePresignedUrlRequest generatePresignedUrlRequest = new GeneratePresignedUrlRequest(bucket, filePath)
                .withMethod(HttpMethod.PUT)
                .withExpiration(expiration);

        // content-type을 지정합니다.
        generatePresignedUrlRequest.addRequestParameter("Content-Type", mimeType);

        return ResponseS3Dto.builder()
                .url(amazonS3.generatePresignedUrl(generatePresignedUrlRequest).toString())
                .build();
    }

    public String saveFileToS3(String folderPath, MultipartFile multipartFile) throws IOException {
        String originalFilename = multipartFile.getOriginalFilename();

        // 파일을 저장할 경로와 파일명을 조합합니다.
        String keyName = folderPath + "/" + originalFilename;

        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(multipartFile.getSize());
        metadata.setContentType(multipartFile.getContentType());

        // 객체 키에 폴더 경로를 포함하여 파일을 업로드합니다.
        amazonS3.putObject(bucket, keyName, multipartFile.getInputStream(), metadata);

        // 업로드된 파일의 URL을 반환합니다.
        return amazonS3.getUrl(bucket, keyName).toString();
    }

    public void saveByteToS3(String key, byte[] fileBytes) {
        InputStream inputStream = new ByteArrayInputStream(fileBytes);
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(fileBytes.length);

        PutObjectRequest request = new PutObjectRequest(bucket, key, inputStream, metadata);
        amazonS3.putObject(request);
    }
    /**
     * 버킷에서 파일을 가져와 byte[]로 반환합니다.
     *
     * @param key 파일의 키 (파일 이름과 경로)
     * @return 파일의 내용을 담고 있는 byte[]
     */
    public byte[] downloadFile(final String key) {
        try (S3Object s3Object = amazonS3.getObject(new GetObjectRequest(bucket, key));
             InputStream objectContent = s3Object.getObjectContent();
             ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {
            byte[] buffer = new byte[1024];
            int length;
            while ((length = objectContent.read(buffer)) != -1) {
                outputStream.write(buffer, 0, length);
            }
            return outputStream.toByteArray();
        } catch (IOException e) {
            throw new RuntimeException("S3 파일 다운로드 중 오류 발생", e);
        }
    }
}