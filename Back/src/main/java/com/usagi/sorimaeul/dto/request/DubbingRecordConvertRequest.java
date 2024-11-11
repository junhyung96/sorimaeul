package com.usagi.sorimaeul.dto.request;

import lombok.Getter;

@Getter
public class DubbingRecordConvertRequest {

    private int videoSourceCode;
    private int modelCode;
    private String voicePath;
    private int pitch;
}
