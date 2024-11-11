package com.usagi.sorimaeul.dto.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VideoSourceVoiceInfoDto {

    private String voicePath;
    private int voiceIndex;
    private String voiceName;
}
