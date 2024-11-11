import styled from "styled-components";
import modelBg from "../../assets/modelBg.png";
import SelectMethod from "../../components/voiceModel/beforeTrain/SelectMethod";
import { useDispatch, useSelector } from "react-redux";
import { getModelInfo } from "../../utils/voiceModelAPI";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { setModelInfo, setIsStart } from "../../stores/voiceModel";
import { RootState } from "../../stores/store";
import { Button } from "../../components/common/Button";
import loadingLottie from "../../assets/lottie/loading.json";
import trainingLottie from "../../assets/lottie/training.json";
import Lottie from "lottie-react";
import Complete from "../../components/voiceModel/complete/Complete";

const Container = styled.div<{ $learnState: number }>`
  background: ${(props) => {
    if (props.$learnState === 0 || props.$learnState === 1) {
      return `url(${modelBg})`;
    } else {
      return 'linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), linear-gradient(181.35deg, rgba(24, 38, 157, 0.7) -9.39%, rgba(255, 120, 217, 0.7) 119.24%), linear-gradient(180deg, rgba(211, 123, 255, 0) 0%, rgba(211, 123, 255, 0.8) 100%), #000000'
    }
  }};
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  .loading-box {
    position: absolute;
    right: 0;
    top: 0;
    left: 0;
    bottom: 0;
    background: rgba(0, 0, 0, .7);
    z-index: 2;
  }

  .training {
    height: calc(100vh - 6.25rem);
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: .5rem
  }

  .complete-box {
    height: calc(100vh - 6.25rem);
    width: 100%;
  }
`
const Box = styled.div`
  border-radius: 25px;
  background-color: rgba(214, 214, 214, 0.66);
  width: 55%;
  padding: 4rem 1rem;
  backdrop-filter: blur(.5rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  margin: 2rem;

  .title {
    font-size: 1.875rem;
    color: white;
    font-family: 'GmarketSansBold';
  }

  .step {
    display: flex;
    flex-direction: column;
    gap: .5rem;
    width: 100%;
    justify-content: center;
    align-items: center;

    .subtitle {
      width: 65%;
      font-size: 1.3rem;
      color: white;
      padding-top: 0.4rem;
      font-family: 'GmarketSansBold';
    }
  }
`

function ModelDetailPage() {
  const dispatch = useDispatch();
  const params = useParams();
  const modelInfo = useSelector((state: RootState) => state.voiceModel);
  const isLoading = useSelector((state: RootState) => state.voiceModel.isStart);
  const learnCount = useSelector((state: RootState) => state.user.learnCount);

  const getData = async () => {
    if (params.code) {
      const response = await getModelInfo(params.code);
      dispatch(setModelInfo(response));
    }
  }

  useEffect(() => {
    getData();
  }, [params.code, modelInfo.learnState])

  const startLearning = () => {
    dispatch(setIsStart(true));
  }

  return (
    <Container $learnState={modelInfo.learnState}>
      { isLoading && 
        <div className="loading-box">
          <Lottie 
            animationData={loadingLottie}
            style={{
              width: "100%",
              height: "100%",
            }}
          /> 
        </div>
      }
      {
        (modelInfo.learnState === 0 || modelInfo.learnState === 1) &&
        <Box>
          <h2 className="title">나만의 음성 모델 만들기</h2>
          <hr className="w-5/6" />
          <div className="step">
            <h3 className="subtitle">Step 3. 음성 업로드 방법 선택</h3>
            <SelectMethod />
            <div className="flex w-8/12">
              <Button 
                onClick={startLearning}
                $marginTop={0} 
                $width={6.25} 
                $height={3.125} 
                $fontSize={1} 
                $color="#7C87E3" 
                disabled={
                  learnCount === 0
                  ||
                  (modelInfo.method === "self" && modelInfo.recordCount < 200) 
                  || 
                  (modelInfo.method === "file" && !modelInfo.isFileUploaded) 
                  || 
                  (modelInfo.method === "model" && !modelInfo.isFileUploaded)
                }
              >
                {
                  modelInfo.method === "model" ? "등록하기" : "학습시작"
                }
              </Button>
            </div>
          </div>
        </Box>
      }
      {
        modelInfo.learnState === 2 &&
        <div className="training">
          <p className="text-white text-3xl mb-2 text-center">음성 학습이 진행중입니다.</p>
          <p className="text-white text-center">학습 진행에 약 30~40분이 걸립니다.</p>
          <p className="text-white text-ceter">학습 완료 후, 알림이 가오니 다른 서비스를 이용하고 계셔도 됩니다.</p>
          <Lottie 
            animationData={trainingLottie}
            style={{
              width: "70%",
              height: "70%",
            }}
          /> 
        </div>
      }
      {
        modelInfo.learnState === 3 &&
        <div className="complete-box">
          <Complete />
        </div>
      }
    </Container>
  )
}

export default ModelDetailPage;