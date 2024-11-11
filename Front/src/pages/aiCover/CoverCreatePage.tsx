import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router"
import { createCover } from "../../utils/coverAPI";
import { CoverCreateInterface } from "../../components/aiCover/CoverInterface";
import CoverForm from "../../components/aiCover/CoverForm";
import coverBg from "../../assets/coverBg.png";
import { useDispatch } from "react-redux";
import { decreaseCoverCount } from "../../stores/user";

const Container = styled.div`
background: url(${coverBg});
min-height: 100vh;
background-size: cover;
display: flex;
justify-content: center;
align-items: center;
padding: 2rem 0;
`


// 커버 컨텐츠 생성 페이지
const CoverCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false); // 중복 제출 방지용

  // 폼 제출 핸들러
  const handleSubmit = async (formData: CoverCreateInterface) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      // API 호출
      const response = await createCover(formData);
      dispatch(decreaseCoverCount());
      navigate(`/cover/board/${response.coverCode}`);
    } catch (error) {
      console.error(error); // 에러 처리
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <CoverForm onSubmit={handleSubmit} />
    </Container>
  )
}

export default CoverCreatePage;