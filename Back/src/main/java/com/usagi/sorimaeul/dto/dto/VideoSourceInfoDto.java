package com.usagi.sorimaeul.dto.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VideoSourceInfoDto {

    private int videoSourceCode;
    private String sourceName;
    private String thumbnailPath;
    private String videoPlaytime;
    private LocalDateTime createdTime;
    private String sourceDetail;
}
