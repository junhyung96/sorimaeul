package com.usagi.sorimaeul.dto.response;

import com.usagi.sorimaeul.dto.dto.VideoSourceVoiceInfoDto;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VideoSourceVoiceResponse {

    private int videoSourceCode;
    private String videoPath;
    private List<VideoSourceVoiceInfoDto> voiceSources;
}
