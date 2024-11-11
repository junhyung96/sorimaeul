package com.usagi.sorimaeul.api.service;

import com.usagi.sorimaeul.dto.request.CommentCreateRequest;
import com.usagi.sorimaeul.dto.response.CommentListResponse;
import org.springframework.http.ResponseEntity;

public interface CommentService {

    ResponseEntity<CommentListResponse> getCoverCommentList(long userCode, int coverCode);

    ResponseEntity<CommentListResponse> getDubCommentList(long userCode, int dubCode);

    ResponseEntity<?> createCoverComment(long userCode, int coverCode, CommentCreateRequest request);

    ResponseEntity<?> createDubComment(long userCode, int dubCode, CommentCreateRequest request);

    ResponseEntity<?> deleteComment(long userCode, int commentCode);

}
