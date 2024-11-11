package com.usagi.sorimaeul.dto.request;

import jakarta.annotation.Nullable;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ModelUpdateRequest {

    private String modelName;
    @Nullable
    private String imagePath;

}
