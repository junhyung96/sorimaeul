import React, { useState, useRef, useEffect } from 'react';
import playBtn from "../../assets/playSong.png";
import pauseBtn from "../../assets/pauseSong.png";
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../stores/store';
import { setCurrentAudio } from '../../stores/audioPlayer';

const Button = styled.button`
  margin-left: .5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    height: 100%;
  }
`;

// 플레이리스트 상세 조회 시의 플레이어 : 재생(일시정지) 기능 + 오디오의 길이 제공
interface CustomAudioPlayerProps {
  src: string; // 오디오 파일의 URL
  coverCode: string;
}

const DetailPlayer:  React.FC<CustomAudioPlayerProps & { isPublic: boolean }> = ({ src, coverCode, isPublic }) => {
  const dispatch = useDispatch();
  const audioRef = useRef<HTMLAudioElement>(null); // 오디오 태그를 참조하기 위한 ref
  const currentAudio = useSelector((state: RootState) => state.audioPlayer.currentAudio);
  const isPlaying = coverCode === currentAudio && isPublic;
  const [duration, setDuration] = useState(0); // 오디오의 총 길이

  // 재생 상태 관리 
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.play();
      } else {
        audio.pause();
      }
    }
  }, [isPlaying]);

  // 재생 및 일시정지 토글 함수
  const togglePlayPause = () => {
    if (isPublic) { // 비공개 여부 검사
      if (isPlaying) {
        dispatch(setCurrentAudio(null));
      } else {
        dispatch(setCurrentAudio(coverCode));
      }
    } else {
      alert('비공개된 음원입니다.'); // 비공개 곡인 경우 경고 메시지 표시
    }
  };

  // 오디오의 총 길이를 설정하는 함수
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const setAudioData = () => {
        setDuration(audio.duration);
      };
      audio.addEventListener('loadedmetadata', setAudioData);
      return () => {
        audio.removeEventListener('loadedmetadata', setAudioData);
      };
    }
  }, []);

   // 초 단위를 'mm:ss' 형식으로 변환하는 함수
   const formatDuration = (seconds: number): string  => {
    const minutesPart = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secondsPart = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${minutesPart}:${secondsPart}`;
  };

  return (
    <div className="flex items-center">
      <audio ref={audioRef} src={src} preload="metadata" />
      {/* 비공개 음원이 아닌 경우에만 재생 시간 표시 */}
      {isPublic && <span className="ml-2 text-xs text-stone-400">({formatDuration(duration)})</span>}
      
      {/* 비공개 음원이 아닐 경우에만 재생 버튼 표시 */}
      {isPublic && (
        <Button onClick={togglePlayPause}>
          {isPlaying ? <img src={pauseBtn}/> : <img src={playBtn}/>}
        </Button>
      )}
      
      {!isPublic && <span className='text-stone-500'>비공개된 음원입니다.</span>}
    </div>
  );
};

export default DetailPlayer;
