package com.usagi.sorimaeul.dto.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ModelInfoDto {

    private Boolean isMine;
    private Boolean isExistSource;
    private int modelCode;
    private String modelName;
    private String imagePath;
    private int recordCount;
    private int state;

}
