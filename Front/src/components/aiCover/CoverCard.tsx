import { useNavigate } from "react-router-dom";
import { Cover } from "./CoverInterface"
import { defaultCover, s3URL } from "../../utils/s3";
import styled from 'styled-components';
import heart from '../../assets/heart.png';
import defaultProfile from "../../assets/profile.png";

const CardContainer = styled.div`
  width: 100%;
  height: auto;
  cursor: pointer;
`;

const ThumbnailImage = styled.img`
  width: 100%;
  height: 250px;
  border-radius: 2px;
`;

const Title = styled.h2`
  width: 100%;
  font-size: 1.2rem;
  margin-top: 0.3rem;
  margin-bottom: 0.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Nickname = styled.p`
  flex-grow: 1;
  margin-left: 5px;
  font-size: 1rem;
  color: #575757;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ProfileLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const ProfileInfo = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 0.5rem;
`;

const LikeContainer = styled.div`
  display: flex;
  align-items: center;
`;

const HeartIcon = styled.img`
  margin-right: 3px;
  margin-bottom: 5px;
  width: 25px;
  height: auto;
`;

const LikeCount = styled.p`
  font-size: 1.2rem;
  margin-top: 1px;
`;

const SongInfo = styled.p`
  width: 100%;
  height: 22px;
  line-height: 22px;
  font-size: 0.9rem;
  color: #a3a3a3;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

interface Props {
  cover: Cover;
}

const CoverCard: React.FC<Props> = ({ cover }) => {
  const {
    coverCode,
    coverName,
    thumbnailPath,
    profileImage,
    nickname,
    likeCount,
    coverSinger,
    singer,
    title,
  } = cover;
  const navigate = useNavigate();

  return (
  <CardContainer onClick={() => navigate(`/cover/${coverCode}`)}>
    { thumbnailPath ? ( <ThumbnailImage src={s3URL + thumbnailPath} alt={title} />) : (
       <ThumbnailImage src={defaultCover} alt={title} />
    )}
     
      <Title>{coverName}</Title>
      <ProfileLine>
        <ProfileInfo>
          <ProfileImage src={profileImage ? (s3URL + profileImage) : (defaultProfile)} />
          <Nickname>{nickname}</Nickname>
        </ProfileInfo>
        <LikeContainer>
          <HeartIcon src={heart} alt="Heart" />
          <LikeCount>{likeCount}</LikeCount>
        </LikeContainer>
      </ProfileLine>
      <SongInfo>
        {singer} - {title} ({coverSinger})
      </SongInfo>
    </CardContainer>
  );
};

export default CoverCard;
