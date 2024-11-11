import { Fragment, useEffect, useState } from "react";
import MenuDescription from "../MenuDescription";
import styled from "styled-components";
import { getMyDubbings } from "../../../utils/dubbingAPI";
import DubbingCard from "./DubbingCard";

const Container = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;

  .menu {
    width: 100%;
    display: flex;
    border-top: 1px solid black;
    border-bottom: 1px solid #BBBBBB;
    padding: .5rem 1rem;
    justify-content: space-between;
    .content {
      width: 60%;
    }

    .state {
      width: 12%;
      text-align: center;
    }

    .date {
      width: 14%;
      text-align: center;
    }

    .button {
      width: 11.8%;
    }
  }
`;

const List = styled.div`
  height: 21rem;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`

export interface DubbingData {
  dubCode: string;
  dubName: string;
  dubDetail: string;
  createdTime: string;
  thumbnailPath: string;
  isPublic: boolean;
  isComplete: boolean;
  videoSourceCode: number;
  nickname: string;
}

function DubbingList() {
  const [dubbingContents, setDubbingContents] = useState<DubbingData[]>([]);

  const getMyDubbingContents = async () => {
    const res = await getMyDubbings();
    setDubbingContents(res);
  };

  useEffect(() => {
    getMyDubbingContents();
  }, [])

  return (
    <>
       <MenuDescription bigText={"더"} middleText={"빙 컨텐츠"} smallText={"내가 만든 더빙 숏폼"} />
       <Container>
        <div className="menu">
          <p className="content">컨텐츠</p>
          <p className="state">공개 상태</p>
          <p className="date">게시 날짜</p>
          <p className="button"></p>
        </div>
        <List>
          {
            dubbingContents.length ?
            dubbingContents.map(el => (
              <Fragment key={el.dubCode}>
                <DubbingCard data={el} setDubbingContents={setDubbingContents} />
                <hr className="w-full border-black" />
              </Fragment>
            ))
            :
            <div className="w-full flex justify-center items-center grow">
              제작한 컨텐츠가 없습니다.
            </div>
          }
        </List>
       </Container>
    </>
  )
}

export default DubbingList;