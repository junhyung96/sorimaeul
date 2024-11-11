package com.usagi.sorimaeul.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "playlist_cover_tb")
public class PlaylistCover {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "list_cover_code")
    private int listCoverCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "playlist_code", referencedColumnName = "playlist_code")
    private Playlist playlist;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cover_code", referencedColumnName = "cover_code")
    private Cover cover;

    @Column(name = "cover_index")
    private int coverIndex;

}
