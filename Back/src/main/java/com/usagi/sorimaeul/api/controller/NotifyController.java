package com.usagi.sorimaeul.api.controller;

import com.usagi.sorimaeul.api.service.NotifyService;
import com.usagi.sorimaeul.api.service.SseService;
import com.usagi.sorimaeul.dto.request.SseRequest;
import com.usagi.sorimaeul.dto.response.NotifyResponse;
import com.usagi.sorimaeul.utils.JwtTokenProvider;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/notify")
@RequiredArgsConstructor
@Tag(name = "Notify 컨트롤러", description = "알림 처리를 위한 컨트롤러")
public class NotifyController {

	private final NotifyService notifyService;
	private final SseService sseService;
	private final JwtTokenProvider jwtTokenProvider;

	@Operation(summary = "알림 리스트 조회",
			description = "해당 유저의 알림 리스트 조회")
	@ApiResponse(responseCode = "200", description = "알림 리스트 조회 성공")
	@GetMapping
	public ResponseEntity<NotifyResponse> getNotify(@RequestHeader("Authorization") String token) {
		long userCode = Long.parseLong(jwtTokenProvider.getPayload(token.substring(7)));
		NotifyResponse response = notifyService.getNotify(userCode);
		return ResponseEntity.ok(response);
	}

	@Operation(summary = "알림 확인",
			description = "해당 알림 확인")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "알림 확인 성공"),
			@ApiResponse(responseCode = "404", description = "알림 존재하지 않음")
	})
	@PatchMapping("/{notifyCode}")
	public ResponseEntity<Void> checkNotify(@PathVariable int notifyCode) {
		int cnt = notifyService.checkNotify(notifyCode);
		if (cnt == 1) {
			return ResponseEntity.ok().build();
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@Operation(summary = "알림 삭제",
			description = "해당 알림 삭제")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "알림 삭제 성공"),
			@ApiResponse(responseCode = "404", description = "알림 존재하지 않음")
	})
	@DeleteMapping("/{notifyCode}")
	public ResponseEntity<Void> deleteNotify(@PathVariable int notifyCode) {
		int cnt = notifyService.deleteNotify(notifyCode);
		if (cnt == 1) {
			return ResponseEntity.ok().build();
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@Operation(summary = "알림 전송",
			description = "파라미터를 받아 알림 전송")
	@PostMapping("/send")
	public ResponseEntity<Void> notify(@RequestBody SseRequest request) {
		notifyService.createNotify(request);
		sseService.sendToClient(request.getUserCode(), request.getName(), request.getData());
		return ResponseEntity.ok().build();
	}

}
