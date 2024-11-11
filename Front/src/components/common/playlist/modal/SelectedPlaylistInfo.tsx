import { useSelector } from "react-redux";
import { RootState } from "../../../../stores/store";
import DetailPlayer from "../../../audioPlayer/DetailPlayer";
import deleteIcon from "../../../../assets/deleteIcon.png";
import { styled } from "styled-components";
import { deleteCoverFromList, getPlaylist } from "../../../../utils/playlistAPI";
import { useEffect, useState } from "react";
import { s3URL } from "../../../../utils/s3";
import { PlaylistDetailInterface } from "../../../profile/playlist/PlaylistDetailModal";
import { setSelectedPlaylist } from "../../../../stores/playlists";

const PlaylistItem = styled.li`
  display: flex;
  justify-content: space-between; 
  align-items: center;
  border: 3px solid #cccccc; 
  border-radius: 10px;
  overflow-y: hidden;
  height: 2.75rem;
  
  background-color: white;
  padding: 0.25rem;

  &:hover {
    background-color: #f0f0f0; 
  }

  &:active {
    background-color: #e0e0e0;
  }
`;

const CoverItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  width: 100%;

  span {
    padding-top: 0.25rem;
  }

  span:first-child {
    flex: 1; // 커버명과 가수명이 더 많은 공간을 차지하도록 설정
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  span:nth-child(2) {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

function SelectedPlaylistInfo() {
  const selectedPlaylist = useSelector((state: RootState) => state.playlists.selectedPlaylist);
  const [data, setData] = useState<PlaylistDetailInterface | null>(null);
  const playlistCode = selectedPlaylist?.playlistCode;


  useEffect(() => {

    if (playlistCode) {
      (async () => {
        try {
          const data = await getPlaylist(playlistCode);
          setData(data);
        } catch (err) {
          console.error(err);
        }
      })();
    }
  }, [selectedPlaylist]);

  // 플레이리스트에서 커버 삭제
  // const deletCoverFromPlaylist = async (coverCode: string) => {
  //   if (!playlistCode) return;

  //   const res = await deleteCoverFromList(playlistCode, coverCode);
  //   if (res.status == 200) {
  //     const updateData = await getPlaylist(playlistCode);
  //     setData(updateData);
  //     setSelectedPlaylist(updateData);
  //   }
  // }

  // selectedPlaylist가 정의되지 않았을 경우를 대비한 처리
  if (!selectedPlaylist || !selectedPlaylist.covers) {
    return <div className="text-white">선택된 플레이리스트가 없습니다.</div>;
  }

  return (
    <div className="mt-2">
      <h2 className="text-white">플레이리스트 커버 목록</h2>
      <ul className="flex flex-col gap-2 mt-2">
        {selectedPlaylist.covers.map((cover, index) => (
          <PlaylistItem key={index}>
            <CoverItem>
            <span>{cover.title} - {cover.singer} ({cover.coverSinger}) {cover.isPublic}</span>
            <span>{cover.nickname}</span> 
            <DetailPlayer isPublic={cover.isPublic} coverCode={cover.coverCode} src={s3URL + `/${cover.storagePath}`}></DetailPlayer>
            {/* <img src={deleteIcon} className="ml-2" onClick={() => deletCoverFromPlaylist(cover.coverCode)} /> */}
            </CoverItem>
          </PlaylistItem>
        ))}
      </ul>
    </div>
  );
};

export default SelectedPlaylistInfo;