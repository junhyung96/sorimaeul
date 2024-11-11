package com.usagi.sorimaeul.dto.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class NotifyDto {

	private int targetCode;
	private String content;

}
