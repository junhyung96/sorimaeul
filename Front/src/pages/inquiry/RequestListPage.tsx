import ColorLine from "../../components/inquiry/ColorLine";
import SubTitle from "../../components/inquiry/SubTitle";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/common/Button";
import RequestList from "../../components/inquiry/request/RequestList";
import { getRequests } from "../../utils/inquiryAPI";
import { useEffect, useState } from "react";
import Pagination from "../../components/common/Pagination";
import styled from "styled-components";

const Spacer = styled.div`
  width: 4.375rem;
`

export interface RequestData {
  boardCode: number;
  title: string;
  createdTime: string;
}

function RequestListPage() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [requestList, setRequestList] = useState<RequestData[]>([]);

  const getRequestList = async () => {
    const res = await getRequests(page);
    setTotalPages(res.totalPages);
    setRequestList(res.requests);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  useEffect(() => {
    getRequestList();
  }, [page]);

  return (
    <>
      <ColorLine />
      <div className="mx-auto w-9/12 flex flex-col gap-8">
        <div className="flex gap-4 items-center">
          <SubTitle>
            <span className="lg-font">요</span>청 게시판
          </SubTitle>
          <SubTitle><span className="disabled" onClick={() => navigate('/FAQ')}>| 자주 묻는 질문 FAQ</span></SubTitle>
        </div>
        <RequestList data={requestList} />
        <div className="flex justify-between">
          <Spacer />
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} color="#2ABEFF" />
          <Button onClick={() => navigate('/request/create')} $marginLeft={0} $marginTop={0} $width={4.375} $height={2} $background="#28BEFF">글쓰기</Button>
        </div>
      </div>
    </>
  )
}

export default RequestListPage;