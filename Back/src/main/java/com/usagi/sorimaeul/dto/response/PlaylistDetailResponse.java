package com.usagi.sorimaeul.dto.response;

import com.usagi.sorimaeul.dto.dto.PlaylistCoverInfoDto;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
public class PlaylistDetailResponse {

    private List<PlaylistCoverInfoDto> playlist;

}
