package com.usagi.sorimaeul.dto.response;

import com.usagi.sorimaeul.dto.dto.ScriptInfoDto;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
public class GetScriptResponse {

    private List<ScriptInfoDto> scripts;

}
