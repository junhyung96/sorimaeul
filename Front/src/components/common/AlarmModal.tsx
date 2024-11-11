import { RootState } from "../../stores/store";
import { checkAlarm, deleteAlarm } from "../../utils/alarm";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import modalCloseBtn from "../../assets/modalCloseBtn.png";
import { checkAlarmState, removeAlarm, setUnreadMsgCnt } from "../../stores/common";
import { closeModal } from "../../stores/modal";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { calcDate } from "../../utils/calcDate";
import { getUserVideo } from "../../utils/dubbingAPI";

const Container = styled.div`
  width: 34.125rem;
  height: 19.125rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 5px;
  z-index: 2;
  
  .control-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 15%;
    .count {
      font-size: 1rem;
      font-family: 'GmarketSansLight';
      .bold {
        font-family: 'GmarketSansBold';
      }
    }
  }

  .alarm-box {
    width: 100%;
    height: 85%;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: .5rem;
  }
`

const Alarm = styled.div<{ $isChecked: number }>`
  width: 95%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: ${(props) => `1px solid #${props.$isChecked ? 'E5E7DF' : 'BFFF0A'}`};
  border-radius: 10px;
  padding: .5rem;

  .content {
    padding-top: .15rem;
    font-size: 1rem;
    width: 75%;
  }
  .date {
    padding-top: .35rem;
    font-size: 0.75rem;
    font-family: 'GmarketSansLight';
  }
`

function AlarmModal() {
  const alarmList = useSelector((state: RootState) => state.common.alarmList);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const clickDelete = (notifyCode: number) => {
    deleteAlarm(notifyCode);
    dispatch(removeAlarm(notifyCode));
  };

  const goDetail = async (notifyType: string, targetCode: number, notifyCode: number, notifyContent: string) => {
    checkAlarm(notifyCode);
    dispatch(checkAlarmState(notifyCode));
    if (!notifyContent.includes("실패했습니다")) {
      if (notifyType === 'train') {
        navigate(`/model/${targetCode}`);
      } else if (notifyType === 'cover') {
        navigate(`/cover/board/${targetCode}`);
      } else {
        const res = await getUserVideo(`${targetCode}`);
        navigate(`/dubbing/${res.videoSourceCode}/${targetCode}/edit`);
      }
      dispatch(closeModal());
    }
  };

  useEffect(() => {
    dispatch(setUnreadMsgCnt());
  }, [alarmList])

  return (
    <Container>
      <div className="control-box">
        <p className="count">총 <span className="bold">{alarmList ? alarmList.length : 0}</span>개의 알림이 있습니다.</p>
        <img onClick={() => dispatch(closeModal())} src={modalCloseBtn} alt="X" />
      </div>
      <div className="alarm-box">
        {
          alarmList &&
          alarmList.map(el => (
            <Alarm $isChecked={el.isChecked} onClick={() => goDetail(el.notifyType, el.targetCode, el.notifyCode, el.notifyContent)} key={el.notifyCode}>
              <p className="content">{el.notifyContent}</p>
              <div className="flex gap-3 justify-center items-center">
                <div>
                  <p className="date font-black">{ el.isChecked ? '읽음' : '읽지 않음'}</p>
                  <p className="date">{calcDate(new Date(el.createdTime))}</p>
                </div>
                <img 
                  onClick={(e) => {
                    e.stopPropagation();
                    clickDelete(el.notifyCode);
                  }} 
                  src={modalCloseBtn} 
                  alt="" 
                />
              </div>
            </Alarm>
          ))
        }
      </div>
    </Container>
  )
}

export default AlarmModal;