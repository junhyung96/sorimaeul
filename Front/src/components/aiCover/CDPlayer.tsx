import styled from "styled-components";
import { Cover } from "./CoverInterface";
import { useNavigate } from "react-router";
import { defaultCover, s3URL } from "../../utils/s3";
import heart from "../../assets/heart.png";
import defaultProfile from "../../assets/profile.png";


const CDContainer = styled.div`
  cursor: pointer;
  width: 18.5%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CoverTitle = styled.p`
  font-size: 1rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const ThumbnailContainer = styled.div`
  position: relative;
  width: 190px;
  height: 190px;
  border-radius: 50%;
  overflow: hidden;
  object-fit: cover;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const ThumbnailImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  z-index: 1;
`;

const CenterCircle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: white;
  z-index: 2;
`;

const ProfileInfo = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 4px;
  justify-content: space-between;
`;

const ProfileImage = styled.img`
  width: 30px; 
  height: 30px;
  border-radius: 50%; 
  margin-right: 0.5rem;
`;

const Nickname = styled.p`
  height: 20px;
  flex-grow: 1;
  font-size: 14px;
  color: #575757;
`;

const LikeContainer = styled.div`
  display: flex;
  align-items: center;
`;

const HeartIcon = styled.img`
  width: 20px;
  height: auto;
  margin-right: 4px;
`;

const LikeCount = styled.p`
  font-size: 0.875rem;
  margin-top: 3px;
`;

const SongInfo = styled.p`
  width: 100%;
  font-size: 0.7rem;
  color: #a3a3a3;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

interface Props {
  cover: Cover;
}

const CDPlayer: React.FC<Props> = ({ cover }) => {
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
    <CDContainer onClick={() => navigate(`/cover/${coverCode}`)}>
      <ThumbnailContainer>
        {thumbnailPath ? (
           <ThumbnailImage src={ s3URL + thumbnailPath} alt={title} />
        ) : (<ThumbnailImage src={defaultCover} />)}
      <CenterCircle />
      </ThumbnailContainer>
      <CoverTitle>{coverName}</CoverTitle>
      <ProfileInfo >
        <ProfileImage src={  profileImage? s3URL + profileImage : defaultProfile } alt="Profile" /> 
        <Nickname>{nickname}</Nickname>
        <LikeContainer>
          <HeartIcon src={heart} alt="Like" />
          <LikeCount>{likeCount}</LikeCount>
        </LikeContainer>
      </ProfileInfo>
      <SongInfo>
        {singer} - {title} ({coverSinger})
      </SongInfo>
    </CDContainer>
  );
};

export default CDPlayer;
