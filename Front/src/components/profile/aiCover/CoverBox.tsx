import { useEffect, useState } from "react";
import { getMyCovers } from "../../../utils/coverAPI";
import { Cover } from "../../aiCover/CoverInterface";
import { styled } from "styled-components";
import { Button } from "../../common/Button";
import { useNavigate } from "react-router-dom";
import MenuDescription from "../MenuDescription";
import Pagination from "../../common/Pagination";

const CoverContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2.5rem 0;
  gap: 15px;
`;

// 상태에 따른 배경색과 조금 더 진한 강조색 설정
const getStatusColor = ($isComplete: boolean, $isPublic: boolean = false) => {
  if (!$isComplete) return { main: '#ECECEC', dark: '#E3FF92' }; // 미완료(변환중)
  if ($isPublic) return { main: '#fff', dark: '#C9F647' }; // 공개(게시)
  return { main: '#D9D9D9', dark: '#686868' }; // 비공개(미게시)
};

const CoverContent = styled.div<{ $isComplete: boolean; $isPublic?: boolean }>`
  width: 80%;
  height: 60px;
  background: ${({ $isComplete, $isPublic }) => getStatusColor($isComplete, $isPublic).main};
  box-shadow:0 0 5px #CED6D2;
  border-radius: 10px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  overflow: hidden;
  margin-bottom: 1%;
`;

const StatusIndicator = styled.div<{ $isComplete: boolean; $isPublic?: boolean }>`
  display: flex;
  align-items: center;
  &::before {
    content: '';
    display: block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${({ $isComplete, $isPublic }) => getStatusColor($isComplete, $isPublic ?? false).dark};
  }
`;

const StatusDescription = styled.span`
  margin-left: 1rem;
  font-size: 1rem;
  text-align: left;
  display: inline-block;
  width: 60px;
  min-width: 60px;
`;


const CoverInfo = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  overflow: hidden;
  font-family: 'GmarketSansLight';
`;

const CoverText = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 70%;
`;


const CoverDate = styled.div`
  color: #868686;
`;


function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  // getMonth()는 0부터 시작하므로 +1을 해줍니다.
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  
  return `${year}.${month}.${day}`;
}

function CoverBox() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [dataList, setDataList] = useState<Cover[]>([]);

  const getMyAICover = async () => {
    const data = await getMyCovers(page);
    setDataList(data.covers);
    setTotalPages(data.totalPages);
  }

  useEffect(() => {
    getMyAICover();
  }, [page])

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <>
      <MenuDescription bigText={"A"} middleText={"I 커버"} smallText={"내가 만든 AI 커버"} />
      <CoverContainer>

        {dataList && dataList.map((cover) => (
          <CoverContent onClick={() => {
            if (cover.isComplete && cover.isPublic) {
              // 공개(게시) 상태면 상세 조회 페이지로 이동
              navigate(`/cover/${cover.coverCode}`);
            } else {
              // 공개되지 않은 상태(비공개 또는 변환 중)면 게시 정보 설정 및 확인 페이지로 이동
              navigate(`/cover/board/${cover.coverCode}`);
            }
          }} key={cover.coverCode} $isComplete={cover.isComplete} $isPublic={cover.isPublic}>
            <StatusIndicator $isComplete={cover.isComplete} $isPublic={cover.isPublic}>
              <StatusDescription>{cover.isComplete ? (cover.isPublic ? '공개' : '비공개') : '변환중'}</StatusDescription>
            </StatusIndicator>
            <CoverInfo>
              <CoverText> ♪ 커버 제목 : {cover.coverName}  - 커버 가수 : {cover.coverSinger} </CoverText>

              {cover.isComplete ? (<CoverDate>생성일: {formatDate(cover.createdTime)}</CoverDate>) :
                (<></>)
              }

            </CoverInfo>
          </CoverContent>
        ))}
      </CoverContainer>
      <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} color="#BFEA44" />

    </>
  )
}

export default CoverBox;