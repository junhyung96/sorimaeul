package com.usagi.sorimaeul.dto.response;

import com.usagi.sorimaeul.dto.dto.VideoSourceInfoDto;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VideoSourceListResponse {
    private List<VideoSourceInfoDto> videoSources;

    private int totalPages;
    // AllArgsConstructor가 이 역할을 대신함
//    public VideoSourceListResponse(List<VideoSource> videoSourceList) {
//        this.videoSourceList = videoSourceList;
//    }
}
