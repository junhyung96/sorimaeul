import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { checkNickname, signUp } from "../../utils/userAPI";
import { login, set } from "../../stores/user";
import { requestS3 } from "../../utils/s3";
import styled from 'styled-components';
import Gradient from "./Gradient";
import { Button } from "../common/Button";
import logoImg from "../../assets/logo.png";

const FormContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.5); 
  border-radius: 25px;
  padding: 20px;
  width: 90%;
  max-width: 700px;
  height: 730px;
`;

const LogoImage = styled.img`
  position: absolute; 
  top: 20px;
  left: 50%; 
  transform: translateX(-50%); 
  z-index: 1000;
  width: 250px; 
  height: auto; 
`;

const FormTitle = styled.h2`
  padding: 30px;
  color: white;
  text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  font-family: 'GmarketSansBold';
  font-size: 35px;
  text-align: center;
`;

const NicknameContainer = styled.div`
  display: flex;
  justify-content: center; 
  align-items: center; 
  gap: 20px; 
  margin-bottom: 20px; 
`;

const SubmitButtonContainer = styled.div`
  display: flex;
  justify-content: center; 
  width: 100%; 
`;
const NicknameTitle = styled.label`
  color: white;
  font-size: 30px;
  text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
`;


// 입력 필드 스타일
const InputField = styled.input`
  padding: 10px; 
  font-size: 16px;
  width: 50%; 
  margin: 5px 0; 
  border: 1px solid #CECECE;
  border-radius: 5px;
`;


interface ProfileImageProps {
  image?: string;
}

const ProfileImage = styled.div<ProfileImageProps>`
  display: inline-block;
  background-image: url(${props => props.image});
  background-color: ${props => props.image ? 'rgba(255, 255, 255, 0.5)' : 'white'};
  background-size: cover;
  border-radius: 150px; 
  border: 1px solid #FFFFFF;
  width: 300px; 
  height: 300px;
  line-height: 200px; 
  text-align: center;
  margin: 10px 0;
  cursor: pointer;
  font-size: 16px; 
  color: black;

  &:hover{
    background-color:
  }
`;

// 간격 주는 용도
const Divider = styled.div`
  height: 30px; 
  width: 100%;
`;


function SignUpForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputNickname, setInputNickname] = useState(""); // 입력된 닉네임을 저장할 상태
  const [imagePath, setImagePath] = useState("");
  const [selectedImagePath, setSelectedImagePath] = useState("");
  const [isValidNickname, setIsValidNickname] = useState(false);

  const handleNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputNickname(e.target.value);
    setIsValidNickname(false);
  };

  const handleImagePath = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImagePath((reader.result as string));
      };
      reader.readAsDataURL(file);
      try {
        const uploadedImageUrl = await requestS3({
          filename: file.name.replace(/\.[^/.]+$/, ''),
          file: file,
        })
        if (uploadedImageUrl) {
          setImagePath(uploadedImageUrl);
        } else {
          console.error("Error: Uploaded image URL is undefined");
        }
      } catch (err) {
        console.error("Error:", err);
      }
    }
  };

  const onClickCheckNickname = async (e: { preventDefault: () => void; }) => {
    e.preventDefault(); // 폼의 제출을 방지합니다.
    const response = await checkNickname(inputNickname);

    if (response === 0) {
      setIsValidNickname(true);
    } else if (response === 1) {
      setIsValidNickname(false);
      alert("이미 사용 중인 닉네임입니다.");
    }
  };

  // 회원 정보 등록 
  const submitHandler = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (isValidNickname) { // 중복 제출 방지 조건 추가
      try {
        const res = await signUp(inputNickname, imagePath);
        // 회원 가입 성공 시 redux store 로그인 상태 반영 후 홈페이지로 이동
        if (res?.status === 201) {
          dispatch(login());
          dispatch(set({ nickname: inputNickname, profileImage: imagePath }));
          navigate('/');
        }
      } catch (error) {
        console.error("회원 가입 실패", error);
      }
    }
  };


  return (
    <Gradient>
      <LogoImage src={logoImg} alt="Logo Image" />
      <FormContainer>
        <FormTitle>회원 정보 기입</FormTitle>
        <form onSubmit={submitHandler}>
          <div className="flex flex-col items-center">
            <label htmlFor="file" className="cursor-pointer">
              {selectedImagePath ? (
                <ProfileImage image={selectedImagePath}></ProfileImage>
              ) : (
                <ProfileImage>프로필 사진 올리기</ProfileImage>
              )}
            </label>
            <input type="file" id="file" accept="image/*" onChange={handleImagePath} className="hidden" />
            <Divider />
          </div>
          <NicknameContainer>
            <NicknameTitle>닉네임:</NicknameTitle>
            <InputField type="text" value={inputNickname} onChange={handleNickname} />
            <Button onClick={onClickCheckNickname}  $fontFamily='GmarketSansLight' $fontSize={1.2} $marginLeft={0} $marginTop={0}>중복 확인</Button>
      
          </NicknameContainer>
          <SubmitButtonContainer>
            <Button type="submit" $fontFamily='GmarketSansLight' $fontSize={1.2} $width={5} $height={2.5} $marginLeft={0} $marginTop={0} disabled={!inputNickname || !isValidNickname}>등록</Button>
          </SubmitButtonContainer>
        </form>
      </FormContainer>
    </Gradient>
  )

}

export default SignUpForm;