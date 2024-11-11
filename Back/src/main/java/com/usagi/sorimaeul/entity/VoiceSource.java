package com.usagi.sorimaeul.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "voice_source_tb")
public class VoiceSource {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "voice_source_code")
    private int voiceSourceCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "video_source_code", referencedColumnName = "video_source_code")
    private VideoSource videoSource;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "model_code", referencedColumnName = "model_code")
    private VoiceModel voiceModel;

    @Column(name = "voice_path")
    private String voicePath;

    @Column(name = "voice_index")
    private int voiceIndex;

}
