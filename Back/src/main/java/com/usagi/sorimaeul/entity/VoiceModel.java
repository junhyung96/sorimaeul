package com.usagi.sorimaeul.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@Table(name = "voice_model_tb")
public class VoiceModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "model_code")
    private int modelCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_code", referencedColumnName = "user_code")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "video_source_code", referencedColumnName = "video_source_code")
    private VideoSource videoSource;

    @Column(name = "model_name")
    private String modelName;

    @Column(name = "image_path")
    private String imagePath;

    @Builder.Default
    @Column(name = "state")
    private int state = 0;

    @Builder.Default
    @Column(name = "record_count")
    private Integer recordCount = 0;

    @CreationTimestamp
    @Column(name = "created_time")
    private LocalDateTime createdTime;

    // 해당 매개변수를 받는 생성자 추가
    public VoiceModel(int modelCode, String modelName, String imagePath, int recordCount, int state) {
        this.modelCode = modelCode;
        this.modelName = modelName;
        this.imagePath = imagePath;
        this.recordCount = recordCount;
        this.state = state;
    }

}
