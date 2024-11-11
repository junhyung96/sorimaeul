package com.usagi.sorimaeul.api.service;

import com.usagi.sorimaeul.dto.dto.CommentInfoDto;
import com.usagi.sorimaeul.dto.request.CommentCreateRequest;
import com.usagi.sorimaeul.dto.response.CommentListResponse;
import com.usagi.sorimaeul.entity.Comment;
import com.usagi.sorimaeul.entity.Cover;
import com.usagi.sorimaeul.entity.Dubbing;
import com.usagi.sorimaeul.entity.User;
import com.usagi.sorimaeul.repository.CommentRepository;
import com.usagi.sorimaeul.repository.CoverRepository;
import com.usagi.sorimaeul.repository.DubbingRepository;
import com.usagi.sorimaeul.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
@Transactional
public class CommentServiceImpl implements CommentService {

    private final UserRepository userRepository;
    private final CommentRepository commentRepository;
    private final CoverRepository coverRepository;
    private final DubbingRepository dubbingRepository;


    // AI 커버 댓글 조회
    public ResponseEntity<CommentListResponse> getCoverCommentList(long userCode, int coverCode) {
        // 사용자 정보 확인
        User user = userRepository.getUser(userCode);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        // 예외 처리
        Cover cover = coverRepository.findByCoverCode(coverCode);
        // 요청한 게시글이 없으면 404 반환
        if (cover == null) return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        // 비공개 글이거나 생성이 완료되지 않은 게시글 조회시 400 반환
        if (!cover.getIsPublic() || !cover.getIsComplete()) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);

        // coverCode 일치하는 댓글 가져오기
        List<Comment> commentList = commentRepository.findByCover_CoverCode(coverCode);
        // 빈 CommentInfoDto 리스트 생성
        List<CommentInfoDto> comments = new ArrayList<>();

        // 댓글 리스트 순회하면서
        for (Comment comment : commentList) {
            // Dto 생성
            CommentInfoDto commentInfoDto = CommentInfoDto.builder()
                    .commentCode(comment.getCommentCode())
                    .nickname(comment.getUser().getNickname())
                    .profileImage(comment.getUser().getProfileImage())
                    .content(comment.getContent())
                    .time(formatElapsedTime(comment.getCreatedTime()))
                    .build();
            // comments 에 담기
            comments.add(commentInfoDto);
        }
        
