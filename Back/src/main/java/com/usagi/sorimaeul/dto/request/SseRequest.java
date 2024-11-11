package com.usagi.sorimaeul.dto.request;

import com.usagi.sorimaeul.dto.dto.NotifyDto;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SseRequest {

	private long userCode;
	private String name;
	private NotifyDto data;

}
