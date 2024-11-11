import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { CategoryBox, PlayBox } from '../../components/home/HomeStyles';
import goBtnImg from '../../assets/goBtn.png';
import { Link, useNavigate } from 'react-router-dom';
import tape from '../../assets/tape.png';
import tape2 from '../../assets/tape2.png';
import album1 from '../../assets/album1.jpg';
import album2 from '../../assets/album2.jpg';
import album3 from '../../assets/album3.jpg';
import album4 from '../../assets/album4.jpg';
import MarqueeComponent from '../../components/home/MarqueeComponent';
import DubbingContents from '../../components/home/DubbingContents';
import { useLocation } from 'react-router-dom';
import mainVoice from '../../assets/mainVoice.png';
import mainDub from "../../assets/mainDub.png";
import mainCover from "../../assets/mainCover.png";
import { FadeIn } from '../../components/animation/FadeComponent';
import { motion } from 'framer-motion';
import { RootState } from '../../stores/store';
import { useSelector } from 'react-redux';

const Outer = styled.div`
  height: 100vh;
  overflow-y: hidden;
  overflow-x: hidden; /* 가로 스크롤바 방지 */
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Page1 = styled.div`
  height: calc(100vh - 0px);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background: linear-gradient(199.09deg, rgba(253, 255, 0, 0.119) -67.25%, rgba(255, 255, 255, 0.7) 87.08%), #C9F647;
`;

const CircleContainer = styled(motion.div)`
  padding: 20px; /* 그림자가 잘리지 않도록 padding 추가 */
  margin: -20px; /* padding으로 인한 컨테이너 크기 증가를 상쇄 */
  width: calc(90% - 40px); /* padding을 고려한 실제 너비 조정 */
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
`;

interface CircleProps {
  $size: string;
  $hoverBackground: string;
}

const TextInside = styled.div`
  position: absolute;
  top: 55%;
  font-family: 'GmarketSansBold';
  font-size: 40px;
  margin-top: 30px; 
  text-align: center;
`;

const TextUnder = styled.div`
  position: absolute;
  top: 70%;
  font-size: 25px;
  margin-top: 30px; 
  text-align: center;
`;

const Circle = styled.div<CircleProps>`
  width: ${props => props.$size};
  height: 400px;
  padding-top: ${props => props.$size};
  border-radius: 20%;
  background: #F3F4F6;
  position: relative;
  margin: 0 20px;
  box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column; 
  transition: background 0.5s ease;
  &:hover {
    background: ${props => props.$hoverBackground}
  }
  cursor: pointer;
`;

const IconImage = styled.img`
  position: absolute;
  top: 10%;
  width: 50%; 
  height: auto;
`;



const Page1Text = styled.div`
  position: absolute;
  top: 80px;
  left: 50%; 
  transform: translateX(-50%);
  font-size: 45px;
  font-family: 'PyeongChangPeace-Bold';
`;

const Page2 = styled.div`
  overflow-x: hidden;
  width: 100%;
  height: 100vh;
  display: flex;
  background: linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), linear-gradient(176.44deg, rgba(0, 240, 255, 0.7) 2.93%, rgba(255, 255, 255, 0.7) 51.76%), #5546FF;
`;
const GoBtnImg = styled.img`
  position: absolute;
  left: 30px;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: auto;
`;

interface MarginProps {
  $marginTop?: number;
  $marginRight?: number;
}


const BackgroundTape = styled.img<MarginProps>`
  position: absolute;
  margin-top: ${(props) =>
    props.$marginTop ? `${props.$marginTop}px` : '75px'};
  margin-right: ${(props) =>
    props.$marginRight ? `${props.$marginRight}px` : '100px'};
  width: '435px';
  height: 'auto';
`;

const RightAlignedContainer = styled.div`
  display: flex;
  padding-right: 20px;
  width: 90%;
  position: relative;
  margin: 0 auto;
  margin-top: 2rem;
  margin-bottom: 1rem;
`;

const DubContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
`;

const DubTextContainer = styled.div`
  flex: 0.8;
  margin-right: auto;
`;

const DubText = styled.div`
  font-size: 10vh;
  font-family: 'PyeongChangPeace-Bold';
`;

const DubSubtext = styled.div`
  margin-top: 18%;
  margin-bottom: 2%;
  width: 600px;
  line-height: 63px;
  font-size: 35px;
  font-family: GmarketSansLight;
`;

