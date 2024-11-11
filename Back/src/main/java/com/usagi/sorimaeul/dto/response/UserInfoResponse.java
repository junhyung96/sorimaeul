package com.usagi.sorimaeul.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@Schema(description = "유저 정보 응답")
public class UserInfoResponse {

    private String nickname;
    private String profileImage;
    private int learnCount;
    private int coverCount;
    private int dubCount;

}
