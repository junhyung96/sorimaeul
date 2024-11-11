import ColorLine from "../../components/dubbing/ColorLine";
import styled from "styled-components";
import { getUserVideo, deleteDubbing, likeDubbing } from "../../utils/dubbingAPI";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import smile from "../../assets/smiling.png";
import notSmile from "../../assets/notSmiling.png";
import defaultProfile from "../../assets/profile.png";
import deleteIcon from "../../assets/deleteIcon.png";
import editIcon from "../../assets/editIcon.png";
import CommentComponent from "../../components/common/Comment";
import { getDubComment } from "../../utils/commentAPI";
import { useDispatch, useSelector } from "react-redux";
import { setCategory, setComments, setSelectedPostId } from "../../stores/comment";
import { s3URL } from "../../utils/s3";
import { RootState } from "../../stores/store";
import DubbingConverting from "../../components/dubbing/contentCreation/DubbingConverting";

const Container = styled.div`
  width: 75%;
  display: flex;
  flex-direction: column;
  margin: 2rem auto;
  gap: 1rem;

  .title {
    font-size: 2.25rem;
    font-family: 'GmarketSansBold';
  }
  
  .video {
    height: 29.3rem;
    border-radius: 5px;
    object-fit: cover;
  }

  .profile-box {
    height: 2.625rem;
    font-size: 1.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: .75rem;
    .profile {
      height: 2.625rem;
      width: 2.625rem;
      border-radius: 50%;
      border: .2px solid #A3A3A3;
    }
  }

  .like-box {
    display: flex;
    gap: .5rem;
    justify-content: center;
    align-items: center;
    .smile {
      height: 100%;
    }
    .count {
      font-size: 2rem;
      font-family: 'GmarketSansBold';
      padding-top: .4rem;
    }
  }

  .button-box {
    display: flex;
    gap: .5rem;
    .icon {
      height: 80%;
    }
  }

  .description-box {
    background: #EEEEEE;
    border-radius: 15px;
    padding: 1rem 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    font-family: 'GmarketSansLight';
    .description {
      font-size: 1rem;
      white-space: pre-wrap;
      overflow-wrap: anywhere;
    }
    .date {
      font-size: .75rem;
      text-align: right;
    }
  }
`

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: .2rem;
  background: white;
  color: #797979;
  width: 4.6rem;
  font-size: 1.125rem;
  height: 2rem;
  border: 1px solid #797979;
  border-radius: 5px;

  .icon {
    height: 100%;
  }

  p {
    padding-top: .2rem;
  }
`

interface InfoData {
  dubCode: number;
  dubName: string;
  dubDetail: string;
  createdTime: string;
  nickname: string;
  profileImage: string;
  likeCount: number;
  thumbnailPath: string;
  isLiked: number;
  storagePath: string;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  // getMonth()는 0부터 시작하므로 +1을 해줍니다.
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  
  return `${year}.${month}.${day}`;
}

function UserDubbingDetailPage() {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userName = useSelector((state: RootState) => state.user.nickname);
  
  const [info, setInfo] = useState<InfoData | null>(null);

  const getUserVideoData = async () => {
    if (params.dubCode) {
      const res = await getUserVideo(params.dubCode);
      setInfo(res);
    }
  };

  const getComments = async () => {
    if (params.dubCode) {
      const res = await getDubComment(params.dubCode);
      dispatch(setComments(res));
      dispatch(setSelectedPostId(params.dubCode));
      dispatch(setCategory('dub'));
    }
  };

  const deleteDubbingContent = async () => {
    if (params.dubCode) {
      await deleteDubbing(params.dubCode);
      navigate(`/dubbing/${params.sourceCode}`);
    }
  };

  const likeContent = async () => {
    if (userName !== info?.nickname && params.dubCode && info) {
      await likeDubbing(params.dubCode, info.isLiked);
      setInfo((prev: InfoData | null) => {
        if (prev === null) {
          return null;
        }
        const newInfo = {...prev};
        return {
          ...newInfo,
          isLiked: newInfo.isLiked ? 0 : 1,
          likeCount: newInfo.isLiked ? newInfo.likeCount - 1 : newInfo.likeCount + 1
        } as InfoData
      });
    }
  };

  useEffect(() => {
    getUserVideoData();
    getComments();
  }, [params.dubCode])

  return (
    <>
      <ColorLine />
      {
        info && info.storagePath ?
        <Container>
          <h1 className="title">{info.dubName}</h1>
          <video className="video" controls src={s3URL + info.storagePath} />
          <div className="flex justify-between items-center">
            <div className="profile-box">
              <img className="profile" src={info.profileImage ? s3URL + info.profileImage : defaultProfile} alt="" />
              <p>{info?.nickname}</p>
            </div>
            <div className="flex gap-4 justify-center items-center h-full">
              <div className="like-box">
                <img onClick={likeContent} className="smile" src={info.isLiked ? smile : notSmile} alt="smile" />
                <p className="count">+ {info.likeCount}</p>
              </div>
              {
                info?.nickname === userName &&
                <div className="button-box">
                  <Button onClick={() => navigate(`/dubbing/${params.sourceCode}/${params.dubCode}/edit`)}>
                    <img className="icon" src={editIcon} alt="" />
                    <p>수정</p>
                  </Button>
                  <Button onClick={deleteDubbingContent}>
                    <img className="icon" src={deleteIcon} alt="" />
                    <p>삭제</p>
                  </Button>
                </div>
              }
            </div>
          </div>
          <div className="description-box">
            <p className="description">{info.dubDetail}</p>
            <p className="date">{formatDate(info.createdTime)}</p>
          </div>
          <CommentComponent width={100} />
        </Container> 
        :
        <DubbingConverting />
      }
    </>
  )
}

export default UserDubbingDetailPage;