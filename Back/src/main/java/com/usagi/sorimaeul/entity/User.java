package com.usagi.sorimaeul.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "user_tb")
public class User {

    @Id
    @Column(name = "user_code")
    private long userCode;

    @Column(name = "nickname")
    private String nickname;

    @Column(name = "profile_image")
    private String profileImage;

    @CreationTimestamp
    @Column(name = "join_date")
    private LocalDateTime joinDate;

    @Column(name = "learn_count")
    private int learnCount;

    @Column(name = "cover_count")
    private int coverCount;

    @Column(name = "dub_count")
    private int dubCount;



}
