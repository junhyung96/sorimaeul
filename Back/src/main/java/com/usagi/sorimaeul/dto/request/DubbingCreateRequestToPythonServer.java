package com.usagi.sorimaeul.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class DubbingCreateRequestToPythonServer {

    private long userCode;
    private int dubCode;
    private String dubName;
    private String videoURL;
    private String[] voiceURL;
}
