import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Button } from "../common/Button";
import { RootState } from "../../stores/store";
import { checkNickname, editUserInfo } from "../../utils/userAPI";
import { set } from "../../stores/user";
import { requestS3, s3URL } from "../../utils/s3";
import defaultProfile from "../../assets/profile.png";
import imgEditor from "../../assets/ImgEditor.png";

interface ProfileImageProps {
  $image: string;
}

const ProfileArea = styled.div`
position: relative;
width: 100%;
height: auto;
display: inline-block;
`;

const ProfileImage = styled.div<ProfileImageProps>`
  background-image: url(${props => props.$image});
  width: 100%;
  height: 0;
  padding-bottom: 100%; 
  border-radius: 50%; 
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.4);
  background-size: cover;
  background-position: center;
`;

const EditIcon = styled.img`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  width: 15%;
  cursor: pointer;
`

const NicknameContainer = styled.div`
  display: flex;
  align-items: center; 
  justify-content: center; 
  padding-top: .25rem;
  input {
    width: 95%;
  }
`;

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1rem;
`;

// 닉네임 중복 확인 문구 스타일
const NicknameCheckMessage = styled.p`
  color: #A3A3A3 ;
`;

const FlexContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start; // 버튼과 닉네임을 수직 방향으로 가운데 정렬
  justify-content: space-between; // 요소들 사이에 공간을 균등하게 배분
`;

const Line = styled.hr`
margin-bottom: 1rem; 
border: 0;
height: 1px; 
background-color: #ccc; 
`

function UserEditor() {
  const dispatch = useDispatch();
  const { nickname, profileImage, learnCount } = useSelector((state: RootState) => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [newNickname, setNewNickname] = useState(nickname);
  const [isCheckingNickname, setIsCheckingNickname] = useState(false);
  const [isValidNickname, setIsValidNickname] = useState(true);
  const [selectedImagePath, setSelectedImagePath] = useState('');
  const [newProfileImg, setNewProfileImg] = useState(profileImage);

  // 디바운싱으로 닉네임 중복 체크 
  useEffect(() => {
    if (newNickname && newNickname !== nickname) {
      const handler = setTimeout(() => {
        setIsCheckingNickname(true);
        checkNickname(newNickname).then(response => {
          setIsValidNickname(response === 0);
          setIsCheckingNickname(false);
        }).catch(error => {
          console.error("닉네임 중복 체크 중 오류 발생:", error);
          setIsCheckingNickname(false);
        });
      }, 500);
  
      return () => clearTimeout(handler);
    }
  }, [newNickname, nickname]);

  const handleNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewNickname(e.target.value);
  };

  const handleImagePath = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImagePath(reader.result as string);
      };
      reader.readAsDataURL(file);

      try {
        const uploadedImageUrl = await requestS3({
          filename: file.name.replace(/\.[^/.]+$/, ''),
          file: file,
        });
        setNewProfileImg(uploadedImageUrl);
      } catch (err) {
        console.error("Error:", err);
      }
    }
  };

  const handleEdit = () => {
    if (isEditing && (newNickname !== nickname || newProfileImg !== profileImage)) {
      editUserInfo(newNickname, newProfileImg).then(() => {
        dispatch(set({ nickname: newNickname, profileImage: newProfileImg, learnCount }));
      }).catch(err => {
        console.error("회원 정보 수정 실패", err);
      });
    }
    setIsEditing(!isEditing); // 수정 상태 토글
  };


  return (
    <LayoutContainer>
      {isEditing ? (
        <>
          <label htmlFor="file" className="cursor-pointer">
            <ProfileArea>
            <ProfileImage $image={ selectedImagePath? selectedImagePath :(profileImage ? s3URL + profileImage : defaultProfile)}></ProfileImage>
            <EditIcon src={imgEditor}/>
            </ProfileArea>
          </label>
          <input type="file" id="file" accept="image/*" onChange={handleImagePath} className="hidden" />
        </>
        ) : (
        <>
          <ProfileImage $image={ profileImage? s3URL + profileImage : defaultProfile} />
        </>
      )}
      <FlexContainer>
        <NicknameContainer>
          {isEditing ? (
            <>
              <input
                type="text"
                value={newNickname}
                onChange={handleNickname}
                placeholder="닉네임 입력"
              />
            </>
          ) : (
            <p>{nickname}</p>
          )}
        </NicknameContainer>
        <Button $marginLeft={0} $marginTop={0} onClick={handleEdit}>
          {isEditing ? "변경" : "수정"}
        </Button>
      </FlexContainer>
      {
        isEditing &&
        <NicknameCheckMessage>
          {isCheckingNickname && "닉네임 중복 확인 중..."}
          {!isCheckingNickname && !isValidNickname && newNickname && "이미 사용 중인 닉네임입니다."}
          {!isCheckingNickname && isValidNickname && "사용 가능한 닉네임입니다."}
        </NicknameCheckMessage>
      }
      <Line />
    </LayoutContainer>
  );
}

export default UserEditor;