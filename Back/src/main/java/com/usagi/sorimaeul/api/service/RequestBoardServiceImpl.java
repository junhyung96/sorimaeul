package com.usagi.sorimaeul.api.service;

import com.usagi.sorimaeul.dto.dto.RequestInfoDto;
import com.usagi.sorimaeul.dto.request.RequestCreateRequest;
import com.usagi.sorimaeul.dto.response.RequestCreateResponse;
import com.usagi.sorimaeul.dto.response.RequestDetailResponse;
import com.usagi.sorimaeul.dto.response.RequestFAQListResponse;
import com.usagi.sorimaeul.dto.response.RequestListResponse;
import com.usagi.sorimaeul.entity.RequestBoard;
import com.usagi.sorimaeul.entity.User;
import com.usagi.sorimaeul.repository.RequestBoardRepository;
import com.usagi.sorimaeul.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class RequestBoardServiceImpl implements RequestBoardService {

    private final UserRepository userRepository;
    private final RequestBoardRepository requestBoardRepository;

    // 문의 게시판 리스트 조회
    public ResponseEntity<RequestListResponse> getRequestList(long userCode, int typeCode, int page){
        // 사용자 정보 확인
        User user = userRepository.getUser(userCode);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        // 배열 선언
        List<RequestBoard> requests = requestBoardRepository.findByTypeCodeOrderByCreatedTimeDesc(typeCode);
        List<RequestInfoDto> customRequests = new ArrayList<>();

        // 인덱스 선언
        int startIdx = Math.min((page - 1) * 7, requests.size()) / 7 * 7;
        int endIdx = Math.min(startIdx + 7, requests.size());
        // 총 페이지 수 선언
        int totalPages = (int) Math.ceil((double) requests.size() / 7);

        List<RequestBoard> pageRequests = requests.subList(startIdx, endIdx);

        for (RequestBoard request : pageRequests) {
            // Dto 에 담기
            RequestInfoDto requestInfoDto = RequestInfoDto.builder()
                    .boardCode(request.getBoardCode())
                    .title(request.getTitle())
                    .createdTime(request.getCreatedTime())
                    .build();

            customRequests.add(requestInfoDto);
        }

        // response 생성
        RequestListResponse response = RequestListResponse.builder()
                .requests(customRequests)
                .totalPages(totalPages)
                .build();

        return ResponseEntity.ok(response);
    }

    // 문의 게시글 상세 조회
    public ResponseEntity<RequestDetailResponse> getRequestDetail(long userCode, int boardCode){
        // 사용자 정보 확인
        User user = userRepository.getUser(userCode);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        RequestBoard requestDetail = requestBoardRepository.findByBoardCode(boardCode);

        RequestDetailResponse response = RequestDetailResponse.builder()
                .nickname(requestDetail.getUser().getNickname())
                .title(requestDetail.getTitle())
                .content((requestDetail.getContent()))
                .createdTime(requestDetail.getCreatedTime())
                .build();

        return ResponseEntity.ok(response);
    }

    // 문의 게시글 등록
    public ResponseEntity<?> createRequest(long userCode, RequestCreateRequest request){
        // 사용자 정보 확인
        User user = userRepository.getUser(userCode);
        if (user == null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        // 문의 게시글 등록
        RequestBoard newRequest = RequestBoard.builder()
                .user(user)
                .title(request.getTitle())
                .content(request.getContent())
                .build();
        requestBoardRepository.save(newRequest);

        RequestCreateResponse response =RequestCreateResponse.builder()
                .boardCode(newRequest.getBoardCode())
                .build();

        return ResponseEntity.ok(response);
    }

    // 문의 게시글 수정
    public ResponseEntity<?> updateRequest(long userCode, int boardCode, RequestCreateRequest request){
        // 사용자 정보 확인
        User user = userRepository.getUser(userCode);
        if (user == null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        RequestBoard requestBoard = requestBoardRepository.findByBoardCode(boardCode);
        User requestUser = requestBoard.getUser();
        if (requestUser != user) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }

        // 문의 게시글 수정
        requestBoard.setTitle(request.getTitle());
        requestBoard.setContent(request.getContent());
        requestBoardRepository.save(requestBoard);

        return ResponseEntity.status(HttpStatus.OK).body("수정 성공");
    }
    
    // 문의 게시글 삭제
    public ResponseEntity<?> deleteRequest(long userCode, int boardCode){
        // 사용자 정보 확인
        User user = userRepository.getUser(userCode);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        RequestBoard requestBoard = requestBoardRepository.findByBoardCode(boardCode);
        // 클라이언트와 커버 생성자 일치하지 않으면 400 반환
        User requestUser = requestBoard.getUser();
        if (requestUser != user) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        // 문의 게시글 삭제
        requestBoardRepository.deleteById(boardCode);
        
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("삭제 성공");
    }

    // 자주 묻는 질문 조회
    public ResponseEntity<RequestFAQListResponse> getFAQList(long userCode){
        // 사용자 정보 확인
        User user = userRepository.getUser(userCode);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        // 배열 선언
        List<RequestBoard> requests = requestBoardRepository.findByTypeCode(1);
        List<RequestInfoDto> customRequest = new ArrayList<>();

        for (RequestBoard requestBoard : requests) {
            // Dto 에 담기
            RequestInfoDto requestInfoDto = RequestInfoDto.builder()
                    .boardCode(requestBoard.getBoardCode())
                    .title(requestBoard.getTitle())
                    .content(requestBoard.getContent())
                    .createdTime(requestBoard.getCreatedTime())
                    .build();

            customRequest.add(requestInfoDto);
        }

        // response 생성
        RequestFAQListResponse response = RequestFAQListResponse.builder()
                .requests(customRequest)
                .build();

        return ResponseEntity.ok(response);


    }
}
