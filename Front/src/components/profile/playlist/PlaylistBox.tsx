import { useDispatch } from "react-redux";
import { openModal } from "../../../stores/modal";
import { Button } from "../../common/Button";
import { PlaylistList } from "./PlaylistList";
import MenuDescription from "../MenuDescription";
import { styled } from "styled-components";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

function PlaylistBox() {
  const dispatch = useDispatch();

  const openPlaylistCreateModal = () => {
    dispatch(openModal({
      modalType: "playlistcreate",
    }));
  };


  return (
    <Container>
      <div className="w-full flex items-center justify-between">
        <MenuDescription bigText={"플"} middleText={"레이리스트"} smallText={"나만의 플레이리스트"} />
        <Button 
          onClick={openPlaylistCreateModal}
          $color="#BFEA44"
          $marginLeft={0} $marginTop={0}
        >
          + 새로 만들기
        </ Button> 
      </div>
      <PlaylistList />
    </Container>
  )
}

export default PlaylistBox;