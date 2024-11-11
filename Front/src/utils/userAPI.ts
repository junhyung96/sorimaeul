import API from "./axios";
import { getCookie, removeCookie } from "./cookie";

// 로그인 여부 확인 
export const checkLogin = () => {
  const access = getCookie("accessToken");
  const refresh = getCookie("refreshToken");
  let isUserLoggedIn = false;
  if (access && refresh) {
    isUserLoggedIn = true
  }
  return isUserLoggedIn;
}

// 닉네임 중복 체크 
export const checkNickname = (nickname: string) => {
  return API.get(`user/nickname/${nickname}`)
    .then((res) => {
      return res.data.result;
    })
    .catch((err) => {
      return err;
    });
}

// 회원가입
export const signUp = (nickname: string, profileImage: string) => {
  try {
    return API.post("user/signup", { nickname, profileImage });
  } catch (err) {
    console.error("회원 가입 실패", err);
  }
}

// 로그아웃
export const logout = () => {
  const access = getCookie("accessToken");
  const refresh = getCookie("refreshToken");
  const accessToken = access ? access.replace(/Bearer\s/, "") : undefined; // 접두사와 그 뒤의 공백 제거 -> base64 decoding error 해결
  const refreshToken = refresh ? refresh.replace(/Bearer\s/, "") : undefined;
  return API.get("oauth/logout", { params: { accessToken, refreshToken } })
    .then(() => {
      removeCookie("accessToken", { path: "/" });
      removeCookie("refreshToken", { path: "/" });
    })
    .catch((err) => {
      console.log(err);
    })
}

// 회원 정보 수정 
export const editUserInfo = (nickname: string, profileImage: string)  => {
  return API.patch("user", { nickname, profileImage })
  .then(res => res)
  .catch(err => {
    throw err;
  })
}