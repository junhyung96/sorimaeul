import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CoverPostForm from "../../components/aiCover/CoverPostForm";
import { CoverResultInterface } from "../../components/aiCover/CoverInterface";
import { getCover, updateCover } from "../../utils/coverAPI";
import CoverConverting from "../../components/aiCover/CoverConverting";
import { CoverInfo } from "../../components/profile/playlist/PlaylistDetailModal";
import { styled } from "styled-components";
import ColorLine from "../../components/aiCover/ColorLine";


// 커버 컨텐츠 결과 확인 및 게시 정보 설정 페이지
const CoverResultPage: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [data, setData] = useState<CoverResultInterface | null>(null);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const coverCode = params.id;

  useEffect(() => {
    // 변환 완료 여부 확인
    (async () => {
      try {
        if (coverCode) {
          const res = await getCover(coverCode);
          setIsCompleted(res.isComplete);
          if (res.isComplete) {
            setData({ ...res, coverCode: coverCode });
          }
        }
      } catch (err) {
        console.error(err);
      }
    })();
  }, [coverCode]); // coverCode가 변경될 때마다 useEffect를 다시 실행

  const handleSubmit = async (formData: CoverResultInterface) => {
    try {
      // 폼 제출 핸들러
      if (coverCode) {
        const updatedData = await updateCover(coverCode, formData);
        setData(updatedData);
        navigate(`/cover/${coverCode}`);
      }
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <>
      {isCompleted ? (
        <CoverPostForm onSubmit={handleSubmit} initialData={data} />
      ) : (
        <CoverConverting />
      )}
    </>
  );
};

export default CoverResultPage;
