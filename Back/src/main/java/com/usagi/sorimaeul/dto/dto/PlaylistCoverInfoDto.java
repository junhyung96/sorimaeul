package com.usagi.sorimaeul.dto.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class PlaylistCoverInfoDto {

    private int coverCode;
    private String coverSinger;
    private String singer;
    private String title;
    private String nickname;
    private String storagePath;
    private Boolean isPublic;

}
