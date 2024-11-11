import { useSelector } from "react-redux";
import MenuBar from "../../components/profile/MenuBar";
import PlaylistBox from "../../components/profile/playlist/PlaylistBox";
import { RootState } from "../../stores/store";
import ColorLine from "../../components/profile/ColorLine";
import CoverBox from "../../components/profile/aiCover/CoverBox";
import { styled } from "styled-components";
import UserEditor from "../../components/profile/UserEditor";
import learnCnt from "../../assets/learnCnt.png";
import ModelList from "../../components/profile/voiceModel/ModelList";
import DubbingList from "../../components/profile/dubbing/DubbingList";
import LikeContentsBox from "../../components/profile/likeContents/LikeContentsBox";

const Container = styled.div`
  display: flex;
  width: 90%;
  margin: 0 auto;
  justify-content: space-between;
  margin-bottom: 2rem;
`;


const MenuBarContainer = styled.div`
  width: 20%;

  display: flex;
  flex-direction: column;
`;

const ContentContainer = styled.div`
  width: 75%;
`;

const LearnCountContainer = styled.div`
  width: 100%;
  height: 2rem;
  background: #C9F647;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  padding: .25rem .5rem;
  gap: .5rem;
  .img {
    height: 80%;
  }
`;

const LearnCountText = styled.div`
  font-size: 0.8125rem;
  color: #000000;
  padding-top: .25rem;
`;

function ProfilePage() {
  const learnCount = useSelector((state: RootState) => state.user.learnCount);
  const selectedMenu = useSelector((state: RootState) => state.menu.selectedMenu);
  const coverCount = useSelector((state: RootState) => state.user.coverCount);
  const dubCount = useSelector((state: RootState) => state.user.dubCount);

  let ComponentToShow;
  switch (selectedMenu) {
    case "AI 커버":
      ComponentToShow = CoverBox;
      break;
    case "플레이리스트":
      ComponentToShow = PlaylistBox;
      break;
    case "나의 음성 모델":
      ComponentToShow = ModelList;
      break;
    case "더빙 컨텐츠":
      ComponentToShow = DubbingList;
      break;
    case "관심 컨텐츠":
      ComponentToShow = LikeContentsBox;
  }

  return (
    <>
      <ColorLine />

      <Container>

        <MenuBarContainer>
          <UserEditor />
          <LearnCountContainer>
            <LearnCountText>남은 모델 학습 횟수: {learnCount}회</LearnCountText>
          </LearnCountContainer>
          <LearnCountContainer>
            <LearnCountText>남은 커버 제작 횟수: {coverCount}회</LearnCountText>
          </LearnCountContainer>
          <LearnCountContainer>
            <LearnCountText>남은 더빙 제작 횟수: {dubCount}회</LearnCountText>
          </LearnCountContainer>
          <MenuBar />
        </MenuBarContainer>
       
        <ContentContainer>
          {ComponentToShow && <ComponentToShow />}
        </ContentContainer>
      </Container>
    </>
  )
}

export default ProfilePage;