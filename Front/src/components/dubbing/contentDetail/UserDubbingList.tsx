import { useEffect, useState } from "react";
import { getUserVideos } from "../../../utils/dubbingAPI";
import { VideoData } from "./SoriAward";
import UserDubbingCard from "./UserDubbingCard";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import Pagination from "../../common/Pagination";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 2rem 0;
`

const List = styled.div`
  display: flex;
  width: 80%;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 0 auto;

  & > div:last-child {
    margin-right: auto;
  }
`

function UserDubbingList() {
  const params = useParams();
  
  const [page, setPage] = useState(1);
  const [userVideoList, setUserVideoList] = useState<VideoData[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  const getUserVideoList = async () => {
    if (params.sourceCode) {
      const res = await getUserVideos(page, params.sourceCode);
      setUserVideoList(res.dubbings);
      setTotalPages(res.totalPages);
    }
  }

  useEffect(() => {
    getUserVideoList();
  }, [page])

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <Container>
      <List>
        {
          userVideoList.map((el) => (
            <UserDubbingCard key={el.dubCode} videoData={el} />
          ))
        }
      </List>
      {
        totalPages ?
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} color="#26BA28" />
        :
        <></>
      }
    </Container>
  )
}

export default UserDubbingList;