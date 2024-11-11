package com.usagi.sorimaeul.dto.request;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class DubbingRecordRequestWrapper {
    private DubbingRecordRequest request;
    private MultipartFile recordFile;
}
