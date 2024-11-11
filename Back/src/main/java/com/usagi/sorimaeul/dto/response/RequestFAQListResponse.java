package com.usagi.sorimaeul.dto.response;

import com.usagi.sorimaeul.dto.dto.RequestInfoDto;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RequestFAQListResponse {

    private List<RequestInfoDto> requests;
}
