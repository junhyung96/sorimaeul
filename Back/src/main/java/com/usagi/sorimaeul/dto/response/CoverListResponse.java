package com.usagi.sorimaeul.dto.response;

import com.usagi.sorimaeul.dto.dto.CoverInfoDto;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CoverListResponse {

    private List<CoverInfoDto> covers;
    private int totalPages;

}
