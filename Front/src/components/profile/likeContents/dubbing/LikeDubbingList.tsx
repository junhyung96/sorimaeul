import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../../../stores/store";
import { useEffect, useState } from "react";
import { getLikedDubbings } from "../../../../utils/dubbingAPI";
import { DubbingData } from "../../dubbing/DubbingList";
import LikeDubbingCard from "./LikeDubbingCard";

const Container = styled.div`
  padding: 1rem;
  overflow-y: auto;
  height: 100%;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  & > div:last-child {
    margin-right: auto;
  }
`

function LikeDubbingList() {
  const [dubbingList, setDubbingList] = useState<DubbingData[]>([]);

  const getLikedDubbingList = async () => {
    const res = await getLikedDubbings();
    setDubbingList(res);
  }

  useEffect(() => {
    getLikedDubbingList();
  }, [])

  return (
    <Container>
      {
        dubbingList &&
        dubbingList.map(el => (
          <LikeDubbingCard key={el.dubCode} data={el} />
        ))
      }
    </Container>
  )
}

export default LikeDubbingList;