import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { getOriginVoices, uploadRecord, convertRecord, createDubbing } from "../../../utils/dubbingAPI";
import { getVoiceModels } from "../../../utils/voiceModelAPI";
import { s3URL } from "../../../utils/s3";
import Select from "react-select";
import { Button } from "../../common/Button";
import { ReactComponent as StartDubBtn } from "../../../assets/startDubBtn.svg";
import { ReactComponent as StopDubBtn } from "../../../assets/stopDubBtn.svg";
import { ReactComponent as PlayDubBtn } from "../../../assets/playDubBtn.svg";
import { ReactComponent as ReDubBtn } from "../../../assets/reDubBtn.svg";
import { useDispatch } from "react-redux";
import { decreaseDubCount } from "../../../stores/user";

const Container = styled.div`
  width: 85%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 2rem auto;

  .sm-font {
    font-size: .8rem;
    margin-top: -0.5rem;
  }
`

const InputBox = styled.div`
  display: flex;
  height: 2.25rem;
  align-items: center;
  gap: .5rem;
  
  .title {
    font-size: 2rem;
    font-family: 'GmarketSansBold';
    padding-top: .25rem;
  }
  
  .title-input {
    flex-grow: 1;
    height: 100;
    font-size: 1.25rem;
    font-family: 'GmarketSansLight';
    padding: 0 .5rem;
    border: 1px solid #D9D9D9;
    border-radius: 5px;
  }
`

const VideoBox = styled.div`
  width: 100%;
  border-radius: 5px;
  overflow: hidden;
  video {
    width: 100%;
    height: 100%;
    max-height: 38.25rem;
    object-fit: cover;
  }
`

const DubbingBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: .5rem;

  .character-section {
    width: 16.8%;
  }

  .record-section {
    width: 17%;
  }

  .model-section {
    width: 26%;
  }

  .pitch-section {
    width: 13.6%;
  }

  .check-section {
    width: 15%;
  }

  .convert-section {
    flex-grow: 1;
  }

  .type {
    font-size: 1.25rem;
    color: #727272;
    text-align: center;
    padding-top: .25rem;
  }

  .character {
    width: 100%;
    display: flex;
    justify-content: space-between;
    .box {
      display: flex;
      justify-content: center;
      align-items: center;
      .name {
        font-size: 1.25rem;
        padding-top: .25rem;
      }
    }
  }

  .control-box {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    position: relative;
    .pitch {
      height: 65%;
      width: 70%;
      border: 1px solid #d9d9d9;
      border-radius: 5px;
      padding-left: .5rem;
      text-align: center;
      padding-top: .25rem;
    }
    .convert-btn {
      height: 65%;
      width: 70%;
    }
  }

  .check-box {
    position: absolute;
    right: 0;
    height: 100%;
    width: 15%;
  }
`

const TooltipBox = styled.span`
  position: relative;
  height: 2rem;
  .tooltip {
    position: absolute;
    left: 45%;
    top: -130%;
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
    border-width: 8px 6px 0 6.5px;
    content: "";
    display: block;
    left: 5%;
    transform: translateX(-5%);
    position: absolute;
    bottom: -6px;
    width: 0;
    z-index: 1;
  }
  .tooltip::before {
    border-color: #C9F647 transparent;
    border-style: solid;
    border-width: 8px 6px 0 6.5px;
    content: "";
    display: block;
    left: 5%;
    transform: translateX(-5%);
    position: absolute;
    bottom: -8px;
    width: 0;
    z-index: 0;
  }
  &:hover {
    .tooltip {
      display: block;
    }
  }
