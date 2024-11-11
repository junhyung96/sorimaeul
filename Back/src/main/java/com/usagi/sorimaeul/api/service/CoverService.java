package com.usagi.sorimaeul.api.service;

import com.usagi.sorimaeul.dto.request.CoverBoardRequest;
import com.usagi.sorimaeul.dto.request.CoverCreateRequest;
import com.usagi.sorimaeul.dto.response.CoverListResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

public interface CoverService {

    ResponseEntity<CoverListResponse> getCoverList(long userCode, String target, String keyword, Integer page);

    ResponseEntity<?> getCoverDetail(long userCode, int coverCode);

    ResponseEntity<?> createCover(long userCode, CoverCreateRequest request);

    ResponseEntity<?> createCoverBoard(long userCode, int coverCode, CoverBoardRequest request);

    ResponseEntity<?> deleteCover(long userCode, int coverCode);

    ResponseEntity<?> saveCreatedCover(int coverCode, MultipartFile file);

    ResponseEntity<?> getCoverSourceList(long userCode);

    ResponseEntity<String> checkCoverCreate(int coverCode, Boolean isSuccess);

}
