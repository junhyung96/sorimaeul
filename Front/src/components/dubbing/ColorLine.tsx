import styled from "styled-components";
import backBtn from "../../assets/backBtn.png";
import { useLocation, useNavigate } from "react-router-dom";

const ColorBlock = styled.div`
  width: 100%;
  height: 7.2rem;
  background: linear-gradient(90deg, rgba(253, 255, 0, 0.7) 0%, rgba(99, 218, 255, 0.7) 100%), #26BA28;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 2rem;

  .back {
    margin-right: 4rem;
  }
`

function ColorLine() {
  const navigate = useNavigate();
  const location = useLocation();

  const goBack = () => {
    const paths = location.pathname.split('/').filter(Boolean);

    if (paths.length) {
      paths.pop();
    }

    navigate('/' + paths.join('/'));
  };

  return (
    <ColorBlock>
      <img onClick={goBack} className="back" src={backBtn} alt="backButton" />
    </ColorBlock>
  )
}

export default ColorLine;