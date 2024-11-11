import styled from 'styled-components';

export const CategoryBox = styled.div`
  box-sizing: border-box;
  width: 400px;
  height: 85px;
  padding-top: 10px; /* 상단 패딩 추가 */
  background: #ffffff;
  border: 1px solid #000000;

  font-style: normal;
  font-weight: 900;
  font-size: 40px;
  line-height: 55px;
  letter-spacing: 0.05em;
  cursor: pointer; /* 마우스를 올렸을 때 포인터로 변경 */
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PlayBox = styled.div`
  box-sizing: border-box;
  width: 60px;
  height: 45px;
  padding-top: 10px; /* 상단 패딩 추가 */
  background: #ffffff;


  font-style: normal;
  font-weight: 900;
  font-size: 30px;
  line-height: 55px;
  letter-spacing: 0.05em;
  cursor: pointer; /* 마우스를 올렸을 때 포인터로 변경 */
  display: flex;
  justify-content: center;
  align-items: center;
`;
