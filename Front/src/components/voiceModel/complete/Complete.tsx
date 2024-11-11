import styled from "styled-components";
import dubbing from "../../../assets/dubbingModel.png";
import cover from "../../../assets/coverModel.png";
import setting from "../../../assets/settingModel.png";
import { useNavigate, useParams } from "react-router-dom";

const Container = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 80%;
  margin: 0 auto;

  .bold {
    font-family: 'GmarketSansBold';
  }

  .big-font {
    font-size: 3rem;
  }
`

const MenuBox = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;

  .menu {
    width: 30%;
    border-radius: 1.5rem;
    background-color: rgba(234, 217, 255, 0.5);
    height: 0;
    padding-bottom: 30%;
    position: relative;
    .box {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      position: absolute;
      .type {
        font-size: 1.15rem;
      }
      .img {
        width: 65%;
        height: 65%;
      }
    }
  }
`

function Complete() {
  const navigate = useNavigate();
  const params = useParams();

  return (
    <Container>
      <p className="bold big-font">음성 학습이 완료되었습니다.</p>
      <p>축하합니다! 생성된 음성 모델은 마이페이지에서 확인 가능합니다.</p>
      <p>음성 모델로 나만의 <span className="bold">더빙 영상</span>을 만들거나 <span className="bold">AI 커버</span>를 만들어보세요</p>
      <MenuBox>
        <div className="menu" onClick={() => navigate('/dubbing')}>
          <div className="box">
            <p className="type">더빙 영상 제작하기</p>
            <img src={dubbing} className="img" />
          </div>
        </div>
        <div className="menu" onClick={() => navigate(`/model/${params.code}/edit`)}>
          <div className="box">
            <p className="type">내 음성 모델 관리</p>
            <img src={setting} className="img" />
          </div>
        </div>
        <div className="menu" onClick={() => navigate('/cover')}>
          <div className="box">
            <p className="type">AI 커버 제작하기</p>
            <img src={cover} alt="" className="img" />
          </div>
        </div>
      </MenuBox>
    </Container>
  )
}

export default Complete;