const DubbingCategory = styled(CategoryBox)`
  position: absolute;
  margin-top: 60px;
  margin-left: 320px;
  z-index: 2;
`;

const CategoryDescription = styled.p`
  position: absolute;
  margin-top: 125px;
  margin-left: 500px;
  font-size: 35px;
  width: 600px;
  line-height: 63px;
  font-family: GmarketSansLight;
`;

const Page3 = styled.div`
  position: relative;
  height: 100vh;
  width: 100%;
  display: flex;
  background: linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), linear-gradient(181.35deg, rgba(24, 38, 157, 0.7) -9.39%, rgba(255, 120, 217, 0.7) 119.24%), linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), linear-gradient(181.35deg, rgba(235, 0, 255, 0.7) -9.39%, rgba(255, 255, 255, 0.7) 119.24%), #6D9FFF;

`;

const Temp = styled.div`
  display: flex;
  margin-left: 60px;
`;

const CoverCategory = styled(CategoryBox)`
  position: absolute;
  margin-top: 90px;
  margin-right: 300px;
  z-index: 2;
`;

const ImagesContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  padding-left: 70px;
`;

interface ImageInterface {
  $rotation: string;
  $width: string;
}

const StyledImage = styled.img<ImageInterface>`
  display: flex;
  height: auto;
  border-radius: 10px;
  transform: rotate(${(props) => props.$rotation || '0deg'});
  width: ${(props) => props.$width};
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.25);
  transition: transform 0.5s ease-in-out; /* 부드러운 변환 효과 */
  &:hover {
    transform: rotate(${props => parseFloat(props.$rotation) + 10 + 'deg'}); /* 호버 시 추가 회전 */
  }
`;

const MarqueeComponentStyled = styled.div`
  position: absolute;
  bottom: 0;
  margin-left: -60px;
  height: auto;
  width: 100%;
`;

const PlayButton = styled(PlayBox)`
  position: absolute;
  top: 150px; /* 상단에서 20px의 여백 */
  right: 20px; /* 우측에서 20px의 여백 */
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  z-index: 10;
`;

interface TextLineInterface {
  $height?: number;
  $margin?: number;
}

const TextLine = styled.div<TextLineInterface>`
  height: ${(props) => (props.$height ? `${props.$height}px` : '1px')};
  background-color: #000;
