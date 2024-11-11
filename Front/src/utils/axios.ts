import axios from 'axios';
import { getCookie, removeCookie, setCookie } from './cookie';
import { logout } from '../stores/user';

const env = import.meta.env.VITE_IS_PRODUCTION || "development";
export const isProduction = env === "production";
export const HOST = isProduction ? import.meta.env.VITE_API_URL : "http://localhost";
export const PORT = ":8000/api";

// 백엔드 서버 기본 url 지정
export const URL = isProduction ?  HOST : HOST+PORT;

// axios instance 생성
const API = axios.create({
  baseURL: URL,
  withCredentials: true,
});

const reissueAPI = axios.create({
  baseURL: URL,
  withCredentials: true,
});

// 요청 인터셉터(인증 헤더 넣기)
API.interceptors.request.use(
  (config) => {
    const accessToken = getCookie('accessToken');
    if (accessToken) {
      config.headers['Authorization'] = accessToken;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  },
);

// 응답 인터셉터(토큰 만료 처리)
let isRefreshing = false; // 토큰 재발급 중인지 여부 확인 
let refreshPromise: Promise<any> | null = null; // 토큰 재발급 요청의 프로미스 객체 저장

API.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    if (err.response && err.response.status === 401) {
      if (!isRefreshing) {
        isRefreshing = true;
        const refreshToken = getCookie('refreshToken');
        const headers = { Authorization: refreshToken };

        // 토큰 재발급
        refreshPromise = reissueAPI
          .get('/oauth/reissue', { headers })
          .then((res) => {
            const access = res.data.accessToken;
            const refresh = res.data.refreshToken;
            setCookie('accessToken', `Bearer ${access}`, { path: '/' });
            setCookie('refreshToken', `Bearer ${refresh}`, { path: '/' });
            return Promise.resolve();
          })
          .catch((err) => {
            if (err.response.status === 401) {
              handleLogout();
            }
            return Promise.reject(err);
          })
          .finally(() => {
            isRefreshing = false;
            refreshPromise = null;
          });
      }
      // 토큰 재발급 요청 promise가 존재하면 토큰 재발급이 완료되면 원래의 요청(재발급 이전실패한 api 요청: err.confing) 재시도 
      if (refreshPromise) {
        return refreshPromise.then(() => {
          return API(err.config);
        });
      } else {
        // 없으면 원래의 요청을 거부하고 에러를 반환 
        return Promise.reject(err);
      }
    }
    // 401 에러가 아닌 다른 에러 반환 
    return Promise.reject(err);
  },
);

function handleLogout() {
  logout();
  removeCookie('accessToken');
  removeCookie('refreshToken');
  window.location.href = '/landing';
}

export default API;
