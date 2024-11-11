import styled from "styled-components";
import trophy from "../../../assets/trophy.png";
import { getPopularUserVideo } from "../../../utils/dubbingAPI";
import { Fragment, useEffect, useState } from "react";
import Carousel from "./Carousel";
import { useParams } from "react-router-dom";
import defaultProfile from "../../../assets/profile.png";
import { s3URL } from "../../../utils/s3";


const AwardBox = styled.div`
  width: 100%;
  height: 27rem;
  background: black;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0 3rem;

  .trophy {
    height: 90%;
  }

  .carousel-box {
    width: 44.5%;
    height: 90%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    .award-title {
      font-family: 'Bagel Fat One';
      color: #BFFF0A;
      font-size: 3.125rem;
    }
    .blank {
      width: 100%;
      flex-grow: 1;
      margin: 1rem;
      background: rgba(255, 255, 255, .7);
      border-radius: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`
const RatingBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: .5rem;
  justify-content: center;
  width: 22.8%;

  .title {
    color: #BFFF0A;
    font-family: 'GmarketSansLight';
    font-size: 1.5rem;
    text-align: center;
  }

  .list {
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: space-around;
    background: white;
    height: 13.875rem;
    padding: 1rem;
    border-radius: 10px;
    align-items: center;

    & > div:last-child {
      margin-bottom: auto;
    }

    .name {
      display: flex;
      font-size: 1.3rem;
      width: 90%;
      font-family: 'GmarketSansBold';
      height: 1.6rem;
      align-items: center;
      gap: .5rem;
      white-space: nowrap;
      overflow: hidden;
      p {
        padding-top: .4rem;
      }
      .profile-box {
        height: 1.4rem;
        width: 1.4rem;
        border-radius: 50%;
        overflow: hidden;
        border: .2px solid #A3A3A3;
        .profile {
          height: 100%;
          width: 100%;
        }
      }
    }

    .line {
      height: 1px;
      width: 90%;
      background: #5FD3A8;
    }
  }
`

export interface VideoData {
  dubCode: number;
  dubName: string;
  storagePath: string;
  thumbnailPath: string;
  dubDetail: string;
  nickname: string;
  profileImage: string;
  likeCount: number;
  createdTime: string;
  isLiked: number;
  public: boolean;
}

function SoriAward() {
  const params = useParams();

  const [hotContents, setHotContents] = useState<VideoData[]>([]);

  const getHotContents = async () => {
    if (params.sourceCode) {
      const res = await getPopularUserVideo(params.sourceCode);
      setHotContents(res.dubbings.slice(0, 3));
    }
  }

  useEffect(() => {
    getHotContents();
  }, [])

  return (
    <AwardBox>
        <img className="trophy" src={trophy} alt="trophy" />
        <div className="carousel-box">
          <h3 className="award-title">SORI AWARDS</h3>
          {
            hotContents.length ?
            <Carousel hotContents={hotContents} />
            :
            <div className="blank">아직 생성된 컨텐츠가 없습니다</div>
          }
        </div>
        <RatingBox>
          <p className="title">Best Creators</p>
          <ol className="list">
            {
              hotContents.length ?
                hotContents.slice(0, 3).map((el, idx) => (
                  <Fragment key={el.dubCode}>
                    <li className="name">
                      <p>{idx + 1}. </p> 
                      <div className="profile-box">
                        <img className="profile" src={el.profileImage ? s3URL + el.profileImage : defaultProfile} alt="" /> 
                      </div>
                      <p>{el.nickname}</p>
                    </li>
                    {
                      idx !== hotContents.length - 1 &&
                      <div className="line"></div>
                    }
                  </Fragment>
                ))
              :
              <p>아직 생성된 컨텐츠가 없습니다</p>
            }
          </ol>
        </RatingBox>
      </AwardBox>
  )
}

export default SoriAward;