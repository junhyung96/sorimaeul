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
@Table(name = "like_tb")
public class Like {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "like_code")
    private int likeCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cover_code", referencedColumnName = "cover_code")
    private Cover cover;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dub_code", referencedColumnName = "dub_code")
    private Dubbing dubbing;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_code", referencedColumnName = "user_code")
    private User user;

    @CreationTimestamp
    @Column(name = "created_time")
    private LocalDateTime createdTime;

}
