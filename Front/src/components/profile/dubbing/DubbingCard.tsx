import styled from "styled-components";
import { DubbingData } from "./DubbingList";
import { Button } from "../../common/Button";
import { s3URL } from "../../../utils/s3";
import { useNavigate } from "react-router-dom";
import { deleteDubbing } from "../../../utils/dubbingAPI";
import { ReactComponent as Icon } from "../../../assets/public.svg";

const Container = styled.div`
  padding: 1rem;
  display: flex;
  height: 7.25rem;
  align-items: center;
  justify-content: space-between;

  .sm-font {
    font-size: 0.75rem;
    padding-top: .25rem;
  }

  .content {
    width: 60%;
    display: flex;
    height: 100%;
    justify-content: space-between;
    .img {
      height: 100%;
      width: 30%;
    }
    .text-box {
      display: flex;
      flex-direction: column;
      gap: .5rem;
      width: 67%;
      .description {
        font-family: 'GmarketSansLight';
        color: #A0A0A0;
      }
    }
  }

  .state {
    width: 12%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: .25rem;
  }

  .date {
    width: 14%;
    text-align: center;
  }

  .button {
    width: 11.8%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: .5rem;
  }
`

const DubbingCard: React.FC<{ data: DubbingData, setDubbingContents: React.Dispatch<React.SetStateAction<DubbingData[]>> }> = ({data, setDubbingContents}) => {
  const navigate = useNavigate();

  const editContent = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    navigate(`/dubbing/${data.videoSourceCode}/${data.dubCode}/edit`);
  };

  const deleteContent = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    await deleteDubbing(data.dubCode);
    setDubbingContents((prev: DubbingData[]) => {
      const newState = [...prev];
      return newState.filter(el => el.dubCode !== data.dubCode);
    })
  };

  return (
    <Container onClick={() => navigate(`/dubbing/${data.videoSourceCode}/${data.dubCode}`)}>
      <div className="content">
        <img className="img" src={s3URL + data.thumbnailPath} alt="thumbnail" />
        <div className="text-box">
          <p>{data.dubName}</p>
          <p className="description">{data.dubDetail}</p>
        </div>
      </div>
      <div className="state">
        <Icon width="25%" height="100%" fill={data.isPublic ? "#C9F647" : "#D9D9D9"} />
        <p className="sm-font">{data.isPublic ? '공개' : '비공개'}</p>
      </div>
      <p className="date sm-font">{data.createdTime.split('T')[0]}</p>
      <div className="button">
        <Button onClick={editContent} $marginLeft={0} $marginTop={0} $width={3} $height={1.875} $background="#C9F647" $color="black">수정</Button>
        <Button onClick={deleteContent} $marginLeft={0} $marginTop={0} $width={3} $height={1.875}>삭제</Button>
      </div>
    </Container>
  )
}

export default DubbingCard;