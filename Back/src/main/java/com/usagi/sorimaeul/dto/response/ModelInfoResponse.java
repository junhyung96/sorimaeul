package com.usagi.sorimaeul.dto.response;

import lombok.*;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ModelInfoResponse {

    private int modelCode;
    private String modelName;
    private String imagePath;
    private int recordCount;
    private int state;


    // 에러 메시지가 있는 경우 생성하는 편의 메서드
    private String errorMessage;
    public static ModelInfoResponse withError(String errorMessage) {
        ModelInfoResponse response = new ModelInfoResponse();
        response.setErrorMessage(errorMessage);
        return response;
    }
}
