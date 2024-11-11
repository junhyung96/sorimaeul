package com.usagi.sorimaeul.api.controller;

import com.usagi.sorimaeul.api.service.SseService;
import com.usagi.sorimaeul.utils.JwtTokenProvider;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@RequestMapping("/sse")
@RequiredArgsConstructor
@Tag(name = "SSE 컨트롤러", description = "SSE 통신을 위한 컨트롤러")
public class SseController {

	private final SseService sseService;
	private final JwtTokenProvider jwtTokenProvider;

	@Operation(summary = "SSE 연결 요청",
			description = "SSE 연결 요청")
	@GetMapping(value = "/connect", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
	public ResponseEntity<SseEmitter> connect(
			@RequestHeader("Authorization") String token,
			HttpServletResponse response) {
		long userCode = Long.parseLong(jwtTokenProvider.getPayload(token.substring(7)));
		SseEmitter sseEmitter = sseService.subscribe(userCode);

		response.addHeader("X-Accel-Buffering", "no"); // nginx 관련 설정
		return ResponseEntity.ok(sseEmitter);
	}

	@Operation(summary = "SSE 연결 종료",
			description = "SSE 연결 종료")
	@DeleteMapping("/disconnect")
	public ResponseEntity<Void> disconnect(@RequestHeader("Authorization") String token) {
		long userCode = Long.parseLong(jwtTokenProvider.getPayload(token.substring(7)));
		sseService.disConnect(userCode);
		return ResponseEntity.ok().build();
	}

}
