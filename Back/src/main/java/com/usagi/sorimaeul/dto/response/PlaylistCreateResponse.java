package com.usagi.sorimaeul.dto.response;


import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class PlaylistCreateResponse {

    private int playlistCode;
    private String playlistName;
    private LocalDateTime createdTime;

}
