package com.usagi.sorimaeul.api.service;

import com.usagi.sorimaeul.dto.request.*;
import com.usagi.sorimaeul.dto.response.*;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

public interface DubbingService {
    ResponseEntity<DubbingCreateResponse> createDubbing(long userCode, DubbingCreateRequest request);

    ResponseEntity<?> saveDubbing(DubbingSaveRequest request);

    ResponseEntity<VideoSourceListResponse> getVideoSourceList(long userCode, Integer page, String target);

    ResponseEntity<VideoSourceDetailResponse> getVideoSourceDetail(long userCode, int videoSourceCode);

    ResponseEntity<Resource> getSourceVideo(long userCode, int videoSourceCode);

    ResponseEntity<DubbingListResponse> getDubbingList(long userCode, String target, String keyword, Integer page, Integer videoSourceCode);

    ResponseEntity<?> getDubbingDetail(long userCode, int dubCode);

    ResponseEntity<Resource> getDubbingVideo(long userCode, int dubCode);

    ResponseEntity<?> patchDubbingBoard(long userCode, int dubCode, DubbingBoardRequest request);

    ResponseEntity<?> deleteDubbing(long userCode, int dubCode);

    ResponseEntity<VideoSourceVoiceResponse> getVideoSourceVoice(long userCode, int videoSourceCode);

    ResponseEntity<?> uploadDubbingRecord(long userCode, int num, int videoSourceCode, MultipartFile recordFile);

    ResponseEntity<?> convertDubbingRecord(long userCode, int voiceIndex, DubbingRecordConvertRequest request);

    ResponseEntity<String> checkDubbingCreate(int dubCode, Boolean isSuccess);
}
