import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../stores/store";
import { useEffect, useState } from "react";
import { deleteCoverFromList, getPlaylist } from "../../../utils/playlistAPI";
import { Content } from "../../common/ModalStyles";
import { s3URL } from "../../../utils/s3";
import logo from "../../../assets/logoBig.png";
import deleteIcon from "../../../assets/deleteIcon.png";
import { closeModal } from "../../../stores/modal";
import DetailPlayer from "../../audioPlayer/DetailPlayer";

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  gap: .5rem;
  
  p {
    font-size: 1.5625rem;
    white-space: nowrap; 
    overflow: hidden; 
    text-overflow: ellipsis; 
    max-width: 80%; 
    color: #BFEA44;
    padding-top: .4rem;
  }
`;

export const LogoIcon = styled.img`
  width: 1.5rem;
  height: 1.5rem;;
`;


const CoverList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  overflow-y: auto; 
  max-height: 700px; 
`;

const CoverItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px dashed #ccc;
  padding: 10px 0;
  width: 100%;

  span:first-child {
    flex: 1; // 커버명과 가수명이 더 많은 공간을 차지하도록 설정
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  span:nth-child(2) {
    flex: 1.12;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const Line = styled.hr`
  border: 0;
  height: 1px;
  background: #ccc;
  margin: 7px 0;
`;

export const CloseButton = styled.div`
  width: 36px;
  height: 34px;
  border-radius: 50%;
  background: #000000;
  color: #BFEA44;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const CoverName = styled.div`
  width: 15%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 20px;
`;

const Creator = styled.div`
  flex-grow: 1;
  margin-left: 24%; /* 커버명과의 간격을 30%로 설정 */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 20px;
`;

const TotalCount = styled.div`
  /* 총 곡수는 flex-grow를 사용하지 않고, 필요한 만큼의 공간만 사용하도록 함 */
  width: 65px;
  color: #888888;
  white-space: nowrap;
  background: #D9D9D9;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export interface CoverInfo {
  coverCode: string;
  coverSinger: string;
  singer: string;
  title: string;
  storagePath: string;
  nickname: string;
  isPublic: boolean;
}

export interface PlaylistDetailInterface {
  playlist: CoverInfo[];
}

function PlaylistDetailModal() {
  const dispatch = useDispatch();
  const { playlistCode, playlistName, createdTime } = useSelector((state: RootState) => state.playlists.selectedPlaylist) ?? { playlistCode: '', playlistName: '', createdTime: '' };
  const [data, setData] = useState<PlaylistDetailInterface | null>(null);

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
  }, [playlistCode]);

  // 플레이리스트에서 커버 삭제
  const deletCoverFromPlaylist = async (coverCode: string) => {
    const res = await deleteCoverFromList(playlistCode, coverCode);
    if (res.status == 200) {
      const updateData = await getPlaylist(playlistCode);
      setData(updateData);
    }
  }

  return (
    <>
      <Content $width={55} $height={55} $borderRadius={30}>     
        <ModalHeader>
          <LogoIcon src={logo}  alt="sorimaeul logo" />
          <p>{playlistName}</p>
          <CloseButton onClick={() => dispatch(closeModal())}>x</CloseButton>
        </ModalHeader>
        <InfoContainer>
        <CoverName>커버명</CoverName>
          <Creator>크리에이터</Creator>
          <TotalCount>총 {data?.playlist.length}곡</TotalCount>
          </InfoContainer>
          <Line />
        <div>
          <CoverList>
            {data?.playlist.map((cover, index) => (
              <CoverItem key={index}>
                <span className="text-lime-700">{cover.title}-{cover.singer}({cover.coverSinger})</span>
                <span className="ml-5 text-lime-600">{cover.nickname} </span>
                {cover && <DetailPlayer isPublic={cover.isPublic} coverCode={cover.coverCode} src={s3URL + `/${cover.storagePath}`}></DetailPlayer>}
                <img src={deleteIcon} onClick={()=>deletCoverFromPlaylist(cover.coverCode)} />

              </CoverItem>
            ))}
          </CoverList>
        </div>
      </Content>
    </>
  )
}

export default PlaylistDetailModal;