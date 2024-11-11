package com.usagi.sorimaeul.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "cover_source_tb")
public class CoverSource {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cover_source_code")
    private int coverSourceCode;

    @Column(name = "singer")
    private String singer;

    @Column(name = "title")
    private String title;

    @Column(name = "youtube_link")
    private String youtubeLink;

    @Column(name = "thumbnail_path")
    private String thumbnailPath;

    @Column(name = "created_time")
    private LocalDateTime createdTime;

}
