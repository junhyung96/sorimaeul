import { useEffect, useState } from 'react';
import {
  getSourceVideoList,
  getPopularSourceVideoList,
} from '../../utils/dubbingAPI';
import styled from 'styled-components';
import DubbingSourceCard from '../../components/dubbing/contentList/DubbingSourceCard';
import Pagination from '../../components/common/Pagination';
import HotDubbingSourceCard from '../../components/dubbing/contentList/HotDubbingSourceCard';

const ColorBlock = styled.div`
  width: 100%;
  height: 11rem;
  background: linear-gradient(
      90deg,
      rgba(253, 255, 0, 0.7) 0%,
      rgba(99, 218, 255, 0.7) 100%
    ),
    #26ba28;
  display: flex;
  align-items: center;
  margin-bottom: 2rem;

  .description {
    font-size: 1.5rem;
    color: white;
    margin-bottom: 0.5rem;
  }
`;

const Title = styled.h1`
  font-family: 'PyeongChangPeace-Bold';
  font-size: 4rem;
  color: rgba(255, 255, 255, 0.5);
  -webkit-text-stroke: 1px white;
`;

const ContentList = styled.div`
  display: flex;
  width: 80%;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 0 auto;
  margin-top: 2rem;
  margin-bottom: 1rem;

  & > div:last-child {
    margin-right: auto;
  }
`;

const HotContentsContainer = styled.div`
  width: 100%;
  height: 15.375rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  .title {
    font-size: 2.5rem;
    font-family: 'GmarketSansBold';
    width: 80%;
  }

  .film {
    background: black;
    height: 11.875rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .line {
      display: flex;
      height: 11%;
      align-items: center;
      overflow: hidden;
      justify-content: space-between;
      .hole {
        width: calc(100% / 92);
        min-width: calc(100% / 92);
        height: 60%;
        background: white;
        border-radius: 3px;
      }
    }
    .video-box {
      width: 100%;
      display: flex;
      height: 78%;
      align-items: center;
      will-change: transform;
      animation: loop 17s linear infinite;
    }
  }

  ::-webkit-scrollbar {
    display: none;
  }

  @keyframes loop {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-100%);
    }
  }
`;

export interface VideoData {
  videoSourceCode: number;
  sourceName: string;
  thumbnailPath: string;
  videoPlaytime: string;
  createdTime: string;
  storagePath: string;
  sourceDetail: string;
}

function DubbingListPage() {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [videoList, setVideoList] = useState<VideoData[]>([]);
  const [hotVideoList, setHotVideoList] = useState<VideoData[]>([]);

  const getSourceVideos = async () => {
    const res = await getSourceVideoList(page);
    setVideoList(res.videoSources);
    setTotalPages(res.totalPages);
  };

  const getHotVideos = async () => {
    const res = await getPopularSourceVideoList();
    setHotVideoList(res.videoSources);
  };

  useEffect(() => {
    getSourceVideos();
  }, [page]);

  useEffect(() => {
    getHotVideos();
  }, []);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <>
      <ColorBlock>
        <div className="flex ml-32 items-end gap-4">
          <Title>더빙 극장</Title>
          <p className="description">영상을 선택한 후, 직접 더빙해보세요!</p>
        </div>
      </ColorBlock>
      <HotContentsContainer>
        <h2 className="title">Hot Contents</h2>
        <div className="film">
          <div className="line">
            {[...new Array(70)].map((_, idx) => (
              <div key={idx} className="hole"></div>
            ))}
          </div>
          <div className="video-box">
            {hotVideoList &&
              [
                ...hotVideoList,
                ...hotVideoList,
              ].map((data, idx) => (
                <HotDubbingSourceCard
                  key={data.videoSourceCode + idx * 100}
                  data={data}
                />
              ))}
          </div>
          <div className="line">
            {[...new Array(70)].map((_, idx) => (
              <div key={idx} className="hole"></div>
            ))}
          </div>
        </div>
      </HotContentsContainer>
      <ContentList>
        {videoList &&
          videoList.map((data) => (
            <DubbingSourceCard key={data.videoSourceCode} data={data} />
          ))}
      </ContentList>
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        color="#26BA28"
      />
    </>
  );
}

export default DubbingListPage;
