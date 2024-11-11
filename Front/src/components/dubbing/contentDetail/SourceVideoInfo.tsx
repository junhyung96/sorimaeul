import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { getSourceVideo } from "../../../utils/dubbingAPI";
import { Button } from "../../common/Button";
import { s3URL } from "../../../utils/s3";
import { useSelector } from "react-redux";
import { RootState } from "../../../stores/store";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 0 auto;
  margin-bottom: 4rem;
  .title {
    font-size: 2rem;
    font-family: 'GmarketSansBold';
    width: 100%;
  }
  .content-box {
    display: flex;
    width: 100%;
    height: 20.25rem;
    gap: 1.125rem;
    .video-box {
      width: 48.8%;
      height: 100%;
      border-radius: 5px;
      overflow: hidden;
      .video {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .info-box {
      width: 49.4%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .subtitle {
        font-size: 1.5rem;
        margin-left: .5rem;
      }
      .descripiton {
        font-size: 1.25rem;
        font-family: 'GmarketSansLight';
        white-space: pre-wrap;
        overflow-wrap: anywhere;
        width: 100%;
        padding: 1rem 2rem;
        border: 1px solid #A3A3A3;
        border-radius: 5px;
        height: 13.5rem;
        overflow-y: auto;

        &::-webkit-scrollbar {
          width: .7rem;
        }

        &::-webkit-scrollbar-thumb {
          background-color: #2f3542;
          border-radius: 10px;
          background-clip: padding-box;
          border: .2rem solid transparent;
        }
      }
      .playtime {
        font-size: 1rem;
      }
      .date {
        font-size: 1rem;
        font-family: 'GmarketSansLight';
      }
    }
  }
`

const TooltipBox = styled.span`
  position: relative;
  height: 2rem;
  .tooltip {
    position: absolute;
    right: 0;
    bottom: -175%;
    padding: .5rem;
    background-color: white;
    color: black;
    font-size: 1rem;
    border-radius: 5px;
    z-index: 10;
    display: none;
    min-width: 20rem;
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

export interface VideoData {
  videoSourceCode: number;
  sourceName: string;
  storagePath: string;
  createdTime: string;
  thumbnailPath: string;
  videoPlaytime: string;
  sourceDetail: string;
}

function SourceVideoInfo() {
  const params = useParams();
  const navigate = useNavigate();
  const dubCount = useSelector((state: RootState) => state.user.dubCount);

  const [videoInfo, setVideoInfo] = useState<VideoData | null>(null);

  const getVideoInfo = async () => {
    if (params.sourceCode) {
      const res = await getSourceVideo(params.sourceCode);
      setVideoInfo(res);
    }
  }

  useEffect(() => {
    getVideoInfo();
  }, [params.sourceCode])

  return (
    videoInfo &&
    <Container>
      <h1 className="title">{videoInfo?.sourceName}</h1>
      <div className="content-box">
        <div className="video-box">
          <video className="video" controls src={s3URL + videoInfo?.storagePath} />
        </div>
        <div className="info-box">
          <div className="flex flex-col gap-2">
            <p className="subtitle">세부 설명</p>
            <div className="descripiton">{videoInfo?.sourceDetail}</div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <p className="playtime">영상 길이: {videoInfo?.videoPlaytime}</p>
              <p className="date">업로드: {videoInfo?.createdTime.split('T')[0]}</p>
            </div>
            <TooltipBox>
              <Button 
                onClick={() => navigate(`/dubbing/${params.sourceCode}/create`)} 
                $marginTop={0} 
                $marginLeft={0} 
                $background="black" 
                $color="#BFFF0A" 
                $width={7} 
                $height={2.5} 
                $fontSize={1.3}
                disabled={dubCount === 0}
              >
                더빙하기
              </Button>
              {dubCount === 0 && <p className="tooltip">⚠️ 잔여 제작 가능 횟수가 0입니다</p>}
            </TooltipBox>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default SourceVideoInfo;