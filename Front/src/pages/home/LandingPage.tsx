import styled from "styled-components";
import kakaoBtnImg from "../../assets/kakao_login_large_wide.png";
import googleBtnImg from "../../assets/web_light_sq_ctn@4x.png";
import logoImg from "../../assets/logo.png"
import backgroundVideo from "../../assets/landing.mp4";
import { isProduction } from "../../utils/axios";
import { URL } from "../../utils/axios";

const PageContainer = styled.div`
  min-height: 100vh; 
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 10px;
  position: relative; 
  overflow: hidden; 
`;

const BackgroundVideo = styled.video`
  position: fixed; 
  right: 0;
  bottom: 0;
  min-width: 100%; 
  min-height: 100%; 
  z-index: -2; 
`;

const VideoOverlay = styled.div`
  position: fixed;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8); 
  z-index: -1; 
`;

const LogoContainer = styled.div`
display: flex; 
justify-content: center; 
align-items: center;
margin-bottom: 30px; 

img {
  width: 300px; 
  height: 90px; 
}
`;

const IntroText = styled.div`
font-family: 'PyeongChangPeace-Bold';
color: #FFFFFF;
  font-size: 100px; 
  margin-bottom: 45px; 
  text-align: center; 
  max-width: 80%; 
  display: flex; 
  flex-direction: column; 
  align-items: center; 
`;

const WelcomeText = styled.div`
  color: white; 
  font-size: 24px; 
  margin-bottom: 30px; 
  text-align: center; 
`;

const LoginBtn = styled.div`
  width: 450px;
  height: 60px;
  cursor: pointer;
  margin-bottom: 20px;
  border-radius: 10px;
  background-position: center;
  background-repeat: no-repeat;
`;
const KakaoLoginBtn = styled(LoginBtn)`
  background: url(${kakaoBtnImg}) no-repeat center/cover;
`
const GoogleLoginBtn = styled(LoginBtn)`
  background: url(${googleBtnImg}) no-repeat center/cover;
`;

// 초록, 핑크, 보라
const Highlight = styled.span`
&:hover {
  background: linear-gradient(45deg, #f9d423, #D8F932);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: background 0.3s ease;
}
`;
const Highlight2 = styled.span`
&:hover {
  background: linear-gradient(45deg, #ff758c, #ff7eb3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: background 0.3s ease;
}
`;
const Highlight3 = styled.span`
&:hover {
  background: linear-gradient(45deg, #6a11cb, #2575fc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: background 0.3s ease;
}
`;


const LandingPage: React.FC = () => {
  // kakao - axios 통신을 하면 CORS 에러 발생 
  // 소셜로그인 페이지로 이동하는 요청을 href 링크에 담았다 
  const handleSocialLogin = (provider: string) => {
    let url = `${URL}/oauth/code/${provider}`;
    window.location.href = url;

  };

  return (
    <>

      <PageContainer>
          <BackgroundVideo autoPlay muted loop>
            <source src={backgroundVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </BackgroundVideo>
          <VideoOverlay /> 

        <LogoContainer>
          <img src={logoImg} alt="Logo Image" />
        </LogoContainer>
        <IntroText>
          <span>당신만의 <Highlight>목소리</Highlight>로 </span>
          <span> 세상에 없던 <Highlight2>콘텐츠</Highlight2>를</span>
          <span> <Highlight3>만들어</Highlight3>보세요 .</span>
        </IntroText>
        {/* <WelcomeText>소셜 로그인으로 시작하기</WelcomeText> */}
        <KakaoLoginBtn onClick={() => handleSocialLogin('kakao')} />
        <GoogleLoginBtn onClick={() => handleSocialLogin('google')} />

      </PageContainer>

    </>
  );
};

export default LandingPage;