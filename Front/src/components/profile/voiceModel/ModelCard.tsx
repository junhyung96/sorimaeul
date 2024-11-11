import { ModelData } from "./ModelList";
import styled from "styled-components";
import defaultImg from "../../../assets/wave1.png";
import { useNavigate } from "react-router-dom";
import { Button } from "../../common/Button";
import { deleteModel } from "../../../utils/voiceModelAPI";
import { s3URL } from "../../../utils/s3";

const Container = styled.div`
  flex: 0 0 48%;
  box-sizing: border-box;
  margin: 1%;
  height: 9.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border: 1px solid black;
  border-radius: 1.875rem;
  margin-bottom: 1rem;

  .img-box {
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    overflow: hidden;
  }
  .img {
    width: 100%;
    height: 100%;
  }
`

const InfoBox = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  margin-left: 1.5rem;
  gap: .5rem;
  width: 100%;

  .title {
    width: 66%;
    font-size: 1.25rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    line-height: 1.2;
    word-wrap: break-all;
    display: -webkit-box;
    -webkit-line-clamp: 2 ;
    -webkit-box-orient: vertical;
  }

  .sm-font {
    font-size: 0.75rem;
    padding-top: .2rem;
  }

  .gray {
    color: #939393;
  }

  .progress-box {
    border-radius: 3.125rem;
    background: #D9D9D9;
    display: flex;
    align-items: center;
    justify-items: center;
    padding: .5rem .75rem;
  }
`

const ModelCard: React.FC<{ data: ModelData, setModelList: React.Dispatch<React.SetStateAction<ModelData[]>> }> = ({data, setModelList}) => {
  const navigate = useNavigate();

  const deleteMyModel = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    await deleteModel(data.modelCode);
    setModelList(prev => {
      const newState = [...prev];
      return newState.filter(el => el.modelCode !== data.modelCode)
    });
  }

  return (
    <Container onClick={() => navigate(`/model/${data.modelCode}`)}>
      <div className="img-box">
        <img className="img" src={data.imagePath ? s3URL + data.imagePath : defaultImg} alt="" />
      </div>
      <InfoBox>
        <div className="flex justify-between">
          <p className="title w-7/12">{data.modelName}</p>
          <p className="sm-font gray grow text-right h-full">
            {
              data.state === 0 && '녹음중' 
              || 
              data.state === 1 && '학습전' 
              || 
              data.state === 2 && '학습중'
              ||
              data.state === 3 && '학습 완료'
            }
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <div className="progress-box">
            <p className="sm-font">녹음 진행률: {(Math.round((data.recordCount/200)*1000*100))/1000}% ({data.recordCount}/200)</p>
          </div>
          <Button onClick={deleteMyModel}>삭제</Button>
        </div>
      </InfoBox>
    </Container>
  )
}

export default ModelCard;