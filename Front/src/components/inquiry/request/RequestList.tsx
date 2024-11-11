import styled from "styled-components";
import { Line } from "../../common/Line";
import { useNavigate } from "react-router-dom";
import React, { Fragment } from "react";
import { RequestData } from "../../../pages/inquiry/RequestListPage";
import { calcDate } from "../../../utils/calcDate";

const List = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: .5rem;

  .title {
    font-size: 1.25rem;
    margin-top: .4rem;
  }

  .date {
    font-family: 'GmarketSansLight';
    font-size: 0.75rem;
    margin-top: .4rem;
  }
`

const RequestList: React.FC<{ data: RequestData[] }> = ({data}) => {
  const navigate = useNavigate();

  return (
    <List>
      <div className="flex justify-center items-center">
        <p className="title w-3/4">제목</p>
        <p className="title w-1/6">게시 날짜</p>
      </div>
      <Line />
      {
        data.map((el) => (
          <Fragment key={el.boardCode}>
            <div onClick={() => navigate(`/request/${el.boardCode}`)} className="flex items-center justify-center">
              <p className="title w-3/4">{el.title}</p>
              <p className="date w-1/6">{calcDate(new Date(el.createdTime))}</p>
            </div>
            <Line $color="#A3A3A3" />
          </Fragment>
        ))
      }
    </List>
  )
}

export default RequestList;