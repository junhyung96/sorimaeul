package com.usagi.sorimaeul.api.service;

import com.usagi.sorimaeul.dto.request.ModelTableCreateRequest;
import com.usagi.sorimaeul.dto.request.ModelUpdateRequest;
import com.usagi.sorimaeul.dto.response.GetScriptResponse;
import com.usagi.sorimaeul.dto.response.ModelInfoResponse;
import com.usagi.sorimaeul.dto.response.ModelListResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

public interface ModelService {

    ResponseEntity<?> createModelTable(ModelTableCreateRequest request, long userCode);

    ResponseEntity<String> uploadRecordFile(int modelCode, int num, long userCode, MultipartFile recodingFile);

    ResponseEntity<String> uploadExRecordFile(int modelCode, long userCode, MultipartFile[] files);

    ResponseEntity<String> uploadModelFile(int modelCode, long userCode, MultipartFile[] modelFiles);

    ResponseEntity<String> learnVoiceModel(int modelCode, long userCode);

    ResponseEntity<ModelListResponse> getModelList(Integer page, long userCode, Integer videoSourceCode);

    ResponseEntity<ModelInfoResponse> getModelInfo(int modelCode, long userCode);

    ResponseEntity<String> updateModel(int modelCode, long userCode, ModelUpdateRequest request);

    ResponseEntity<String> deleteModel(long userCode, int modelCode);

    ResponseEntity<GetScriptResponse> getScript(long userCode);

    ResponseEntity<String> checkModelCreate(int modelCode, Boolean isSuccess);

}
