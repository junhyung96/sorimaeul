import styled from 'styled-components';
import { Content } from "../../components/common/ModalStyles";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from '../../stores/modal';
import PlaylistSelect from '../../components/common/playlist/modal/PlaylistSelect';
import { RootState } from '../../stores/store';
import { addCoverToList } from '../../utils/playlistAPI';

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
`;

const CloseButton = styled.div`
  width: 1.5rem;
  height: 1.5em;
  border-radius: 50%;
  background: #FDA06C;
  color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  color: white;
  font-size: 22px;
`

function PlaylistAddModal() {
  const dispatch = useDispatch();
  const coverCode = useSelector((state:RootState) => state.modal.payload?.coverCode);

  const handlePlaylistSelect = async (playlistCode: string) => {
    try {
      // addCoverToList API를 호출하여 커버를 플레이리스트에 추가합니다.
      const res = await addCoverToList(playlistCode, coverCode);
      if (res.status === 201) {
        alert('플레이리스트에 커버를 추가했습니다!');
        dispatch(closeModal()); // 성공 시 모달을 닫습니다.
      } else {
        alert('이미 커버가 플레이리스트에 담겨있습니다.');
      }
    } catch (error) {
      console.error('플레이리스트에 커버를 추가하는 중 오류가 발생했습니다.', error);
    }
  };

  return (
    <>
      <Content $width={30} $height={20} $borderRadius={10} $background='#000000'>
        <HeaderContainer>
          <Title>플레이리스트를 선택해주세요.</Title>
          <CloseButton color="#FDA06C" onClick={() => dispatch(closeModal())}>x</CloseButton>
        </HeaderContainer>
        <PlaylistSelect onPlaylistSelect={handlePlaylistSelect}/>
      </Content>
    </>
  )
}
export default PlaylistAddModal;