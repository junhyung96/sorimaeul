import styled from "styled-components";
import { VideoData } from "./SoriAward";
import defaultProfile from "../../../assets/profile.png";
import { useNavigate, useParams } from "react-router-dom";
import { s3URL } from "../../../utils/s3";
import { calcDate } from "../../../utils/calcDate";

const Container = styled.div`
  width: 23%;
  flex: 0 0 23%;
  box-sizing: border-box;
  margin: 1%;
  height: 15rem;
  display: flex;
  flex-direction: column;

  .thumbnail {
    border-radius: 5px;
    width: 100%;
    height: 8.3rem;
    margin-bottom: .5rem;
  }

  .title-box {
    width: 100%;
    display: flex;
    gap: .75rem;
    margin-bottom: auto;
    .circle {
      height: 1.5rem;
      width: 1.5rem;
      border-radius: 50%;
      overflow: hidden;
      border: .2px solid #A3A3A3;
      .profile {
        height: 100%;
        width: 100%;
      }
    }
    .title {
      width: 80%;
      font-size: 1.125rem;
      padding-top: .25rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: normal;
      line-height: 1.2;
      word-wrap: break-word;
      display: -webkit-box;
      -webkit-line-clamp: 2 ;
      -webkit-box-orient: vertical;
    }
  }

  .info {
    font-size: 0.75rem;
    color: #717171;
  }
`

const UserDubbingCard: React.FC<{ videoData: VideoData}> = ({ videoData }) => {
  const navigate = useNavigate();
  const params = useParams();

  const goDetail = () => {
    if (params.sourceCode) {
      navigate(`/dubbing/${params.sourceCode}/${videoData.dubCode}`);
    }
  }

  return (
    <Container onClick={goDetail}>
      <img className="thumbnail" src={s3URL + videoData.thumbnailPath} alt="thumbnail" />
      <div className="title-box">
        <div className="circle"><img className="profile" src={videoData.profileImage ? s3URL + videoData.profileImage : defaultProfile} alt="" /></div>
        <p className="title">{videoData.dubName}</p>
      </div>
      <p className="info">작성자 {videoData.nickname}</p>
      <div className="flex justify-between">
        <p className="info">좋아요 {videoData.likeCount}개</p>
        <p className="info">{calcDate(new Date(videoData.createdTime))}</p>
      </div>
    </Container>
  )
}

export default UserDubbingCard;