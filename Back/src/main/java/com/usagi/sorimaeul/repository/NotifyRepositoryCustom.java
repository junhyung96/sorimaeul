package com.usagi.sorimaeul.repository;

import com.usagi.sorimaeul.dto.request.SseRequest;

public interface NotifyRepositoryCustom {

	int checkNotify(int alertCode);

	int deleteNotify(int notifyCode);

	void insertNotify(SseRequest request);

}
