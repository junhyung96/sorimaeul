import styled from "styled-components";
import SelectBox from "./SelectBox";
import SelfRecordMethod from "./SelfRecordMethod";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../stores/store";
import UploadRecordMethod from "./UploadRecordMethod";
import { useEffect } from "react";
import { setIsFileUploaded } from "../../../stores/voiceModel";
import UploadModelMethod from "./UploadModelMethod";

const Container = styled.div`
  border-radius: 35px;
  padding: 2rem 2rem;
  background-color: black;
  width: 75%;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .line {
    border-color: #AC69FF;
  }

  .learnCnt {
    text-align: right;
    padding-right: 1rem;
    color: white;
    .num {
      color: #AC69FF;
    }
  }
`

function SelectMethod() {
  const method = useSelector((state: RootState) => state.voiceModel.method);
  const learnCount = useSelector((state: RootState) => state.user.learnCount);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setIsFileUploaded(false));
  }, [method])

  return (
    <Container>
      <SelectBox />
      <hr className="line" />
      {
        method === "self" &&
        <SelfRecordMethod />
      }
      {
        method === "file" &&
        <UploadRecordMethod />
      }
      {
        method === "model" &&
        <UploadModelMethod />
      }
      <p className="learnCnt">남은 학습 횟수: <span className="num">{learnCount}</span>회</p>
    </Container>  
  )
}

export default SelectMethod;