import styled from "styled-components";

const ColorBlock = styled.div`
  width: 100%;
  height: 11rem;
  background: linear-gradient(90deg, rgba(253, 255, 0, 0.119) 0%, rgba(255, 255, 255, 0.7) 100%), #C9F647;
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`

const Title = styled.h1`
  font-family: "PyeongChangPeace-Bold";
  font-size: 4rem;
  color: rgba(255, 255, 255, 0.5);
  -webkit-text-stroke: 1px white;
  margin-left: 8rem;
`

function ColorLine() {
  return (
    <ColorBlock>
      <Title>마이 페이지</Title>
    </ColorBlock>
  )
}

export default ColorLine;