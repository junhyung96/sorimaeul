package com.usagi.sorimaeul.dto.request;

import lombok.Getter;

@Getter
public class CoverCreateRequest {

    private String youtubeLink;
    private String singer;
    private String title;
    private int modelCode;
    private int pitch;
    private String coverName;

}
