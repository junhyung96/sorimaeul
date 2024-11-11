import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../stores/store";
import { getScripts, recordVoice } from "../../utils/voiceModelAPI";
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import backBtn from "../../assets/backBtn.png";
import playRecordBtn from "../../assets/playRecordBtn.png";
import reRecordBtn from "../../assets/reRecordBtn.png";
import startRecordBtn from "../../assets/startRecordBtn.png";
import stopRecordBtn from "../../assets/stopRecordBtn.png";
import { Button } from "../../components/common/Button";
import { useNavigate, useParams } from "react-router-dom";
import { getModelInfo } from "../../utils/voiceModelAPI";
import { setModelInfo, getNextSentence } from "../../stores/voiceModel";

const Container = styled.div`
  height: 100vh;
  width: 100%;
  background: linear-gradient(181.35deg, rgba(24, 38, 157, 0.7) -9.39%, rgba(255, 120, 217, 0.7) 119.24%), linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), linear-gradient(181.35deg, rgba(235, 0, 255, 0.7) -9.39%, rgba(255, 255, 255, 0.7) 119.24%), #6D9FFF;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .box {
    background: rgba(0, 0, 0, 0.8); 
    width: 85%;
    height: 34.5rem;
    border-radius: 10px;
    color: white;
    display: flex;
    flex-direction: column;
    padding: 1rem 2rem;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;

    .title-box {
      width: 100%;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      .back-button {
        position: absolute;
        height: 70%; 
        left: 0;
      }
      .title {
        font-size: 2.625rem;
        padding-top: 0.5rem;
      }
    }
    
    .script-box {
      width: 100%;
      text-align: center;
      background-color: white;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      .number {
        font-size: 1.25rem;
        color: #949494;
      }
      .script {
        font-size: 1.875rem;
        color: black;
        font-family: 'GmarketSansBold';
      }
    }

    .record-box {
      display: flex;
      height: 5rem;
      width: 100%;
      margin: 0 1rem;
      padding: 1rem 2rem;
      background: #888888;
      border-radius: 30px;

      .recordBtn {
        height: 100%;
      }
      .reRecordBtn {
        height: 90%;
      }
    }

    .button-box {
      display: flex;
      width: 100%;
      gap: 1rem;
      justify-content: flex-end;
    }
  }
`

const ProgressBar = styled.div<{ $percentage: number }>`
  width: 100%;
  border-radius: 50px;
  height: 1.5rem;
  background-color: #D9D9D9;
  overflow: hidden;

  .complete {
    width: ${(props) => `${props.$percentage}%`};
    height: 100%;
    background: #7C87E3;;
    border-radius: 50px;
  }
`

interface Script {
  no: number,
  script: string
}

function RecordingPage() {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const modelInfo = useSelector((state: RootState) => state.voiceModel)

  const [scripts, setScripts] = useState<Script[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const [recordState, setRecordState] = useState(0); // 0: 녹음 전, 1: 녹음 중, 2: 녹음 완료
  const [audioURL, setAudioURL] = useState('');
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isPlay, setIsPlay] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(new Audio());

  const getData = async () => {
    if (params.code) {
      const response = await getModelInfo(params.code);
      dispatch(setModelInfo(response));
    }
  }

  
  const getScriptData = async () => {
    const res = await getScripts();
    setScripts(() => res.scripts);
    setIsLoaded(true);
  };

  const getMedia = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      setMediaRecorder(mediaRecorder);
    } catch (err) {
      console.error('오디오 녹음을 위한 장치 접근에 실패했습니다.', err);
      window.alert('오디오 장치가 연결됐는지 확인해주세요');
      navigate(`/model/${modelInfo.modelCode}`);
    }
  };

  const startRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.start();
      setRecordState(1);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecordState(2);

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          setAudioURL(URL.createObjectURL(e.data));
          setAudioBlob(e.data);
        }
      };
    }
  };

  useEffect(() => {
    audioRef.current.src = audioURL;
  }, [audioURL])

  const resetRecording = () => {
    setRecordState(0);
    setAudioURL('');
    setAudioBlob(null);
  };
  
  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlay(true);

      audioRef.current.onended = () => {
        setIsPlay(false);
      }
    }
  };

  const stopAudio = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlay(false);
  };

  const uploadAudio = async () => {
    if (audioBlob) {
      const formData = new FormData();
      formData.append("recordingFile", audioBlob, `model${modelInfo.modelCode}_recording${modelInfo.recordCount + 1}.wav`);
      
      await recordVoice(modelInfo.modelCode, modelInfo.recordCount + 1, formData);
    }
  }

  useEffect(() => {
    getScriptData();
  }, [])

  useEffect(() => {
    getData();
  }, [params.code])

  useEffect(() => {
    setPercentage(((Math.round((modelInfo.recordCount/200)*1000*100))/1000));
    getMedia();
  }, [modelInfo.recordCount])

  const quitRecording = () => {
    if (audioBlob) {
      uploadAudio();
    }
    navigate(`/model/${modelInfo.modelCode}`);
  }

  const goNext = () => {
    uploadAudio();
    dispatch(getNextSentence());
    setAudioURL('');
    setIsPlay(false);
    setRecordState(0);
    setAudioBlob(null);
  };

  return (
    <>
      {
        isLoaded &&
        <Container>
          <div className="box">
            <div className="title-box">
              <img onClick={() => navigate(`/model/${modelInfo.modelCode}`)} className="back-button" src={backBtn} alt="" />
              <h2 className="title">문장 녹음</h2>
            </div>
            <ProgressBar $percentage={percentage}>
              <div className="complete"></div>
            </ProgressBar>
            <div className="flex flex-col w-5/6 justify-center items-center gap-4">
              <p>진행률 <span className="highlight">{percentage}%</span> ({modelInfo.recordCount}/200)</p>
              <div className="script-box">
                <p className="number">{modelInfo.recordCount + 1}번째 문장</p>
                <p className="script">{scripts[modelInfo.recordCount].script}</p>
              </div>
              <p className="w-full ml-4">tip. 녹음한 문장이 많을수록 모델 학습이 용이합니다.</p>
              <div className="record-box">
                {
                  recordState === 0 &&
                  <img onClick={startRecording} className="recordBtn" src={startRecordBtn} alt="startRecordBtn" />
                }
                {
                  recordState === 1 &&
                  <img onClick={stopRecording} className="recordBtn" src={stopRecordBtn} alt="stopRecordBtn" />
                }
                {
                  recordState === 2 &&
                  <>
                    {
                      isPlay ?
                      <img onClick={stopAudio} src={stopRecordBtn} className="recordBtn" alt="stopPlaying" />
                      :
                      <img onClick={playAudio} className="recordBtn" src={playRecordBtn} alt="playRecordBtn" />
                    }
                  </>
                }
                <div className="grow"></div>
                {
                  recordState === 2 &&
                  <img onClick={resetRecording} className="reRecordBtn" src={reRecordBtn} alt="reRecordBtn" />
                }
              </div>
              <div className="button-box">
                <Button onClick={goNext} disabled={!audioBlob} $marginLeft={0} $marginTop={0} $background="#7C87E3" $width={7.5} $height={2.5} $fontSize={1.2}>다음 문장</Button>
                {
                  modelInfo.recordCount >= 199 &&
                  <Button onClick={quitRecording} disabled={modelInfo.recordCount === 199 && !audioBlob} $marginLeft={0} $marginTop={0} $color="#7C87E3" $width={7.5} $height={2.5} $fontSize={1.2}>녹음 종료</Button>
                }
              </div>
            </div>
          </div>
        </Container>
      }
    </>
  )
}

export default RecordingPage;