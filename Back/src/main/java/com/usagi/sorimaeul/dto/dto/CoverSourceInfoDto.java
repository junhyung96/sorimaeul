package com.usagi.sorimaeul.dto.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CoverSourceInfoDto {

    private int coverSourceCode;
    private String singer;
    private String title;
    private String youtubeLink;
    private String thumbnailPath;

}
