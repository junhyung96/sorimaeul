package com.usagi.sorimaeul.repository;

import com.usagi.sorimaeul.entity.PlaylistCover;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlaylistCoverRepository extends JpaRepository<PlaylistCover, Integer> {

    List<PlaylistCover> findByPlaylist_PlaylistCode(int playlistCode);

    PlaylistCover findByPlaylist_PlaylistCodeAndCover_CoverCode(int playlistCode, int coverCode);

}
