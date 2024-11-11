import styled from "styled-components";
import { useState } from "react";
import { Button } from "../../common/Button";
import { CloseButton, Content } from "../../common/ModalStyles";
import { InputBox } from "../../common/InputBox";
import { PlaylistCreateInterface, createPlaylist } from "../../../utils/playlistAPI";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../../stores/modal";
import { addPlaylist } from "../../../stores/playlists";
import logo from "../../../assets/sideSmLogo.png";

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LabelContainer = styled.div`
  display: flex;
  align-items: center; 
`;

const Label = styled.label`
  margin-left: 10px;
  font-weight: 500;
  font-size: 20px;
  line-height: 15px;
  color: #888888;
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledInputBox = styled(InputBox)`
  width: 350px;
  margin-left: 45px;
  margin-right: 20px;
`;


function PlaylistCreateModal () {
  const dispatch = useDispatch();

  const [playlistName, setPlaylistName] = useState("");
  const data: PlaylistCreateInterface = {
    playlistName
  }
  const handlePlaylistName = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPlaylistName(e.target.value);
  }

  const submitHandler = async () => {
    const res = await createPlaylist(data);
    if (res?.status === 201) {
      dispatch(addPlaylist(res.data));
    }
    dispatch(closeModal());
  }


  return (
    <>
    <Content $height={9}>
      <ModalHeader>
      <LabelContainer>
      <img src={logo} className="mb-1 w-10" />
      <Label htmlFor="playlistName">플레이리스트 이름을 입력해주세요.</Label>
      </LabelContainer>
      <CloseButton onClick={() => dispatch(closeModal())}>x</CloseButton>
      </ModalHeader>
      <InputContainer>
      <StyledInputBox type="text" id="playlistName" name="playlistName" value={data.playlistName} onChange={ handlePlaylistName}/>
      <Button onClick={submitHandler} $marginLeft={0} $marginTop={0} disabled={playlistName.trim().length === 0}>생성</Button>
      </InputContainer>
    </Content>
    </>
  )
}
export default PlaylistCreateModal;