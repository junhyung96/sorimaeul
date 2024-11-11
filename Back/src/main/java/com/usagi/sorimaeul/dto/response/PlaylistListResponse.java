package com.usagi.sorimaeul.dto.response;

import com.usagi.sorimaeul.dto.dto.PlaylistInfoDto;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
public class PlaylistListResponse {

    private List<PlaylistInfoDto> playlists;
    private int totalPages;

}