        // 리스폰스 생성
        CommentListResponse response = CommentListResponse.builder()
                .comments(comments)
                .build();

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }


    // 더빙 댓글 조회
    public ResponseEntity<CommentListResponse> getDubCommentList(long userCode, int dubCode) {
        // 사용자 정보 확인
        User user = userRepository.getUser(userCode);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        // 예외 처리
        Dubbing dubbing = dubbingRepository.findByDubCode(dubCode);
        // 요청한 게시글이 없으면 404 반환
        if (dubbing == null) return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        // 비공개 글이거나 생성이 완료되지 않은 게시글 조회시 400 반환
        if (!dubbing.getIsPublic() || !dubbing.getIsComplete()) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);

        // dubCode 일치하는 댓글 가져오기
        List<Comment> commentList = commentRepository.findByDubbing_DubCode(dubCode);
        // 빈 CommentInfoDto 리스트 생성
        List<CommentInfoDto> comments = new ArrayList<>();

        // 댓글 리스트 순회하면서
        for (Comment comment : commentList) {
            // Dto 생성
            CommentInfoDto commentInfoDto = CommentInfoDto.builder()
                    .commentCode(comment.getCommentCode())
                    .nickname(comment.getUser().getNickname())
                    .profileImage(comment.getUser().getProfileImage())
                    .content(comment.getContent())
                    .time(formatElapsedTime(comment.getCreatedTime()))
                    .build();
            // comments 에 담기
            comments.add(commentInfoDto);
        }
        
        // 리스폰스 생성
        CommentListResponse response = CommentListResponse.builder()
                .comments(comments)
                .build();

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }


    // AI 커버 댓글 등록
    public ResponseEntity<?> createCoverComment(long userCode, int coverCode, CommentCreateRequest request) {
        // 사용자 정보 확인
        User user = userRepository.getUser(userCode);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        // 예외 처리
        Cover cover = coverRepository.findByCoverCode(coverCode);
        // 요청한 게시글이 없으면 404 반환
        if (cover == null) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("존재하지 않는 게시글입니다.");
        // 비공개 게시글이거나 생성이 완료되지 않은 게시글 조회시 400 반환
        if (!cover.getIsPublic() || !cover.getIsComplete()) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("비공개 게시글이거나 생성이 완료되지 않은 게시글입니다.");

        // 댓글 생성
        Comment comment = Comment.builder()
                .cover(coverRepository.findByCoverCode(coverCode))
                .user(user)
                .content(request.getContent())
                .build();
        commentRepository.save(comment);

        CommentInfoDto response = CommentInfoDto.builder()
                .commentCode(comment.getCommentCode())
                .content(comment.getContent())
                .nickname(comment.getUser().getNickname())
                .profileImage(comment.getUser().getProfileImage())
                .time(formatElapsedTime(comment.getCreatedTime()))
                .build();
        
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }


    // 더빙 댓글 등록
    public ResponseEntity<?> createDubComment(long userCode, int dubCode, CommentCreateRequest request) {
        // 사용자 정보 확인
        User user = userRepository.getUser(userCode);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        // 예외 처리
        Dubbing dubbing = dubbingRepository.findByDubCode(dubCode);
        // 요청한 게시글이 없으면 404 반환
        if (dubbing == null) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("존재하지 않는 게시글입니다.");
        // 비공개 게시글이거나 생성이 완료되지 않은 게시글 조회시 400 반환
        if (!dubbing.getIsPublic() || !dubbing.getIsComplete()) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("비공개 게시글이거나 생성이 완료되지 않은 게시글입니다.");

        // 댓글 생성
        Comment comment = Comment.builder()
                .dubbing(dubbingRepository.findByDubCode(dubCode))
                .user(user)
                .content(request.getContent())
                .build();
        commentRepository.save(comment);

        CommentInfoDto response = CommentInfoDto.builder()
                .commentCode(comment.getCommentCode())
                .content(comment.getContent())
                .nickname(comment.getUser().getNickname())
                .profileImage(comment.getUser().getProfileImage())
                .time(formatElapsedTime(comment.getCreatedTime()))
                .build();

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }


    // 댓글 삭제
    public ResponseEntity<?> deleteComment(long userCode, int commentCode) {
        // 사용자 정보 확인
        User user = userRepository.getUser(userCode);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        // 예외 처리
        Comment comment = commentRepository.findByCommentCode(commentCode);
        // 요청한 댓글이 없으면 404 반환
        if (comment == null) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("존재하지 않는 댓글입니다.");

        // 댓글 삭제
        commentRepository.delete(comment);

        return ResponseEntity.status(HttpStatus.OK).body("댓글 삭제 성공!");
    }
    

    // LocalDateTime 을 "방금 전", "5분 전", "1시간 전", "30일 전" 의 형태로 변환
    public static String formatElapsedTime(LocalDateTime commentTime) {
        LocalDateTime currentTime = LocalDateTime.now();
        Duration duration = Duration.between(commentTime, currentTime);
        long seconds = duration.getSeconds();
        long minutes = TimeUnit.SECONDS.toMinutes(seconds);
        long hours = TimeUnit.SECONDS.toHours(seconds);
        long days = TimeUnit.SECONDS.toDays(seconds);

        if (seconds < 60) {
            return "방금전";
        } else if (minutes < 60) {
            return minutes + "분 전";
        } else if (hours < 24) {
            return hours + "시간 전";
        } else if (days == 1) {
            return "어제";
        } else if (days <= 30) {
            return days + "일 전";
        } else {
            return "오래전"; // 30일 초과는 오래전 으로 변환
        }
    }


}
