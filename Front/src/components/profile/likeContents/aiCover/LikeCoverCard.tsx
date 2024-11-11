import { styled } from "styled-components";
import { defaultCover, s3URL } from "../../../../utils/s3";
import { Cover } from "../../../aiCover/CoverInterface";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 22%;
  flex: 0 0 22%;
  box-sizing: border-box;
  margin: calc(12% / 8);
  height: 14rem;
  display: flex;
  flex-direction: column;

  .thumbnail {
    border-radius: 2px;
    width: 100%;
    height: 10rem;
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

const LikeCoverCard: React.FC<{data: Cover }> = ({data}) => {
  const navigate = useNavigate();

  return (

      <Container onClick={() => navigate(`/cover/${data.coverCode}`)}>
      <img src={data.thumbnailPath ? s3URL + data.thumbnailPath : defaultCover} className="thumbnail" alt="cover thumbnail" />
      <div className="p-2">
      <p className="title">{data.coverName}</p> 
      <p className="info">{data.nickname}</p>
      </div>
      </Container>

  )
}

export default LikeCoverCard;