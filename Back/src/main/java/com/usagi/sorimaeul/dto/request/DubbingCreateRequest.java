package com.usagi.sorimaeul.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DubbingCreateRequest {

    private int videoSourceCode;

    private String dubName;

    private String[] voicePaths;
}
