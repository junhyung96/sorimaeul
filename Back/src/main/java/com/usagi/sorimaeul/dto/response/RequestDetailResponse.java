package com.usagi.sorimaeul.dto.response;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RequestDetailResponse {

    private String nickname;
    private String title;
    private String content;
    private LocalDateTime createdTime;
}
