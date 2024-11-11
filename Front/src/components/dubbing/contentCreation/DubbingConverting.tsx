import Lottie from "lottie-react";
import converting from "../../../assets/lottie/dubbingConverting.json";
import styled from "styled-components";

const Description = styled.div`
  position: absolute;
  width: 50%;
  left: 25%;
  top: 12%;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: .5rem;
  align-items: center;
`

function DubbingConverting () {
  return (
    <div className="flex flex-col items-center justify-center relative">
      <Description>
        <p> 더빙 컨텐츠 제작이 진행 중입니다.</p>
        <p> 컨텐츠 제작은 약 5분 이내에 소요됩니다.</p>
        <p> 변환 중에도 사이트 서비스 이용이 가능합니다!</p>
        <p> 제작 완료 알림을 받고, 다시 커버를 확인해주세요.</p>
      </Description>
      <Lottie 
        animationData={converting}
        style={{width: '50%'}}
      />
    </div>
  )
}

export default DubbingConverting;