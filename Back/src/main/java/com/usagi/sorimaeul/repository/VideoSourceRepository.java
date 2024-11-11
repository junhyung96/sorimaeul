package com.usagi.sorimaeul.repository;

import com.usagi.sorimaeul.entity.VideoSource;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VideoSourceRepository extends JpaRepository<VideoSource, Integer> {

    List<VideoSource> findAllByOrderByCreatedTimeDesc();
    VideoSource findByVideoSourceCode(Integer videoSourceCode);

//    @Query(value = "SELECT vs.*, COUNT(d.video_source_code) as dubbingCount " +
//            "FROM video_source_tb vs " +
//            "LEFT JOIN dub_tb d ON vs.video_source_code = d.video_source_code " +
//            "GROUP BY vs.video_source_code " +
//            "ORDER BY dubbingCount DESC", nativeQuery = true)
//    List<VideoSource> findVideoSourcesOrderByDubbingCountDesc();

    @Query(value = "SELECT vs.*, COUNT(d.video_source_code) as dubbingCount " +
            "FROM video_source_tb vs " +
            "LEFT JOIN dub_tb d ON vs.video_source_code = d.video_source_code " +
            "GROUP BY vs.video_source_code " +
            "ORDER BY dubbingCount DESC " +
            "LIMIT 5", nativeQuery = true)
    List<VideoSource> findTop5VideoSourcesOrderByDubbingCountDesc();
}
