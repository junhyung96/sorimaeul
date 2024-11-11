import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { openModal } from '../../../stores/modal';
import { removePlaylist, setSelectedPlaylist, updatePlaylistName } from '../../../stores/playlists';
import { deletePlaylist, updatePlaylist } from '../../../utils/playlistAPI';
import playlistImg from "../../../assets/playlist.png";
import deleteIcon from "../../../assets/deleteIcon.png";
import editIcon from "../../../assets/editIcon.png";

const CardContainer = styled.div`
  width: 24%;
  height: 20rem;
  flex: 0 0 24%;
  cursor: pointer; /* 추가: 커서 스타일 변경 */
  box-sizing: border-box;
  margin: 0.5%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// input 스타일 컴포넌트 추가
const StyledInput = styled.input`
  border: 1px solid #ccc; /* border 설정 */
  padding: 8px; /* padding 설정 */
  width: calc(100% - 16px); /* 전체 너비에서 padding 고려 */
  margin-bottom: 10px; /* input과 버튼 사이의 간격 설정 */
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: .2rem;
  background: white;
  color: #797979;
  width: 4rem;
  font-size: 1rem;
  height: 2rem;
  border: 1px solid #797979;
  border-radius: 5px;

  .icon {
    height: 100%;
  }

  p {
    padding-top: .2rem;
  }
`
const ButtonBox = styled.div`
  display: flex;
  gap: .5rem;
  .icon {
    height: 80%;
  }
`;


// 날짜 형식을 변경하는 함수
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  // getMonth()는 0부터 시작하므로 +1을 해줍니다.
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  
  return `${year}.${month}.${day}`;
}

interface Props {
  playlistCode: string,
  playlistName: string,
  createdTime: string,
}

export const PlaylistCard: React.FC<Props> = ({ playlistCode, playlistName, createdTime }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(playlistName);

  const openPlaylistDetailModal = (playlistCode: string) => {
    if (!isEditing) { // 수정 모드가 아닐 때만 모달을 열도록 조건 추가
      dispatch(setSelectedPlaylist({
        playlistCode: playlistCode,
        playlistName: playlistName,
        createdTime: createdTime,
        covers: []
      }));
      dispatch(openModal({
        modalType: "playlistdetail",
        payload: { playlistCode: playlistCode }
      }));
    }
  }

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation(); // 이벤트 버블링 방지
    deletePlaylist(playlistCode)
      .then(() => {
        dispatch(removePlaylist(playlistCode));
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    if (isEditing) {
      // 수정 모드이면, 변경된 이름으로 업데이트 요청
      updatePlaylist(playlistCode, { playlistName: editedName })
        .then(() => {
          setIsEditing(false); // 수정 모드 종료
          dispatch(updatePlaylistName({ playlistCode, playlistName: editedName }));
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      setIsEditing(true); // 수정 모드 시작
    }
  };

  return (
    <CardContainer onClick={() => openPlaylistDetailModal(playlistCode)}>
      <img src={playlistImg} alt='플레이리스트 고정 이미지' />
      {isEditing ? (
        <StyledInput
          value={editedName}
          onChange={(e) => setEditedName(e.target.value)}
        />
      ) : (
        <p>{playlistName}</p>
      )}
      <p className='text-stone-400'>{formatDate(createdTime)}</p>
      <ButtonBox>
        <Button onClick={handleEdit}>
          <img className="icon" src={editIcon} alt="" />
          <p>{isEditing ? '저장' : '수정'}</p>
        </Button>
        <Button onClick={handleDelete} disabled={isEditing}>
          <img className="icon" src={deleteIcon} alt="" />
          <p>삭제</p>
        </Button>
      </ButtonBox>
    </CardContainer>
  )
}
