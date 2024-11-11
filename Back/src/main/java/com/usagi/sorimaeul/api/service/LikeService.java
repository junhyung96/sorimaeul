package com.usagi.sorimaeul.api.service;

import org.springframework.http.ResponseEntity;

public interface LikeService {

    ResponseEntity<?> dubLike(long userCode, int dubCode);

    ResponseEntity<?> coverLike(long userCode, int coverCode);

    ResponseEntity<?> dubLikeCancel(long userCode, int dubCode);

    ResponseEntity<?> coverLikeCancel(long userCode, int coverCode);

}
