import styled from "styled-components";

const ColorBlock = styled.div`
  width: 100%;
  height: 11rem;
  background: linear-gradient(90deg, rgba(0, 240, 255, 0.7) 0%, rgba(255, 255, 255, 0.7) 100%), #5546FF;
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`

const Title = styled.h1`
  font-family: "PyeongChangPeace-Bold";
  font-weight: 700;
  font-size: 4rem;
  color: rgba(255, 255, 255, 0.5);
  -webkit-text-stroke: 1px white;
  margin-left: 8rem;
`

function ColorLine() {
  return (
    <ColorBlock>
      <Title>문의 게시판</Title>
    </ColorBlock>
  )
}

export default ColorLine;