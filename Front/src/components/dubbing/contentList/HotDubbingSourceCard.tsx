import styled from "styled-components";
import { VideoData } from "../../../pages/dubbing/DubbingListPage";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../stores/store";
import { s3URL } from "../../../utils/s3";

const Container = styled.div<{ $isOpen: boolean }>`
  min-width: ${(props) => `calc((100vw - ${props.$isOpen ? "314px" : "60px"}) / 5)` };
  box-sizing: border-box;
  height: 100%;
  position: relative;
  padding: 0 .5rem;
  cursor: pointer;
  
  .img {
    height: 100%;
    width: 100%;
  }

  .content-title {
    position: absolute;
    bottom: 0;
    text-align: center;
    width: 100%;
    font-size: 1rem;
    font-family: 'GmarketSansBold';
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #FFE928;
    -webkit-text-stroke: 1px black;
  }
`

const HotDubbingSourceCard: React.FC<{data: VideoData}> = ({data}) => {
  const navigate = useNavigate();
  const isOpen = useSelector((state: RootState) => state.common.isOpen);

  return (
    <Container $isOpen={isOpen} onClick={() => navigate(`/dubbing/${data.videoSourceCode}`)}>
      <img className="img" src={s3URL + data.thumbnailPath} alt="thumbnail" />
      <p className="content-title">{data.sourceName}</p>
    </Container>
  )
}

export default HotDubbingSourceCard;