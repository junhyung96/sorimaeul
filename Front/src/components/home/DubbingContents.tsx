import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getPopularSourceVideoList } from '../../utils/dubbingAPI';
import { VideoData } from '../../pages/dubbing/DubbingListPage';
import { s3URL } from '../../utils/s3';
import { useNavigate } from 'react-router-dom';

const DubbingContentsWrapper = styled.div`
  padding-top: 10%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  max-width: 1000px;
  margin: auto;
`;

const Card = styled.div`
  position: relative;
  width: 35vh;
  height: 30vh;
  margin: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: 0.3s;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Gradient = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(0, 0, 0, 0) 100%
  );
`;

const SourceName = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 15px;
  font-size: 24px;
  text-align: center;
  color: #ffe928;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: 'GmarketSansBold';
  -webkit-text-stroke: 1px black;
  z-index: 2;
`;

const DubbingContents: React.FC = () => {
  const navigate = useNavigate();
  const [hotVideoList, setHotVideoList] = useState<VideoData[]>([]);
  const getHotVideos = async () => {
    const res = await getPopularSourceVideoList();
    setHotVideoList(res.videoSources);
  };

  useEffect(() => {
    getHotVideos();
  }, []);

  return (
    <>
      <DubbingContentsWrapper>
        {hotVideoList.slice(0, 4).map((video, index) => (
          <Card
            key={index}
            onClick={() => navigate(`/dubbing/${video.videoSourceCode}`)}
          >
            <Thumbnail src={s3URL + video.thumbnailPath} alt="Thumbnail" />
            <Gradient />
            <SourceName>{video.sourceName}</SourceName>
          </Card>
        ))}
      </DubbingContentsWrapper>
    </>
  );
};

export default DubbingContents;
