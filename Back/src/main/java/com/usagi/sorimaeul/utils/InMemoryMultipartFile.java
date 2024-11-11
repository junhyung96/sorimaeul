package com.usagi.sorimaeul.utils;

import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

public class InMemoryMultipartFile implements MultipartFile {

    private final byte[] content;
    private final String name;
    private final String originalFilename;
    private final String contentType;

    public InMemoryMultipartFile(byte[] content, String originalFilename) {
        this(content, originalFilename, "application/octet-stream");
    }

    public InMemoryMultipartFile(byte[] content, String originalFilename, String contentType) {
        this.content = content;
        this.name = StringUtils.cleanPath(originalFilename);
        this.originalFilename = originalFilename;
        this.contentType = contentType;
    }

    @Override
    public String getName() {
        return name;
    }

    @Override
    public String getOriginalFilename() {
        return originalFilename;
    }

    @Override
    public String getContentType() {
        return contentType;
    }

    @Override
    public boolean isEmpty() {
        return content.length == 0;
    }

    @Override
    public long getSize() {
        return content.length;
    }

    @Override
    public byte[] getBytes() {
        return content;
    }

    @Override
    public InputStream getInputStream() {
        return new ByteArrayInputStream(content);
    }

    @Override
    public void transferTo(java.io.File dest) throws IOException, IllegalStateException {
        Files.copy(new ByteArrayInputStream(content), dest.toPath());
    }


    // 서버에서 MultipartFile 을 받아오는 메서드
    public static MultipartFile createMultipartFile(String filePath) {
        try {
            // 파일 경로로부터 파일을 읽어옴
            byte[] fileContent = Files.readAllBytes(Paths.get(filePath));

            // 파일 이름을 가져옴
            String fileName = new File(filePath).getName();

            // MultipartFile 객체 생성
            return new InMemoryMultipartFile(fileContent, fileName);
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }


    // 서버에서 MultipartFiles 를 받아오는 메서드
    public static List<MultipartFile> createMultipartFiles(String folderPath) {
        List<MultipartFile> multipartFiles = new ArrayList<>();
        try {
            // 폴더 내 모든 파일에 대해 반복
            Files.walk(Paths.get(folderPath))
                    .filter(Files::isRegularFile)
                    .forEach(filePath -> {
                        try {
                            // 파일을 읽어와서 MultipartFile 객체로 변환하여 리스트에 추가
                            byte[] fileContent = Files.readAllBytes(filePath);
                            String fileName = filePath.getFileName().toString();
                            multipartFiles.add(new InMemoryMultipartFile(fileContent, fileName));
                        } catch (IOException e) {
                            e.printStackTrace();
                        }
                    });
        } catch (IOException e) {
            e.printStackTrace();
        }
        return multipartFiles;
    }


    // 서버에서 내가 원하는 확장자의 MultipartFiles 를 받아오는 메서드
    public static List<MultipartFile> createMultipartFilesWithAllowedExtensions(String folderPath, List<String> extensions) {
        List<MultipartFile> multipartFiles = new ArrayList<>();
        try {
            // 폴더 내 모든 파일에 대해 반복
            Files.walk(Paths.get(folderPath))
                    .filter(Files::isRegularFile)
                    .filter(filePath -> {
                        // 파일 확장자가 ALLOWED_EXTENSIONS_AUDIO에 포함된 확장자인지 확인
                        String fileName = filePath.getFileName().toString();
                        String fileExtension = fileName.substring(fileName.lastIndexOf(".") + 1).toLowerCase();
                        return extensions.contains(fileExtension);
                    })
                    .forEach(filePath -> {
                        try {
                            // 파일을 읽어와서 MultipartFile 객체로 변환하여 리스트에 추가
                            byte[] fileContent = Files.readAllBytes(filePath);
                            String fileName = filePath.getFileName().toString();
                            multipartFiles.add(new InMemoryMultipartFile(fileContent, fileName));
                        } catch (IOException e) {
                            e.printStackTrace();
                        }
                    });
        } catch (IOException e) {
            e.printStackTrace();
        }
        return multipartFiles;
    }

}



