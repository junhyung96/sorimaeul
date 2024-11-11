import styled from "styled-components";
import bell from '../../assets/bell.png';
import home from '../../assets/home.png';
import logout from '../../assets/logout.png';
import microphone from '../../assets/microphone.png';
import record from '../../assets/musicRecord.png';
import question from '../../assets/questions.png';
import menu from '../../assets/menu.png';
import user from '../../assets/user.png';
import voice from '../../assets/voice.png';
import bgLogo from '../../assets/sideBgLogo.png';
import foldBtn from '../../assets/foldBtn.png';
import microphoneActive from "../../assets/activeVoice.png";
import recordActive from "../../assets/activeCover.png";
import questionActive from "../../assets/activeFAQ.png";
import userActive from "../../assets/activeProfile.png";
import voiceActive from "../../assets/activeDub.png";
import { Line } from "./Line";
import { useLocation, useNavigate } from "react-router-dom";
import { logout as logoutAPI } from "../../utils/userAPI";
import { logout as logoutState } from "../../stores/user";
import { useDispatch, useSelector } from "react-redux";
import { RootState, persistor } from "../../stores/store";
import { setAlarmList, setUnreadMsgCnt, toggleSideBar as toggle } from "../../stores/common";
import { openModal } from "../../stores/modal";
import { NativeEventSource, EventSourcePolyfill } from 'event-source-polyfill';
import { useEffect } from 'react';
import { URL, isProduction } from '../../utils/axios';
import { getCookie } from '../../utils/cookie';
import { getAlarmList } from "../../utils/alarm";

const Container = styled.div<{$isOpen: boolean}>`
  position: fixed;
  height: 100vh;
  width: ${(props) => (props.$isOpen ? "314px" : "60px")};
  background-color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 1.5rem;
  padding-bottom: 2.5rem;
  justify-content: space-between;
  z-index: 999;

  .content {
    width: ${(props) => (props.$isOpen ? "85%" : "80%")};
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    .msg-cnt {
      background: #BFFF0A;
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 1.25rem;
      height: 1.25rem;
      border-radius: 50%;
      padding-top: .2rem;
      font-size: .75rem;
      color: black;
      top: -.25rem;
      right: -.25rem;
    }
    .col {
      width: 100%;
      display: flex;
      gap: 1rem;
      align-items: center;
      .col-msg-cnt {
        background: #BFFF0A;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        padding-top: .2rem;
        font-size: .75rem;
        color: black;
        width: 1.25rem;
        height: 1.25rem;
      }
    }

    p {
      padding-top: 0.4rem;
      color: white;
      font-size: 1.125rem;
    }
  }
`

function SideBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const isOpen = useSelector((state: RootState) => state.common.isOpen);
  const isUser = useSelector((state: RootState) => state.user.loggedIn);
  const msgCnt = useSelector((state: RootState) => state.common.unreadMsgCnt);
  const alarmList = useSelector((state: RootState) => state.common.alarmList);

  const toggleSideBar = () => {
    dispatch(toggle());
  };

  const handleLogout = () => {
    logoutAPI()
    .then(() => {
      // 로그아웃 시, redux-persist로 저장된 상태 초기화
      persistor.purge().then(() => {
      dispatch(logoutState());
      navigate("/landing");
      })
     
    })
    .catch((err) => {
      console.error("로그아웃 실패;", err);
    })
  };

  const openAlarmModal = () => {
    dispatch(openModal({modalType: "alarm",}));
  };

  const getAlarmData = async () => {
    const res = await getAlarmList();
    dispatch(setAlarmList(res.list));
  };

  const EventSource = EventSourcePolyfill || NativeEventSource;

  useEffect(() => {
    if (isUser) {
      const eventSource = new EventSource(
        `${URL}/sse/connect`, 
        {
          headers: {
            Authorization: getCookie('accessToken')
          },
          heartbeatTimeout: 1500000,
          withCredentials: true,
        }
      );

      eventSource.addEventListener("train", (e: any) => {
        getAlarmData();
      });

      eventSource.addEventListener("cover", (e: any) => {
        getAlarmData();
      });

      eventSource.addEventListener("dubbing", (e: any) => {
        getAlarmData();
      });
  
      eventSource.onerror = (e: any) => {
        if (!e.error.message.includes("No activity")) {
          eventSource.close();
        }
      };

      getAlarmData();
    }
  }, [isUser])

  useEffect(() => {
    dispatch(setUnreadMsgCnt());
  }, [alarmList])

  return (
    <Container $isOpen={isOpen}>
      {
        isOpen ?
        <>
          <div className="content">
            <div className="flex gap-2 justify-center items-center w-4/5">
              <img onClick={() => navigate('/')} src={bgLogo} alt="bgLogo" />
              <img onClick={toggleSideBar} src={foldBtn} alt="foldBtn" />
            </div>
            <Line $color="white" />
            <div className="flex flex-col gap-2 items-center w-full">
              <div onClick={() => navigate('/model/create')} className="col">
              <img src={location.pathname === '/model/create' ? microphoneActive : microphone} alt="voice-model" />
                <p>음성 학습</p>
              </div>
              <div onClick={() => navigate('/dubbing')} className="col">
                <img src={location.pathname === '/dubbing' ? voiceActive : voice} alt="dubbing" />
                <p>더빙 극장</p>
              </div>
              <div onClick={() => navigate('/cover')} className="col">
                <img src={location.pathname === '/cover' ? recordActive : record} alt="aicover" />
                <p>AI 커버</p>
              </div>
              <div className="col" onClick={() => navigate('/FAQ')}>
                <img src={location.pathname === '/FAQ' ? questionActive : question} alt="inquiry" />
                <p>FAQ</p>
              </div>
            </div>
            <Line $color="white" />
            <div className="flex flex-col gap-2 items-center w-full">
              <div onClick={() => navigate('/profile')}  className="col">
                <img src={location.pathname === '/profile' ? userActive : user} alt="profile" />
                <p>마이페이지</p>
              </div>
              <div className="col" onClick={openAlarmModal}>
                <img src={bell} alt="alarm" />
                <p>알림</p>
                {
                  msgCnt &&
                  <div className="col-msg-cnt">
                    {msgCnt}
                  </div>
                }
              </div>
            </div>
          </div>
          <div className="content">
            <div className="flex flex-col gap-2 items-center w-full">
              <div onClick={handleLogout} className="col">
                <img src={logout} alt="logout" />
                <p>로그아웃</p>
              </div>
              <div className="col" onClick={() => navigate('/')}>
                <img src={home} alt="home" />
                <p>Home</p>
              </div>
            </div>
          </div>
        </>
        :
        <>
          <div className="content">
            <img onClick={toggleSideBar} src={menu} alt="menu" />
            <Line $color="white" />
            <div className="flex flex-col gap-2 items-center">
              <img onClick={() => navigate('/model/create')} src={location.pathname === '/model/create' ? microphoneActive : microphone} alt="voice-model" />
              <img onClick={() => navigate('/dubbing')} src={location.pathname === '/dubbing' ? voiceActive : voice} alt="dubbing" />
              <img onClick={() => navigate('/cover')} src={location.pathname === '/cover' ? recordActive : record} alt="aicover" />
              <img onClick={() => navigate('/FAQ')} src={location.pathname === '/FAQ' ? questionActive : question} alt="inquiry" />
            </div>
            <Line $color="white" />
            <div className="flex flex-col gap-2 items-center">
              <img onClick={() => navigate('/profile')} src={location.pathname === '/profile' ? userActive : user} alt="profile" />
              <div className="relative">
                <img onClick={openAlarmModal} src={bell} alt="alarm" />
                {
                  msgCnt &&
                  <div className="msg-cnt">
                    {msgCnt}
                  </div>
                }
              </div>
            </div>
          </div>
          <div className="content">
            <div className="flex flex-col gap-2 items-center">
              <img onClick={handleLogout} src={logout} alt="logout" />
              <img onClick={() => navigate('/')} src={home} alt="home" />
            </div>
          </div>
        </>
      }
    </Container>
  )
}

export default SideBar;