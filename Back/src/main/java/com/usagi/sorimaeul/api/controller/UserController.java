package com.usagi.sorimaeul.api.controller;

import com.usagi.sorimaeul.api.service.UserService;
import com.usagi.sorimaeul.dto.request.UserInfoRequest;
import com.usagi.sorimaeul.dto.response.NicknameResponse;
import com.usagi.sorimaeul.dto.response.UserInfoResponse;
import com.usagi.sorimaeul.entity.User;
import com.usagi.sorimaeul.utils.JwtTokenProvider;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
@Tag(name = "User 컨트롤러", description = "사용자 관리를 위한 API")
public class UserController {

	private final UserService userService;
	private final JwtTokenProvider jwtTokenProvider;

	@Operation(summary = "로그인",
			description = "서비스 로그인")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "로그인 성공"),
			@ApiResponse(responseCode = "204", description = "회원가입 필요")
	})
	@GetMapping("/login")
	public ResponseEntity<UserInfoResponse> login(@RequestHeader("Authorization") String token) {
		long userCode = Long.parseLong(jwtTokenProvider.getPayload(token.substring(7)));

		User user = userService.login(userCode);

		if (user == null) {
			return ResponseEntity.noContent().build();
		}

		UserInfoResponse response
				= UserInfoResponse.builder()
				.nickname(user.getNickname())
				.profileImage(user.getProfileImage())
				.learnCount(user.getLearnCount())
				.coverCount(user.getCoverCount())
				.dubCount(user.getDubCount())
				.build();

		return ResponseEntity.ok(response);
	}

	@Operation(summary = "회원가입",
			description = "유저 정보를 받아 회원가입")
	@ApiResponse(responseCode = "201", description = "회원가입 성공")
	@PostMapping("/signup")
	public ResponseEntity<UserInfoResponse> signUp(@RequestHeader("Authorization") String token, @RequestBody UserInfoRequest request) {
		long userCode = Long.parseLong(jwtTokenProvider.getPayload(token.substring(7)));
		UserInfoResponse response = userService.signUp(userCode, request);
		return ResponseEntity.status(HttpStatus.CREATED).body(response);
	}

	@Operation(summary = "닉네임 중복 확인",
			description = "기존에 존재하는 닉네임인지 확인")
	@ApiResponse(responseCode = "200", description = "닉네임 중복 확인 성공")
	@GetMapping("/nickname/{nickname}")
	public ResponseEntity<NicknameResponse> checkNickname(@PathVariable String nickname) {
		int cnt = userService.checkNickname(nickname);
		NicknameResponse response = NicknameResponse.builder()
				.result(cnt)
				.build();
		return ResponseEntity.ok(response);
	}

	@Operation(summary = "유저 정보 수정",
			description = "유저 정보 수정")
	@ApiResponse(responseCode = "200", description = "유저 정보 수정 성공")
	@PatchMapping
	public ResponseEntity<UserInfoResponse> modifyUserInfo(
			@RequestHeader("Authorization") String token, @RequestBody UserInfoRequest request) {
		long userCode = Long.parseLong(jwtTokenProvider.getPayload(token.substring(7)));
		UserInfoResponse response = userService.modifyUserInfo(userCode, request);
		return ResponseEntity.ok(response);
	}

	@Operation(summary = "유저 정보",
			description = "유저 정보 응답")
	@ApiResponse(responseCode = "200", description = "유저 정보 응답")
	@GetMapping
	public ResponseEntity<UserInfoResponse> userInfo(@RequestHeader("Authorization") String token) {
		long userCode = Long.parseLong(jwtTokenProvider.getPayload(token.substring(7)));
		UserInfoResponse response = userService.userInfo(userCode);
		return ResponseEntity.ok(response);
	}
}
