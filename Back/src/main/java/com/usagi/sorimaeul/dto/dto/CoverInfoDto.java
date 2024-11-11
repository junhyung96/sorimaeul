package com.usagi.sorimaeul.dto.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CoverInfoDto {

    private int coverCode;
    private String coverName;
    private String storagePath;
    private Boolean isPublic;
    private int likeCount;
    private String thumbnailPath;
    private String nickname;
    private String profileImage;
    private String coverSinger;
    private String singer;
    private String title;
    private Boolean isComplete;
    private LocalDateTime createdTime;
    private LocalDateTime postTime;

}
