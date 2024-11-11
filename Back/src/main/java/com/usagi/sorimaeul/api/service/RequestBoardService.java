package com.usagi.sorimaeul.api.service;

import com.usagi.sorimaeul.dto.request.RequestCreateRequest;
import com.usagi.sorimaeul.dto.response.RequestDetailResponse;
import com.usagi.sorimaeul.dto.response.RequestFAQListResponse;
import com.usagi.sorimaeul.dto.response.RequestListResponse;
import org.springframework.http.ResponseEntity;

public interface RequestBoardService {

    ResponseEntity<RequestListResponse> getRequestList(long userCode, int typeCode, int page);

    ResponseEntity<RequestDetailResponse> getRequestDetail(long userCode, int boardCode);

    ResponseEntity<?> createRequest(long userCode, RequestCreateRequest request);

    ResponseEntity<?> updateRequest(long userCode, int boardCode, RequestCreateRequest request);

    ResponseEntity<?> deleteRequest(long userCode, int boardCode);

    ResponseEntity<RequestFAQListResponse> getFAQList(long userCode);
}
