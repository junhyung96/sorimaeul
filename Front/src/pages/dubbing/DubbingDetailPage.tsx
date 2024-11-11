import ColorLine from "../../components/dubbing/ColorLine";
import SourceVideoInfo from "../../components/dubbing/contentDetail/SourceVideoInfo";
import SoriAward from "../../components/dubbing/contentDetail/SoriAward";
import UserDubbingList from "../../components/dubbing/contentDetail/UserDubbingList";

function DubbingDetailPage() {
  return (
    <>
      <ColorLine />
      <SourceVideoInfo />
      <SoriAward />
      <UserDubbingList />
    </>
  )
}

export default DubbingDetailPage;