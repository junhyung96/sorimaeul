package com.usagi.sorimaeul.dto.response;

import com.usagi.sorimaeul.dto.dto.DubbingInfoDto;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DubbingListResponse {

    private List<DubbingInfoDto> dubbings;
    private int totalPages;

}