package com.usagi.sorimaeul.repository;

import com.usagi.sorimaeul.entity.Dubbing;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DubbingRepository extends JpaRepository<Dubbing, Integer> {

    List<Dubbing> findByUser_userCodeOrderByCreatedTimeDesc(long userCode);

    List<Dubbing> findByUser_userCodeAndDubNameContainingOrderByCreatedTimeDesc(long userCode, String dubName);

    List<Dubbing> findByDubName(String dubName);

    List<Dubbing> findTop5ByVideoSource_videoSourceCodeAndIsCompleteAndIsPublicOrderByLikeCountDesc(int videoSourceCode,  Boolean isComplete, Boolean isPublic);

    Dubbing findByDubCode(int dubCode);

    List<Dubbing> findByIsComplete(Boolean isComplete);

    List<Dubbing> findByIsCompleteAndIsPublicAndVideoSource_videoSourceCodeOrderByCreatedTimeDesc(Boolean isComplete, Boolean isPublic, int videoSourceCode);

    List<Dubbing> findByDubNameAndIsCompleteAndIsPublic(String dubName, Boolean isComplete, Boolean isPublic);

}