`

interface VoiceData {
  videoSourceCode: number;
  voicePath: string;
  voiceIndex: number;
  voiceName: string;
}

interface ModelData {
  modelCode: number;
  modelName: string;
  state: number;
  existSource: boolean;
}

function Dubbing() {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [videoPath, setVideoPath] = useState('');
  const [originVoiceList, setOriginVoiceList] = useState<VoiceData[]>([]);
  const [modelInput, setModelInput] = useState<{ value: number, label: string }[]>([]);
  const [voicePaths, setVoicePaths] = useState<string[]>([]);
  const [recordState, setRecordState] = useState<number[]>([]); // 0: 녹음 전, 1: 녹음 중, 2: 녹음 완료
  const [audioURL, setAudioURL] = useState<string[]>([]);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob[]>([]);
  const [isPlay, setIsPlay] = useState<boolean[]>([]);
  const [isConverted, setIsConverted] = useState<boolean>(false);
  const [isConverting, setIsConverting] = useState<boolean[]>([]);
  const [model, setModel] = useState<number[]>([]);
  const [pitch, setPitch] = useState<number[]>([]);
  const [originVoicePaths, setOriginVoicePaths] = useState<string[]>([]);
  const [convertList, setConvertList] = useState<boolean[]>([]);
  const [isPlayAll, setIsPlayAll] = useState(false);
  const audioRefs = useRef<HTMLAudioElement[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRefs = useRef<HTMLAudioElement[]>([]);
  
  const getOriginVoiceData = async () => {
    if (params.sourceCode) {
      const res = await getOriginVoices(params.sourceCode);
      setVideoPath(res.videoPath);
      setOriginVoiceList(res.voiceSources);
      setOriginVoicePaths(res.voiceSources.map((el: VoiceData) => {
        return el.voicePath
      }));
      setVoicePaths(res.voiceSources.map((el: VoiceData) => {
        return el.voicePath
      }));
      setModel(Array.from({length: res.voiceSources.length}, () => 0));
      setPitch(Array.from({length: res.voiceSources.length}, () => 0));
      setRecordState(Array.from({length: res.voiceSources.length}, () => 0));
      setAudioURL(Array.from({length: res.voiceSources.length}, () => ''));
      setAudioBlob(Array.from({length: res.voiceSources.length}, () => new Blob()));
      setIsPlay(Array.from({length: res.voiceSources.length}, () => false));
      setConvertList(Array.from({length: res.voiceSources.length}, () => false));
      setIsConverting(Array.from({length: res.voiceSources.length}, () => false));
      audioRefs.current = res.voiceSources.map(() => new Audio());
      mediaRefs.current = res.voiceSources.map(() => new Audio());
    }
  };

  const getVoiceModelData = async () => {
    if (params.sourceCode) {
      const res = await getVoiceModels(params.sourceCode);
      const sortedData = res.voiceModels.sort((a: ModelData, b:ModelData) => {
        if (a.existSource) return -1;
        if (b.existSource) return 1;
        return 0;
      });
      setModelInput(sortedData.map((el: ModelData) => ({
        value: el.modelCode,
        label: el.modelName
      })));
    }
  };

  const getMedia = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      setMediaRecorder(mediaRecorder);
    } catch (err) {
      console.error('오디오 녹음을 위한 장치 접근에 실패했습니다.', err);
      window.alert('오디오 장치가 연결됐는지 확인해주세요');
      navigate(`/dubbing/${params.sourceCode}`);
    }
  };

  const playAll = () => {
    videoRef.current?.play();
    mediaRefs.current.forEach(media => media.play());
    setIsPlayAll(true);
  };

  const stopAll = () => {
    mediaRefs.current.forEach(media => {
      media.pause();
      media.currentTime = 0;
    })

    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setIsPlayAll(false);
  };

  const startRecording = (idx: number) => {
    if (mediaRecorder && videoRef.current) {
      videoRef.current.currentTime = 0;
      mediaRecorder.start();
      videoRef.current?.play();
      mediaRefs.current.forEach((media, i) => {
        if (idx !== i) {
          media.play();
        }
      })
      setRecordState(prev => {
        const newState = [...prev];
        newState[idx] = 1;
        return newState;
      });
    }
  };

  const stopRecording = (idx: number) => {
    if (mediaRecorder) {
      setRecordState(prev => {
        const newState = [...prev];
        newState[idx] = 2;
        return newState;
      });
      mediaRecorder.stop();
      stopAll();

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          setAudioURL(prev => {
            const newState = [...prev];
            newState[idx] = URL.createObjectURL(e.data);
            return newState;
          });
          setAudioBlob(prev => {
            const newState = [...prev];
            newState[idx] = e.data;
            return newState;
          });
        }
      };
    }
  };

  const resetRecording = (idx: number) => {
    stopAll();
    setRecordState(prev => {
      const newState = [...prev];
      newState[idx] = 0;
      return newState;
    });
    setAudioURL(prev => {
      const newState = [...prev];
      newState[idx] = '';
      return newState;
    });
    setAudioBlob(prev => {
      const newState = [...prev];
      newState[idx] = new Blob();
      return newState;
    });
  };

  const playAudio = (idx: number) => {
    if (audioRefs.current[idx]) {
      videoRef.current?.play();
      mediaRefs.current.forEach((media, i) => {
        if (idx !== i) {
          media.play();
        }
      })
      audioRefs.current[idx].play();
      setIsPlay(prev => {
        const newState = [...prev];
        newState[idx] = true;
        return newState;
      });

      audioRefs.current[idx].onended = () => {
        setIsPlay(prev => {
          const newState = [...prev];
          newState[idx] = false;
          return newState;
        });
        stopAll();
      }
    }
  };

  const stopAudio = (idx: number) => {
    stopAll();
    audioRefs.current[idx].pause();
    audioRefs.current[idx].currentTime = 0;
    setIsPlay(prev => {
      const newState = [...prev];
      newState[idx] = false;
      return newState;
    });
  };

  const convertAudio = async (idx: number) => {
    if (convertList[idx]) {
      setConvertList(prev => {
        const newState = [...prev];
        newState[idx] = false;
        return newState;
      });
      setVoicePaths(prev => {
        const newState = [...prev];
        newState[idx] = originVoicePaths[idx];
        return newState;
      });
    } else {
      setIsConverting(prev => {
        const newState = [...prev];
        newState[idx] = true;
        return newState;
      });
      setIsConverted(false);
      setConvertList(prev => {
        const newState = [...prev];
        newState[idx] = true;
        return newState;
      });
  
      if (audioBlob[idx]) {
        const formData = new FormData();
        formData.append("recordFile", audioBlob[idx], `dubbing${params.sourceCode}_voice${idx + 1}.wav`);
        if (params.sourceCode) {
          const uploadRes = await uploadRecord(params.sourceCode, idx + 1, formData);
          const convertRes = await convertRecord(idx + 1, {
            videoSourceCode: parseInt(params.sourceCode),
            modelCode: model[idx],
            voicePath: uploadRes.voicePath,
            pitch: pitch[idx]
          });
          setIsConverting(prev => {
            const newState = [...prev];
            newState[idx] = false;
            return newState;
          });
          setIsConverted(true);
          setVoicePaths(prev => {
            const newState = [...prev];
            newState[idx] = convertRes.voicePath;
            return newState;
          });
        }
      }
    }
  };

  useEffect(() => {
    getOriginVoiceData();
    getVoiceModelData();
    getMedia();
  }, [params.sourceCode])

  useEffect(() => {
    if (audioURL) {
      audioRefs.current = audioRefs.current.map((el, idx) => {
        const newEl = el;
        newEl.src = audioURL[idx];
        return newEl
      });
    }
  }, [audioURL])

  useEffect(() => {
    mediaRefs.current = mediaRefs.current.map((el, idx) => {
      const newEl = el;
      newEl.src = s3URL + voicePaths[idx] + `?${new Date().getTime()}`;
      return newEl;
    })
  }, [voicePaths])

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const createDubbingContents = async () => {
    if (params.sourceCode) {
      const res = await createDubbing({
        videoSourceCode: parseInt(params.sourceCode),
        dubName: title,
        voicePaths
      });
      dispatch(decreaseDubCount());
      navigate(`/dubbing/${params.sourceCode}/${res.dubCode}/edit`);
    }
  }

  return (
    <Container>
      <InputBox>
        <label className="title" htmlFor="title">제목:</label>
        <input className="title-input" onChange={handleTitle} type="text" name="title" id="title" maxLength={40} placeholder="최대 40글자까지 작성 가능합니다" />
      </InputBox>
      <p className="sm-font">* 제목은 필수로 입력해야합니다.</p>
      <VideoBox>
        <video ref={videoRef} src={s3URL + `${videoPath}`} />
      </VideoBox>
      <DubbingBox>
        <div className="flex justify-between">
          <p className="type character-section">캐릭터</p>
          <p className="type record-section">더빙</p>
          <p className="type model-section">음성 모델</p>
          <p className="type pitch-section">피치 조절</p>
          <div className="convert-section"></div>
          <p className="type check-section">목소리 확인</p>
        </div>
        <hr />
        <div className="control-box">
          {
            originVoiceList.map((el, idx) => (
              <div key={el.voiceIndex} className="character">
                <div className="character-section box">
                  <p className="name">{el.voiceName}</p>
                </div>
                <div className="record-section flex justify-center items-center gap-2">
                  {
                    recordState[idx] === 0 &&
                    <StartDubBtn fill="black" onClick={() => startRecording(idx)} className="recordBtn" />
                  }
                  {
                    recordState[idx] === 1 &&
                    <StopDubBtn fill="black" onClick={() => stopRecording(idx)} className="recordBtn" />
                  }
                  {
                    recordState[idx] === 2 &&
                    <>
                      {
                        isPlay[idx] ?
                        <StopDubBtn fill="black" onClick={() => stopAudio(idx)} className="recordBtn" />
                        :
                        <PlayDubBtn fill="black" onClick={() => playAudio(idx)} className="recordBtn" />
                      }
                    </>
                  }
                  {
                    recordState[idx] === 2 && <ReDubBtn fill="black" onClick={() => resetRecording(idx)} />
                  }
                </div>
                <div className="model-section flex justify-center items-center">
                  <Select 
                    value = {
                      modelInput.find((option) => option.value === model[idx])
                    }
                    options={modelInput}
                    onChange={(selectedOption) => setModel(prev => {
                      const newState = [...prev];
                      newState[idx] = selectedOption?.value || 0;
                      return newState;
                    })}
                    placeholder="모델을 선택하세요" 
                    styles={{
                      control: (provided) => ({
                        ...provided,
                        border: "1px solid #d9d9d9",
                        borderRadius: "5px",
                        width: "100%",
                        height: "65%"
                      }),
                      option: (provided) => ({
                        ...provided,
                        fontSize: ".8rem"
                      })
                    }}
                  />
                </div>
                <div className="pitch-section flex justify-center items-center">
                  <input 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setPitch(prev => {
                        const newState = [...prev];
                        newState[idx] = parseInt(e.target.value);
                        return newState
                      })
                    }}
                    className="pitch" 
                    type="number" 
                    min={-12} 
                    max={12} 
                    defaultValue={0} 
                  />
                </div>
                <div className="convert-section flex justify-center items-center">
                  <Button 
                    className="convert-btn"
                    disabled={model[idx] === 0 || audioURL[idx] === "" || isConverting[idx]} 
                    onClick={() => convertAudio(idx)} 
                    $marginLeft={0} 
                    $marginTop={0}
                    $background="#C9F647"
                    $color="black"
                  >
                    {
                      isConverting[idx] ? '변환중' : convertList[idx] ? '초기화' : '변환'
                    }
                  </Button>
                </div>
                <div className="check-section"></div>
              </div>
            ))
          }
          <div className="check-box flex justify-center items-center">
            {
              isConverted && (isPlayAll ?
              <StopDubBtn onClick={stopAll} fill="black" />
              :
              <PlayDubBtn onClick={playAll} fill="black" />)
            }
          </div>
        </div>
        <TooltipBox>
          <div className="w-full flex justify-center items-center">
            <Button onClick={createDubbingContents} disabled={title === ''} $marginLeft={0} $marginTop={1} $width={5.25} $height={2} $color="#C9F647">제작</Button>
          </div>
          {
            title === '' &&
            <p className="tooltip">⚠️ 제목을 적어주세요</p>
          }
        </TooltipBox>
      </DubbingBox>
    </Container>  
  )
}

export default Dubbing;