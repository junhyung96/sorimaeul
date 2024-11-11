import Lottie from 'lottie-react';
import styled from 'styled-components';
import converting from '../../assets/lottie/coverConverting.json';

const Explain = styled.div`
  text-align: center;
  font-size: 24px;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
`;

const Block = styled.div`
  height: 350px;
`;

function CoverConverting() {
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <Lottie animationData={converting} />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Explain>
          <p>AI 커버 컨텐츠 제작이 진행 중입니다.</p>
          <p>커버 변환에는 약 1분의 시간이 소요됩니다.</p>
          <Block />
          <p>변환 중에도 사이트 서비스 이용이 가능합니다!</p>
          <p>제작 완료 알림을 받고, 다시 커버를 확인해주세요.</p>
        </Explain>
      </div>
    </div>
  );
}

export default CoverConverting;
