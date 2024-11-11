package com.usagi.sorimaeul.dto.response;

import com.usagi.sorimaeul.dto.dto.CommentInfoDto;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Builder
@Setter
@Getter
public class CommentListResponse {

    private List<CommentInfoDto> comments;

}
