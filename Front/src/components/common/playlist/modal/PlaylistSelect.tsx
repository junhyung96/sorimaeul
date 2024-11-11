import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setPlaylists } from "../../../../stores/playlists";
import { RootState } from "../../../../stores/store";
import { getPlaylists } from "../../../../utils/playlistAPI";
import dropBtn from "../../../../assets/dropBtn.png";

const PlaylistMenuBox = styled.div`
  font-weight: 700;
  font-size: 1rem;
  display: flex;
  gap: .5rem;
  border-radius: 5px;
  color:white;
  align-items: center;
  margin-bottom: .5rem;
  img{
    width: 1.45rem;
    height: 1.625rem;
  }
  p {
    padding-top: .1rem;
  }
`;

const ScrollableList = styled.div`
  overflow-y: auto;
  max-height: 150px; 
  border-radius: 5px;
`;

const PlaylistItem = styled.div`
  display: flex;
  justify-content: space-between; 
  align-items: center;
  border-bottom: 1px solid #cccccc; 
  background-color: white;
  padding: 10px;
`;

const PlaylistDate = styled.span`
  margin-top: 5px;
  font-size:15px;
  color: #808080; // 글자 색 회색으로 설정
`;

export const CloseButton = styled.div`
  width: 1.5rem;
  height: 1.5em;
  border-radius: 50%;
  background: #000000;
  color: #FDA06C;
  display: flex;
  justify-content: center;
  align-items: center;
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

interface PlaylistSelectProps {
  onPlaylistSelect: (playlistCode: string) => void;
}

const PlaylistSelect: React.FC<PlaylistSelectProps> = ({ onPlaylistSelect }) => {
  const dispatch = useDispatch();
  let dataList = useSelector((state: RootState) => state.playlists.playlists);
  const selectedPlaylistName = useSelector((state: RootState) => state.playlists.selectedPlaylist?.playlistName);
  const [covers, setCovers] = useState(dataList);
  const [isOpen, setIsOpen] = useState(false);
  const [playlistName, setPlaylistName] = useState<string>(selectedPlaylistName ?? "플레이리스트 선택");
  const onToggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    (async () => {
      try {
        const data = await getPlaylists();
        dispatch(setPlaylists(data.playlists));
        setCovers(data.playlists);
      } catch (err) {
        console.error("플레이리스트 데이터를 가져오는데 실패했습니다.")
      }
    })();
  }, [dispatch]);

  const handelSelect = (playlistCode: string, playlistName: string) => {
    onPlaylistSelect(playlistCode);
    setPlaylistName(playlistName);
    setIsOpen(false);
  }

  return (
    <>
      <PlaylistMenuBox onClick={onToggle}>
        <img src={dropBtn} alt="dropdown playlist menu open" /> 
        <p>{playlistName || "플레이리스트 선택" }</p> 
      </PlaylistMenuBox>
      {isOpen && (<ScrollableList>
         {covers && covers.map((playlist) => (
          <PlaylistItem key={playlist.playlistCode}
            onClick={() => handelSelect(playlist.playlistCode, playlist.playlistName)}>

            <span className="pt-1">{playlist.playlistName}</span>
            <PlaylistDate>
              {formatDate(playlist.createdTime)}
            </PlaylistDate>
          </PlaylistItem>
        ))}
      </ScrollableList>
  )}
    </>
  );
}


export default PlaylistSelect;