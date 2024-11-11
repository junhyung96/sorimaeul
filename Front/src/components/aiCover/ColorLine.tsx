import styled from "styled-components";
import backBtn from "../../assets/backBtn.png";

const ColorBlock = styled.div`
  width: 100%;
  height: 7.2rem;
  background: linear-gradient(90deg, rgba(225, 165, 255, 0.5) 0%, rgba(229, 151, 249, 0.5) 12.97%, rgba(255, 55, 211, 0.5) 100%), #FDFF00;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 2rem;

  .back {
    margin-right: 4rem;
  }
`
function ColorLine() {
  return (
    <ColorBlock>
      <img onClick={() => window.history.back()} className="back" src={backBtn} alt="backButton" />
    </ColorBlock>
  )
}

export default ColorLine;