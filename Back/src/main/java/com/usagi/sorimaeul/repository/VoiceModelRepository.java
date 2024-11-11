package com.usagi.sorimaeul.repository;

import com.usagi.sorimaeul.entity.VoiceModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VoiceModelRepository extends JpaRepository<VoiceModel, Integer>, VoiceModelRepositoryCustom {

    VoiceModel findByModelCode(int modelCode);

}
