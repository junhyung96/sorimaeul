import styled from "styled-components";
import videoImg from "../../../assets/video.png";
import ToggleButton from "../../common/ToggleButton";
import { useEffect, useState } from "react";
import editIcon from "../../../assets/editIcon.png";
import { useNavigate, useParams } from "react-router-dom";
import { getUserVideo, updateDubbing } from "../../../utils/dubbingAPI";
import { s3URL } from "../../../utils/s3";
import DubbingConverting from "../contentCreation/DubbingConverting";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 2rem auto;

  .title {
    font-size: 2rem;
    font-family: 'GmarketSansBold';
    padding-top: .5rem;
  }
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  height: 21rem;
  justify-content: space-between;

  .video {
    width: 48%;
    height: 90%;
    border-radius: 5px;
    object-fit: cover;
  }

  .form {
    width: 48%;
    height: 100%;
    display: flex;
    flex-direction: column;
    font-size: 1.25rem;
    gap: .75rem;
    .content {
      flex-grow: 1;
      background: #EEEEEE;
      border-radius: 5px;
      padding: 1rem;
      resize: none;
      font-family: 'GmarketSansLight';
    }
    .button-box {
      display: flex;
      justify-content: space-between;
      .is-public {
        font-size: 1.125rem;
        font-family: 'GmarketSansLight';
      }
    }
    .description {
      font-size: 1rem;
      font-family: 'GmarketSansLight';
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

  &:disabled {
    cursor: not-allowed;
    background: #D9D9D9;
    opacity: .5;
  }
`

const TooltipBox = styled.span`
  position: relative;
  height: 2rem;
  .tooltip {
    position: absolute;
    right: 0;
    bottom: -160%;
    padding: .5rem;
    background-color: white;
    color: black;
    font-size: 1rem;
    border-radius: 5px;
    z-index: 10;
    display: none;
    min-width: 15rem;
    text-align: center;
    border: 1px solid #C9F647;
  }
  .tooltip::after {
    border-color: white transparent;
    border-style: solid;
    border-width: 0 6px 8px 6.5px;
    content: "";
    display: block;
    left: 95%;
    transform: translateX(-95%);
    position: absolute;
    top: -6px;
    width: 0;
    z-index: 1;
  }
  .tooltip::before {
    border-color: #C9F647 transparent;
    border-style: solid;
    border-width: 0 6px 8px 6.5px;
    content: "";
    display: block;
    left: 95%;
    transform: translateX(-95%);
    position: absolute;
    top: -8px;
    width: 0;
    z-index: 0;
  }
  &:hover {
    .tooltip {
      display: block;
    }
  }
`

function DubbingContentForm() {
  const params = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [content, setContent] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [videoPath, setVideoPath] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  const getUserVideoData = async () => {
    if (params.dubCode) {
      const res = await getUserVideo(params.dubCode);
      setTitle(res.dubName);
      setIsPublic(res.isPublic);
      setContent(res.dubDetail || '');
      setVideoPath(res.storagePath);
      setIsComplete(res.isComplete);
      setIsLoaded(true);
    }
  };

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
  }

  useEffect(() => {
    getUserVideoData();
  }, [params.dubCode])

  const editDubbing = async () => {
    if (params.dubCode) {
      await updateDubbing(params.dubCode, {
        dubName: title,
        dubDetail: content,
        isPublic
      });
      navigate(`/dubbing/${params.sourceCode}/${params.dubCode}`);
    }
  };

  const cancelEdit = () => {
    navigate(`/dubbing/${params.sourceCode}/${params.dubCode}`);
  };

  return (
    isLoaded && isComplete ?
    <Container>
      <div className="flex items-center gap-2">
        <img className="h-full" src={videoImg} alt="video" />
        <h2 className="title">영상 확인</h2>
      </div>
      <Content>
        <video className="video" controls src={s3URL + videoPath} />
        <form onSubmit={submitHandler} className="form">
          <div className="flex gap-2 items-center">
            <label className="pt-1" htmlFor="title">제목:</label>
            <input onChange={handleTitle} className="grow pt-1 px-2 border border-gray-300 rounded" type="text" name="title" id="title" defaultValue={title} />
          </div>
          <textarea onChange={handleContent} name="content" id="content" className="content" wrap="hard" placeholder="영상 설명을 입력해주세요" defaultValue={content || ''}></textarea>
          <div className="button-box">
            <div className="flex gap-2">
              <p className="is-public">공개여부</p>
              <ToggleButton isPublic={isPublic} setIsPublic={setIsPublic} color="#C9F647" />
            </div>
            <div className="flex gap-2">
              <Button onClick={cancelEdit}><p>취소</p></Button>
              <TooltipBox>
                <Button onClick={editDubbing} disabled={title === '' || content === ''}>
                  <img src={editIcon} alt="" className="icon" />
                  <p>완료</p>
                </Button>
                {
                  title === '' || content === '' &&
                  <p className="tooltip">⚠️영상 설명을 적어주세요</p>
                }
              </TooltipBox>
            </div>
          </div>
          <p className="description">tip. 비공개로 등록된 컨텐츠는 마이페이지에서 확인 가능합니다.</p>
        </form>
      </Content>
    </Container>
    :
    isLoaded && <DubbingConverting />
  )
}

export default DubbingContentForm;