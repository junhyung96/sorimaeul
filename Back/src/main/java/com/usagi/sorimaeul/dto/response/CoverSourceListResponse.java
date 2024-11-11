package com.usagi.sorimaeul.dto.response;

import com.usagi.sorimaeul.dto.dto.CoverSourceInfoDto;
import lombok.*;

import java.util.List;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CoverSourceListResponse {

    List<CoverSourceInfoDto> coverSources;

}
