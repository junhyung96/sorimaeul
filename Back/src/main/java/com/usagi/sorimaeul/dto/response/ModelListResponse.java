package com.usagi.sorimaeul.dto.response;

import com.usagi.sorimaeul.dto.dto.ModelInfoDto;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ModelListResponse {

    private List<ModelInfoDto> voiceModels;
    private int totalPages;

}
