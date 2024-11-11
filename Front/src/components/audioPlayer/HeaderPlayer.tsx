import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../stores/store";
import playBtn from "../../assets/playBlack.png";
import pauseBtn from "../../assets/pauseBlack.png";
import prevBtn from "../../assets/prev.png";
import nextBtn from "../../assets/next.png";
import playlists from "../../assets/playlistCheck.png";
import styled, { keyframes } from 'styled-components';
import { s3URL } from "../../utils/s3";
import { openModal } from "../../stores/modal";

const PlaylistComponent = styled.div`
  display: flex;
  box-sizing: border-box;
  border: 1px dashed #000000;
  border-radius: 50px;
  padding: 1rem; 

  margin-left: auto;
  max-width: 300px; 
  height: 55px; 
  right: 0;

  .list-icon {
    width: 10%;
    height: 100%;
    cursor: pointer;
  }
`;

const flowText = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
`;

const FlowingText = styled.div`
  white-space: nowrap;
  animation: ${flowText} 7s linear infinite;
`;

const TextArea = styled.div`
  margin-top: 0.5rem;
  width: 65%;
  overflow: hidden;
`

const PlayerContainer = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
  justify-content: space-between;
  width: 100%;
`;

const IconArea = styled.div`
  marign-left:2rem;
  display: flex;
  width: 20%;
`;

const Icon = styled.img`
  width: 1rem;
  height: 100%;
  cursor: pointer;
`;



const HeaderPlayer: React.FC = () => {
  const dispatch = useDispatch();
  const selectedPlaylist = useSelector((state: RootState) => state.playlists.selectedPlaylist);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const { modalType, isOpen } = useSelector((state: RootState) => state.modal);

  useEffect(() => {
    if ((modalType === 'playlistdetail' || modalType === 'playlistheader') && isOpen) {
      if (audio) {
        audio.pause();
        setIsPlaying(false);
      }
    }
  }, [modalType, isOpen, audio]);


  useEffect(() => {
    // 선택된 플레이리스트 변경 시 오디오 초기화
    if (selectedPlaylist && selectedPlaylist.covers && selectedPlaylist.covers.length > 0) {
      setCurrentTrackIndex(0);
      if (audio) {
        audio.pause();
      }
      const newAudio = new Audio(s3URL + `/${selectedPlaylist.covers[0].storagePath}`);
      setAudio(newAudio);
      setIsPlaying(false);
    }

  }, [selectedPlaylist]);

  useEffect(() => {
    if (selectedPlaylist && selectedPlaylist.covers && selectedPlaylist.covers.length > 0 && audio) {
      audio.src = s3URL + `/${selectedPlaylist.covers[currentTrackIndex].storagePath}`
      if (isPlaying) {
        audio.play().catch((error) => console.error("Audio play failed", error));
      }
      audio.addEventListener('ended', handleNextTrack);
      audio.addEventListener('timeupdate', handleTimeUpdate);
      // 곡이 변경되면 시간 초기화
      setCurrentTime(0);
    }

    return () => {
      if (audio) {
        audio.removeEventListener('ended', handleNextTrack);
        audio.removeEventListener('timeupdate', handleTimeUpdate);
      }
    };
  }, [currentTrackIndex, selectedPlaylist, audio, isPlaying]);

  const handlePlayPause = () => {
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play().catch((error) => console.error("Audio play failed", error));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleNextTrack = () => {
    if (selectedPlaylist && selectedPlaylist.covers && currentTrackIndex < selectedPlaylist.covers.length - 1) {
      setCurrentTrackIndex(currentTrackIndex + 1);
    } else {
      setCurrentTrackIndex(0); // 리스트의 마지막까지 재생했다면 처음으로 돌아감
    }
  };

  const handlePrevTrack = () => {
    if (selectedPlaylist) {
      const prevIndex = currentTrackIndex > 0 ? currentTrackIndex - 1 : selectedPlaylist.covers.length - 1;
      setCurrentTrackIndex(prevIndex);
    }
  };

  const handleTimeUpdate = () => {
    if (audio) {
      setCurrentTime(audio.currentTime);
    }
  };


  const openPlaylistHeaderModal = () => {
    dispatch(openModal({
      modalType: "playlistheader",
    }));
  };

  if (!selectedPlaylist) {
    return (
      <PlaylistComponent>
        <PlayerContainer>
          <img className="list-icon" onClick={openPlaylistHeaderModal} src={playlists} alt="Show Playlists Icon" />
          <div>플레이리스트를 선택해주세요.</div>
        </PlayerContainer>
      </PlaylistComponent>
    )
  }

  if (!selectedPlaylist || !selectedPlaylist.covers || selectedPlaylist.covers.length === 0) {
    return (
      <PlaylistComponent>
        <PlayerContainer>
          <img className="list-icon" onClick={openPlaylistHeaderModal} src={playlists} alt="Show Playlists Icon" />
          <div className="mr-10">커버를 추가해주세요.</div>
        </PlayerContainer>
      </PlaylistComponent>

    )
  }





  return (
    <PlaylistComponent>
      <PlayerContainer>
        <img className="list-icon" onClick={openPlaylistHeaderModal} src={playlists} alt="Show Playlists Icon" />
        <TextArea>
          <FlowingText>{selectedPlaylist.covers[currentTrackIndex].title} - {selectedPlaylist.covers[currentTrackIndex].singer} ({selectedPlaylist.covers[currentTrackIndex].coverSinger}) </FlowingText>
        </TextArea>
        <IconArea>
          <Icon src={prevBtn} onClick={handlePrevTrack} />
          <div onClick={handlePlayPause}>{isPlaying ? <Icon src={pauseBtn} /> : <Icon src={playBtn} />}</div>
          <Icon src={nextBtn} onClick={handleNextTrack} />
        </IconArea>
      </PlayerContainer>
    </PlaylistComponent>
  );
};

export default HeaderPlayer;