package com.usagi.sorimaeul.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ModelTrainingRequest {

    private int modelCode;
    private long userCode;
    private String modelName;

}
