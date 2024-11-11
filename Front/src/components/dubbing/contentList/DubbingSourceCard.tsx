import styled from "styled-components";
import { VideoData } from "../../../pages/dubbing/DubbingListPage";
import { useNavigate } from "react-router-dom";
import { s3URL } from "../../../utils/s3";

const Container = styled.div`
  width: 19%;
  flex: 0 0 19%;
  box-sizing: border-box;
  margin: 0.5%;
  height: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  
  .img-box {
    position: relative;
    height: 80%;
    .img {
      height: 100%;
      width: 100%;
    }
  }

  .title {
    flex-grow: 1;
    width: 100%;
    font-size: .875rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: flex;
    align-items: center;
    padding-top: .2rem;
  }
`

const DubbingSourceCard: React.FC<{data: VideoData}> = ({data}) => {
  const navigate = useNavigate();

  return (
    <Container onClick={() => navigate(`/dubbing/${data.videoSourceCode}`)}>
      <div className="img-box">
        <img className="img" src={s3URL + data.thumbnailPath} alt="thumbnail" />
      </div>
      <p className="title">{data.sourceName}</p>
    </Container>
  )
}

export default DubbingSourceCard;