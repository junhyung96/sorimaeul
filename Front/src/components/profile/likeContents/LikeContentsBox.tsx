import MenuDescription from "../MenuDescription";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../stores/store";
import { setLikeType } from "../../../stores/menu";
import { useEffect, useState } from "react";
import LikeDubbingList from "./dubbing/LikeDubbingList";
import LikeCoverList from "./aiCover/LikeCoverList";

const Container = styled.div`
  width: 100%;
  border-radius: 0.625rem;
  border-top-right-radius: 0;
  border: 1px solid black;
  height: 29.5rem;
  padding: 1rem;
  position: relative;
`

const Tab = styled.div<{ $likeType: string }>`
  position: absolute;
  top: calc(-3rem - 1px);
  right: -1px;
  display: flex;
  height: 3rem;
  border-top-left-radius: 1.5rem;
  border-top-right-radius: 1.5rem;
  overflow: hidden;
  width: 35%;
  gap: -2rem;
  .menu {
    width: 60%;
    height: 100%;
    text-align: center;
    border-top-left-radius: 1.5rem;
    border-top-right-radius: 1.5rem;
  }
  .type {
    font-size: 1.75rem;
    font-family: 'GmarketSansBold';
    padding-top: .3rem;
  }
  .dubbing {
    margin-right: -15%;
    background: ${(props) => props.$likeType === '더빙' ? '#C9F647' : 'black'};
    color: ${(props) => props.$likeType === '더빙' ? 'black' : 'white'};
    z-index: ${(props => props.$likeType === '더빙' ? 2 : 1)};
  }
  .cover {
    background: ${(props) => props.$likeType === '커버' ? '#C9F647' : 'black'};
    color: ${(props) => props.$likeType === '커버' ? 'black' : 'white'};
    z-index: ${(props => props.$likeType === '커버' ? 2 : 1)};
  }
`

function LikeContentsBox() {
  const dispatch = useDispatch();
  const likeType = useSelector((state: RootState) => state.menu.likeType);

  return (
    <>
      <MenuDescription bigText="관" middleText="심 컨텐츠" smallText="모아보기" />
      <Container>
        <Tab $likeType={likeType}>
          <div className="dubbing menu" onClick={() => dispatch(setLikeType("더빙"))}>
            <p className="type">더빙</p>
          </div>
          <div className="cover menu" onClick={() => dispatch(setLikeType("커버"))}>
            <p className="type">커버</p>
          </div>
        </Tab>
        {
          likeType === '더빙' ?
          <LikeDubbingList />
          :
          <LikeCoverList />
        }
      </Container>
    </>
  )
}

export default LikeContentsBox;