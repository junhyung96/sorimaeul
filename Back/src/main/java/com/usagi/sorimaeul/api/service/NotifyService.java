package com.usagi.sorimaeul.api.service;

import com.usagi.sorimaeul.dto.request.SseRequest;
import com.usagi.sorimaeul.dto.response.NotifyResponse;
import com.usagi.sorimaeul.entity.Notify;
import com.usagi.sorimaeul.entity.User;
import com.usagi.sorimaeul.repository.NotifyRepository;
import com.usagi.sorimaeul.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class NotifyService {

	private final NotifyRepository notifyRepository;
	private final UserRepository userRepository;

	public NotifyResponse getNotify(long userCode) {
		List<Notify> list = notifyRepository.findAllByUserCodeOrderByNotifyCodeDesc(userCode);
		return NotifyResponse.builder()
				.list(list)
				.build();
	}

	public int checkNotify(int alertCode) {
		return notifyRepository.checkNotify(alertCode);
	}

	public int deleteNotify(int notifyCode) {
		return notifyRepository.deleteNotify(notifyCode);
	}

	public void createNotify(SseRequest request) {
		long userCode = request.getUserCode();

		User user = userRepository.getUser(userCode);

		if (user != null) {
			notifyRepository.insertNotify(request);
		}
	}

}
