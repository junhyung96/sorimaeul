package com.usagi.sorimaeul.dto.response;

import com.usagi.sorimaeul.dto.dto.RequestInfoDto;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RequestListResponse {

    private List<RequestInfoDto> requests;
    private int totalPages;

}
