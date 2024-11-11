package com.usagi.sorimaeul.api.controller;

import com.usagi.sorimaeul.api.service.PlaylistService;
import com.usagi.sorimaeul.dto.request.PlaylistCreateRequest;
import com.usagi.sorimaeul.dto.request.PlaylistUpdateRequest;
import com.usagi.sorimaeul.dto.response.PlaylistCreateResponse;
import com.usagi.sorimaeul.dto.response.PlaylistDetailResponse;
import com.usagi.sorimaeul.dto.response.PlaylistListResponse;
import com.usagi.sorimaeul.utils.JwtTokenProvider;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/playlist")
@RequiredArgsConstructor
@Tag(name = "Playlist 컨트롤러", description = "플레이리스트 관리를 위한 API")
public class PlaylistController {

    private final JwtTokenProvider jwtTokenProvider;
    private final PlaylistService playlistService;

    @Operation(summary = "플레이리스트 목록 조회", description = "유저 코드로 플레이리스트 목록을 조회한다.")
    @ApiResponse(responseCode = "200", description = "플레이리스트 목록 조회 성공")
    @GetMapping
    public ResponseEntity<PlaylistListResponse> getPlaylistList(@RequestHeader(name = "Authorization") String token,
                                                                @RequestParam(required = false) Integer page) {
        long userCode = Long.parseLong(jwtTokenProvider.getPayload(token.substring(7)));
        return playlistService.getPlaylistList(userCode, page);
    }


    @Operation(summary = "플레이리스트 상세 조회 - AI 커버 리스트 조회", description = "플레이리스트 안의 AI 커버 리스트를 조회한다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "플레이리스트 상세 조회 성공",
                    content = @Content(schema = @Schema(implementation = PlaylistDetailResponse.class))),
            @ApiResponse(responseCode = "404", description = "플레이리스트가 존재하지 않습니다.")
    })
    @GetMapping("/{playlistCode}")
    public ResponseEntity<?> getPlaylistCoverList(@RequestHeader(name = "Authorization") String token,
                                                                       @PathVariable int playlistCode) {
        long userCode = Long.parseLong(jwtTokenProvider.getPayload(token.substring(7)));
        return playlistService.getPlaylistCoverList(userCode, playlistCode);
    }


    @Operation(summary = "플레이리스트 - AI 커버 추가", description = "플레이리스트에 AI 커버를 추가한다.")
    @ApiResponse(responseCode = "200", description = "플레이리스트에 AI 커버 추가 성공")
    @PostMapping("/{playlistCode}/{coverCode}")
    public ResponseEntity<?> addPlaylistCover(@RequestHeader(name = "Authorization") String token,
                                            @PathVariable int playlistCode,
                                            @PathVariable int coverCode  ) {
        long userCode = Long.parseLong(jwtTokenProvider.getPayload(token.substring(7)));
        return playlistService.addPlaylistCover(userCode, playlistCode, coverCode);
    }


    @Operation(summary = "플레이리스트 - AI 커버 삭제", description = "플레이리스트의 AI 커버를 삭제한다.")
    @ApiResponse(responseCode = "200", description = "플레이리스트의 AI 커버 삭제 성공")
    @DeleteMapping("/{playlistCode}/{coverCode}")
    public ResponseEntity<?> deletePlaylistCover(@RequestHeader(name = "Authorization") String token,
                                              @PathVariable int playlistCode,
                                              @PathVariable int coverCode  ) {
        long userCode = Long.parseLong(jwtTokenProvider.getPayload(token.substring(7)));
        return playlistService.deletePlaylistCover(userCode, playlistCode, coverCode);
    }


    @Operation(summary = "플레이리스트 생성", description = "플레이리스트를 생성한다.")
    @ApiResponse(responseCode = "201", description = "플레이리스트 생성 성공",
            content = @Content(schema = @Schema(implementation = PlaylistCreateResponse.class)))
    @PostMapping
    public ResponseEntity<?> createPlaylist(@RequestHeader(name = "Authorization") String token,
                                            @RequestBody PlaylistCreateRequest request) {
        long userCode = Long.parseLong(jwtTokenProvider.getPayload(token.substring(7)));
        return playlistService.createPlaylist(userCode, request);
    }


    @Operation(summary = "플레이리스트 이름 변경", description = "플레이리스트의 이름을 변경한다.")
    @ApiResponse(responseCode = "200", description = "플레이리스트 이름 변경 성공")
    @PatchMapping("/{playlistCode}")
    public ResponseEntity<?> updatePlaylist(@RequestHeader(name = "Authorization") String token,
                                            @PathVariable int playlistCode,
                                            @RequestBody PlaylistUpdateRequest request) {
        long userCode = Long.parseLong(jwtTokenProvider.getPayload(token.substring(7)));
        return playlistService.updatePlaylist(userCode, playlistCode, request);
    }


    @Operation(summary = "플레이리스트 삭제", description = "플레이리스트를 삭제한다.")
    @ApiResponse(responseCode = "201", description = "플레이리스트 삭제 성공")
    @DeleteMapping("/{playlistCode}")
    public ResponseEntity<?> deletePlaylist(@RequestHeader(name = "Authorization") String token,
                                            @PathVariable int playlistCode) {
        long userCode = Long.parseLong(jwtTokenProvider.getPayload(token.substring(7)));
        return playlistService.deletePlaylist(userCode, playlistCode);
    }
}
