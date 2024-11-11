import { useEffect, useState } from "react";
import { Cover } from "../../../aiCover/CoverInterface";
import { getLikeCovers } from "../../../../utils/coverAPI";
import { styled } from "styled-components";
import LikeCoverCard from "./LikeCoverCard";

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

function LikeCoverList() {
  const [coverList, setCoverList] = useState<Cover[]>([]);

  const getLikedCoverList =async () => {
    const res = await getLikeCovers();
    setCoverList(res);
  }

  useEffect(() => {
    getLikedCoverList();
  }, [])
  
  return (
    <Container>
      { coverList && 
      coverList.map(cover => (
        <LikeCoverCard key={cover.coverCode} data={cover}/>
      ))}
    </Container>
  )
}

export default LikeCoverList;