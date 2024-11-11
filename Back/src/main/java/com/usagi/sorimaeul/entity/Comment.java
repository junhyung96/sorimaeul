package com.usagi.sorimaeul.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "comment_tb")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_code")
    private int commentCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cover_code")
    private Cover cover;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dub_code")
    private Dubbing dubbing;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_code")
    private User user;

    @Column(name = "content")
    private String content;

    @CreationTimestamp
    @Column(name = "created_time")
    private LocalDateTime createdTime;

}
