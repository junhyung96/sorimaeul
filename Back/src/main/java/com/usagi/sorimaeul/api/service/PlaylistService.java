package com.usagi.sorimaeul.api.service;

import com.usagi.sorimaeul.dto.request.PlaylistCreateRequest;
import com.usagi.sorimaeul.dto.request.PlaylistUpdateRequest;
import com.usagi.sorimaeul.dto.response.PlaylistListResponse;
import org.springframework.http.ResponseEntity;

public interface PlaylistService {

    ResponseEntity<PlaylistListResponse> getPlaylistList(long userCode, Integer page);

    ResponseEntity<?> getPlaylistCoverList(long userCode, int playlistCode);

    ResponseEntity<?> addPlaylistCover(long userCode, int playlistCode, int coverCode);

    ResponseEntity<?> deletePlaylistCover(long userCode, int playlistCode, int coverCode);

    ResponseEntity<?> createPlaylist(long userCode, PlaylistCreateRequest request);

    ResponseEntity<?> updatePlaylist(long userCode, int playlistCode, PlaylistUpdateRequest request);

    ResponseEntity<?> deletePlaylist(long userCode, int playlistCode);

}
