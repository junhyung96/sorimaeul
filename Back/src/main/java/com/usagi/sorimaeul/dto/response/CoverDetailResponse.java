package com.usagi.sorimaeul.dto.response;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CoverDetailResponse {

    private String coverName;
    private String coverDetail;
    private String storagePath;
    private int likeCount;
    private String thumbnailPath;
    private String nickname;
    private String profileImage;
    private String coverSinger;
    private String singer;
    private String title;
    private Boolean isLiked;
    private Boolean isComplete;
    private Boolean isPublic;
    private LocalDateTime createdTime;
    private LocalDateTime postTime;

}
