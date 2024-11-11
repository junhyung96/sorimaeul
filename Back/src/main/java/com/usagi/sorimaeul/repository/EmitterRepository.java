package com.usagi.sorimaeul.repository;

import org.springframework.stereotype.Repository;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Repository
public class EmitterRepository {

	private final Map<Long, SseEmitter> emitters = new ConcurrentHashMap<>();

	// emitter 저장
	public SseEmitter save(long userCode, SseEmitter sseEmitter) {
		emitters.put(userCode, sseEmitter);
		return sseEmitter;
	}

	// 유저의 sseEmitter 찾기
	public SseEmitter findByUserCode(long userCode) {
		return emitters.get(userCode);
	}

	// 유저의 sseEmitter 삭제
	public void deleteByUserCode(long userCode) {
		emitters.remove(userCode);
	}

}
