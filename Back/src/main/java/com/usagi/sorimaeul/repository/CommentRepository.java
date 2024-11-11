package com.usagi.sorimaeul.repository;

import com.usagi.sorimaeul.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Integer> {

    List<Comment> findByCover_CoverCode(int coverCode);

    List<Comment> findByDubbing_DubCode(int dubCode);

    Comment findByCommentCode(int commentCode);

}
