package com.usagi.sorimaeul.dto.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DubbingInfoDto {

    private int dubCode;
    private int videoSourceCode;
    private String dubName;
    private String thumbnailPath;
    private String dubDetail;
    private Boolean isPublic;
    private String nickname;
    private String profileImage;
    private int likeCount;
    private LocalDateTime createdTime;
    private int isLiked;
    private Boolean isComplete;

}
