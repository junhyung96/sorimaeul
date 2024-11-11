package com.usagi.sorimaeul.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class DubbingCreateResponse {

    private int dubCode;
    private String storagePath;
}
