package com.usagi.sorimaeul.dto.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RequestInfoDto {

    private int boardCode;
    private int typeCode;
    private String title;
    private String content;
    private LocalDateTime createdTime;
}
