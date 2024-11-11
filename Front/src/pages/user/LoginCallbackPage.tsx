import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import API from "../../utils/axios";
import { setCookie, getCookie, removeCookie } from "../../utils/cookie";
import { set, login } from "../../stores/user";
import loadingLottie from "../../assets/lottie/loading.json";
import Lottie from "lottie-react";

// 소셜 로그인 후 redirect될 페이지 (call back)
// 서버로부터 token(access, refresh)까지 받는 역할
const LoginCallbackPage: React.FC = () => {
  const [status, setStatus] = useState<number | null>(null);
  const dispatch = useDispatch();

  const provider:string = useLocation().pathname.slice(16);
  const code:string | null = new URLSearchParams(useLocation().search).get("code");

  useEffect(() => {
      if (code) {
          API.get(`/oauth/login/${provider}?code=${code}`)
          .then((res) => {
              const access = res.data.accessToken;
              const refresh = res.data.refreshToken;

              // accessToken이 쿠키에 저장되어있으면 삭제
              if (getCookie("accessToken")) {
                  removeCookie("accessToken");
              }

              // refreshToken이 쿠키에 저장되어있으면 삭제
              if (getCookie("refreshToken")) {
                  removeCookie("refreshToken");
              }
              
              setCookie("accessToken",`Bearer ${access}`, { path: "/"}); // Https 적용하면 option 설정 하자!
              setCookie("refreshToken", `Bearer ${refresh}`, { path: "/"});
              const accessToken = getCookie("accessToken");


            //   dispatch(set({ nickname:}))

              // 사이트 로그인 요청 보내기 - 회원 db에 있는지 판별
              API.get("/user/login", {
                  headers: {
                      Authorization: accessToken
                  }
              })
              .then((res) => {
                // 유저 판별 코드 - 200 or 204
                setStatus(res.status);
                console.log(res.data)
                // redux store user 상태를 업데이트 
                dispatch(login()); 
                dispatch(set({ 
                  nickname: res.data.nickname ,
                  profileImage: res.data.profileImage, 
                  learnCount: res.data.learnCount,
                  coverCount: res.data.coverCount,
                  dubCount: res.data.dubCount
                }));
              })
              .catch((err) => {
                  console.log(err);
              });
          })
          .catch((err) => {
              console.log(err);
          });
      }
  }, [code, provider]);

  return (
    <div className="flex justify-center items-center flex-col h-screen">
      <h1 className="text-xl font-bold ">로그인 중입니다.</h1>
      <Lottie animationData={loadingLottie}/>
      { status === 200 && <Navigate to={"/"} />}
      { status === 204 && <Navigate to={"/signup"} />}
    </div>
  );
  
};

export default LoginCallbackPage;