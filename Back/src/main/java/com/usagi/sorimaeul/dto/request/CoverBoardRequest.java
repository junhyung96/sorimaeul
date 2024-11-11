package com.usagi.sorimaeul.dto.request;

import jakarta.annotation.Nullable;
import lombok.Getter;

@Getter
public class CoverBoardRequest {

    private String coverName;
    @Nullable
    private String coverDetail;
    @Nullable
    private String thumbnailPath;
    private Boolean isPublic;

}
