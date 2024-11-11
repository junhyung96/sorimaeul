package com.usagi.sorimaeul.utils;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;

public class FileUtil {

    // 폴더 생성
    public static void createFolder(String folderPath) throws IOException {
        Path path = Paths.get(folderPath);
        if (!Files.exists(path)) Files.createDirectories(path);
    }


    // 파일 저장
    public static void saveFile(String filePath, byte[] data) throws IOException {
        Path path = Paths.get(filePath);
        Files.write(path, data);
    }

    // 파일 확장자 추출
    public static String getFileExtension(String fileName) {
        return fileName.substring(fileName.lastIndexOf(".") + 1);
    }


    // 허용된 확장자 여부 확인
    public static final List<String> ALLOWED_EXTENSIONS_AUDIO = Arrays.asList("mp3", "m4a", "wav");

    public static final List<String> ALLOWED_EXTENSIONS_MODEL = Arrays.asList("pth", "index");


    public static boolean isAllowedExtension(String extension, List<String> list) {
        return list.contains(extension.toLowerCase());
    }

}