`;

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const DIVIDER_HEIGHT = 5;
  const outerDivRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태 관리
  const coverCount = useSelector((state: RootState) => state.user.coverCount);

  useEffect(() => {
    const wheelHandler = (e: WheelEvent) => {
      e.preventDefault();
      if (!outerDivRef.current) return;

      const { deltaY } = e;
      const { scrollTop } = outerDivRef.current;
      const pageHeight = window.innerHeight;

      if (deltaY > 0) {
        // 스크롤 내릴 때
        if (scrollTop >= 0 && scrollTop < pageHeight) {
          outerDivRef.current.scrollTo({
            top: pageHeight + DIVIDER_HEIGHT,
            left: 0,
            behavior: 'smooth',
          });
          setCurrentPage(2);
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          outerDivRef.current.scrollTo({
            top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
            left: 0,
            behavior: 'smooth',
          });
          setCurrentPage(3);
        }
      } else {
        // 스크롤 올릴 때
        if (scrollTop >= 0 && scrollTop < pageHeight) {
          // 현재 1페이지
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          outerDivRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
          });
          setCurrentPage(1);
        } else {
          outerDivRef.current.scrollTo({
            top: pageHeight + DIVIDER_HEIGHT,
            left: 0,
            behavior: 'smooth',
          });
          setCurrentPage(2);
        }
      }
    };

    const outerDivRefCurrent = outerDivRef.current;
    if (outerDivRefCurrent) {
      outerDivRefCurrent.addEventListener('wheel', wheelHandler);
    }
    return () => {
      if (outerDivRefCurrent) {
        outerDivRefCurrent.removeEventListener('wheel', wheelHandler);
      }
    };
  }, []);

  const location = useLocation();

  const handleScrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
    });
  };

  useEffect(() => {
    if (location.pathname === '/') {
      handleScrollToBottom();
    }
  }, [location]);

  const [scrollUp, setScrollUp] = useState(false);

  const MusicClick = () => {
    if (scrollUp) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
    setScrollUp(!scrollUp);
  };

  return (
    <Outer ref={outerDivRef}>
      <PlayButton onClick={MusicClick}>🎵</PlayButton>
      <Page1>
        <FadeIn>
          <Page1Text>소리마을에서 Creator가 되어보세요!</Page1Text>
        </FadeIn>
        <CircleContainer
          initial={{ y: '100vh' }}
          animate={{ y: 0 }}
          transition={{ duration: 1.5, type: 'spring' }}>
          <Circle $size="27%"
            $hoverBackground="linear-gradient(90deg, rgba(253, 255, 0, 0.7) 0%, rgba(99, 218, 255, 0.7) 100%), #26BA28"
            onClick={() => navigate('dubbing')}>
            <IconImage src={mainDub} alt="dub icon" />
            <TextInside>더빙 </TextInside>
            <TextUnder>재밌는 동영상<br /> 내 맘대로 더빙해요!</TextUnder>
          </Circle>
          <Circle $size="33%"
            $hoverBackground="linear-gradient(181.35deg, rgba(24, 38, 157, 0.7) -9.39%, rgba(255, 120, 217, 0.7) 119.24%), linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), linear-gradient(181.35deg, rgba(235, 0, 255, 0.7) -9.39%, rgba(255, 255, 255, 0.7) 119.24%), #6D9FFF;"
            onClick={() => navigate('/model/create')}>
            <IconImage src={mainVoice} alt="voice train icon" />
            <TextInside>음성 학습 </TextInside>
            <TextUnder>딱 20분 녹음하고<br />내 목소리 모델을 만들어요!</TextUnder>
          </Circle>
          <Circle $size="27%"
            $hoverBackground="linear-gradient(90deg, rgba(255, 200, 200, 0.5) 0%, rgba(255, 154, 158, 0.5) 100%), #FFD700"
            onClick={() => navigate('/cover')}>
            <IconImage src={mainCover} alt="cover icon" />
            <TextInside>커버</TextInside>
            <TextUnder>클릭 한번으로<br />AI 커버 만들어요!</TextUnder>
          </Circle>
        </CircleContainer>

      </Page1>
      <Page2>
        <RightAlignedContainer>
          <DubTextContainer>
            <DubSubtext>원하는 영상을 마음껏 더빙해봐요!</DubSubtext>
            <DubText>
              인기 컨텐츠를<br /> 더빙하고<br />
              소리 어워드에<br /> 도전해보세요!</DubText>
          </DubTextContainer>
          <DubContainer>
            <DubbingCategory onClick={() => navigate('/dubbing')}>
              더빙 극장
              <GoBtnImg src={goBtnImg} alt="Button Image" />
            </DubbingCategory>
            <DubbingContents />

            <BackgroundTape
              src={tape}
              alt="Tape Image"
              $marginTop={105}
              style={{ marginLeft: '310px' }}
            />
          </DubContainer>
        </RightAlignedContainer>
      </Page2>
      <Page3>
        <Temp>
          <CoverCategory onClick={() => navigate('/cover')}>
            AI 커버
            <GoBtnImg src={goBtnImg} alt="Button Image" />
          </CoverCategory>
          <CategoryDescription>
            나만의 AI 커버 송을 만들어 보세요!
          </CategoryDescription>
          <BackgroundTape src={tape2} alt="Tape Image" $marginTop={125} />
          <ImagesContainer>
            <StyledImage
              $rotation="-7.7deg"
              $width="22%"
              src={album1}
              alt="AI Cover image1"
            />
            <StyledImage
              $rotation="4.74deg"
              $width="22%"
              src={album2}
              alt="AI Cover image2"
            />
            <StyledImage
              $rotation="-8.2deg"
              $width="22%"
              src={album3}
              alt="AI Cover image3"
            />
            <StyledImage
              $rotation="11.5deg"
              $width="22%"
              src={album4}
              alt="AI Cover image4"
            />
          </ImagesContainer>
          <MarqueeComponentStyled>
            <TextLine $height={5} className="my-3" />
            <TextLine />
            <MarqueeComponent />
            <TextLine className="my-3" />
            <TextLine $height={5} className="my-2" />
          </MarqueeComponentStyled>
        </Temp>
      </Page3>
    </Outer>
  );
};

export default HomePage;
