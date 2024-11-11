import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../stores/store";
import { Button } from "../../common/Button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { startModelLearning } from "../../../utils/voiceModelAPI";
import { setIsLearning, setIsStart } from "../../../stores/voiceModel";

const Container = styled.div`
  width: 100%;
  padding: 1rem;
  color: white;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .guide {
    font-size: 0.875rem;
  }
  .record-controller {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 8rem;
    background-color: #8F8F8F;
    .start {
      font-size: 1.5rem;
    }
    .recording {
      width: 90%;
      text-align: center;
      display: flex;
      flex-direction: column;
      gap: .25rem;
      .light {
        font-size: 1.15rem;
        font-family: 'GmarketSansLight';
      }
      .sm-font {
        font-size: .75rem;
      }
      .md-font {
        font-size: 1rem;
      }
    }
  }
`

const ProgressBar = styled.div<{ $percentage: number }>`
  flex-grow: 1;
  border-radius: 50px;
  height: 1rem;
  background-color: white;
  overflow: hidden;

  .complete {
    width: ${(props) => `${props.$percentage}%`};
    height: 100%;
    background: linear-gradient(0deg, rgba(255, 46, 234, 0.3), rgba(255, 46, 234, 0.3)), #7C87E3;;
    border-radius: 50px;
  }
`

function SelfRecordMethod() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const modelInfo = useSelector((state: RootState) => state.voiceModel);
  const [percentage, setPercentage] = useState(0);

  const startRecord = () => {
    if (modelInfo.learnState === 0) {
      navigate(`/model/${modelInfo.modelCode}/record`);
    }
  };

  const startLearning = async () => {
    const res = await startModelLearning(modelInfo.modelCode);
    if (res?.status === 200) {
      dispatch(setIsLearning(2));
      dispatch(setIsStart(false));
    }
  };

  useEffect(() => {
    setPercentage(((Math.round((modelInfo.recordCount/200)*1000*100))/1000));
  }, [modelInfo])

  useEffect(() => {
    if (modelInfo.isStart) {
      startLearning();
    }
  }, [modelInfo.isStart])

  return (
    <Container>
      <div className="guide">
        <p>음성 학습에 필요한 목소리를 직접 녹음합니다.</p>
        <p>최소 200문장 이상 녹음해야만 학습 진행이 가능합니다.</p>
        <p>(최소 30분 이상의 시간이 소요되며, 중간 저장이 가능합니다.)</p>
      </div>
      <div onClick={startRecord} className="record-controller">
        {
          modelInfo.recordCount > 0 ?
          <div className="recording">
            <p className="light">모델명: {modelInfo.modelName}</p>
            <div className="flex gap-2">
              <p className="md-font">녹음 진행률:</p>
              <ProgressBar $percentage={percentage}>
                <div className="complete"></div>
              </ProgressBar>
              <p className="sm-font">{percentage}% ({modelInfo.recordCount}/200문장)</p>
            </div>
            <div className="flex justify-center">
              <Button onClick={() => navigate(`/model/${modelInfo.modelCode}/record`)} $marginLeft={0} $marginTop={0} $width={4.5}>이어하기</Button>
            </div>
          </div>
          :
         <p className="start">녹음 시작하기</p>
        }
      </div>
    </Container>
  )
}

export default SelfRecordMethod;