import React from 'react';
import styled, { keyframes } from 'styled-components';

const SentenceOne = styled.span`
  font-family: "Yeseva One";
`;

const SentenceTwo = styled.span`
  font-family: 'Bebas Neue';
`;

const SentenceThree = styled.span`
font-family: "Inter", sans-serif;
`;


const SentenceFive = styled.span`
  font-family: "Lexend Tera";
`;
// keyframes를 사용하여 marquee 애니메이션 정의
const marquee = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
`;

// styled-components를 사용하여 스타일 적용
const AnimatedTitle = styled.div`
  font-size: 55px;
  font-weight: 300;
  position: relative;
  width: 100%;
  max-width: 100%;
  height: auto;
  padding: 30px 0;
  overflow-x: hidden;
  overflow-y: hidden;
`;

const Track = styled.div`
  position: absolute;
  white-space: nowrap;
  will-change: transform;
  animation: ${marquee} 60s linear infinite;
`;

const Content = styled.div`
  @media (hover: hover) and (min-width: 700px) {
    transform: translateY(calc(100% - 8rem));
  }
`;

// 컴포넌트 생성
const MarqueeComponent: React.FC = () => {
  return (
    <AnimatedTitle>
      <Track>
        <Content>
          <SentenceOne>&nbsp;E201 Team Usagi :</SentenceOne> 
          <SentenceOne>&nbsp;K J M - Kang Ju won - Park Minho - S Y J - Bae Jun Hyeong - T Y H</SentenceOne>
          <SentenceThree>&nbsp; * Create Your Own Content Easily </SentenceThree> 
          <SentenceTwo>&nbsp;* With Sorimaeul You can experience infinite fun * </SentenceTwo>
          <SentenceFive>&nbsp;Make YOUR Voice Model *</SentenceFive> 
          <SentenceOne>&nbsp;With Sorimaeul You can be a creator!</SentenceOne>
          </Content>
      </Track>
    </AnimatedTitle>
  );
};

export default MarqueeComponent;
