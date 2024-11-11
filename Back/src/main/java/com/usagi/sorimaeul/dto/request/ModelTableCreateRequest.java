package com.usagi.sorimaeul.dto.request;

import jakarta.annotation.Nullable;
import lombok.Getter;

@Getter
public class ModelTableCreateRequest {

    private long userCode;
    private String modelName;
    @Nullable
    private String imagePath;

}
