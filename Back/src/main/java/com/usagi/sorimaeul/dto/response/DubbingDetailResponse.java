package com.usagi.sorimaeul.dto.response;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DubbingDetailResponse {

    private int dubCode;
    private int videoSourceCode;
    private String dubName;
    private String dubDetail;
    private String nickname;
    private String profileImage;
    private int likeCount;
    private LocalDateTime createdTime;
    private String storagePath;
    private String thumbnailPath;
    private Boolean isLiked;
    private Boolean isComplete;
    private Boolean isPublic;

}
