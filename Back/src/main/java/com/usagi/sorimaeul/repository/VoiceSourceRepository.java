package com.usagi.sorimaeul.repository;

import com.usagi.sorimaeul.entity.VoiceSource;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VoiceSourceRepository extends JpaRepository<VoiceSource, Integer> {

    List<VoiceSource> findByVideoSource_VideoSourceCodeAndVoiceModelIsNull(int videoSourceCode);

    List<VoiceSource> findByVideoSource_videoSourceCode(int videoSourceCode);
    VoiceSource findByVideoSourceIsNullAndVoiceModelIsNull();

}
