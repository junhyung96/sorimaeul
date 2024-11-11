import { useNavigate } from "react-router-dom";
import { s3URL } from "../../../../utils/s3";
import { DubbingData } from "../../dubbing/DubbingList";
import styled from "styled-components";

const Container = styled.div`
  width: 32%;
  flex: 0 0 32%;
  box-sizing: border-box;
  margin: calc(4% / 6);
  height: 13rem;
  display: flex;
  flex-direction: column;

  .thumbnail {
    border-radius: 2px;
    width: 100%;
    height: 9rem;
    max-height: 9rem;
    object-fit: cover;
  }

  .title {
    width: 100%;
    font-size: 1.125rem;
    padding-top: .25rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .info {
    font-size: 0.75rem;
    color: #717171;
  }
`

const LikeDubbingCard: React.FC<{ data: DubbingData }> = ({data}) => {
  const navigate = useNavigate();
  
  return (
    <Container onClick={() => navigate(`/dubbing/${data.videoSourceCode}/${data.dubCode}`)}>
      <img src={s3URL + data.thumbnailPath} alt="" className="thumbnail" />
      <div className="mt-auto">
        <p className="title">{data.dubName}</p>
        <p className="info">{data.nickname}</p>
      </div>
    </Container>
  )
}

export default LikeDubbingCard;