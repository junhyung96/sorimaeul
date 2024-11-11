package com.usagi.sorimaeul.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "dub_tb")
public class Dubbing {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "dub_code")
    private int dubCode;

    @ManyToOne
    @JoinColumn(name = "user_code")
    private User user;

    @ManyToOne
    @JoinColumn(name = "video_source_code")
    private VideoSource videoSource;

    @Column(name = "dub_name")
    private String dubName;

    @Column(name = "dub_detail")
    private String dubDetail;

    @Column(name = "storage_path")
    private String storagePath;

    @Builder.Default
    @Column(name = "is_public")
    private Boolean isPublic = false;

    @CreationTimestamp
    @Column(name = "created_time")
    private LocalDateTime createdTime;

    @UpdateTimestamp
    @Column(name = "updated_time")
    private LocalDateTime updatedTime;

    @Builder.Default
    @Column(name = "like_count")
    private int likeCount = 0;

    @Builder.Default
    @Column(name = "is_complete")
    private Boolean isComplete = false;

}
