import API from "./axios";
import { CoverCreateInterface, CoverResultInterface } from "../components/aiCover/CoverInterface";

// AI 커버 생성을 위한 음성 모델 조회 - videoSourceCode 와 page 모두 null로 전달
export const getCoverModels = () => {
  return API.get("model")
  .then((res) => {
    return res.data;
  })
  .catch((err) => {
    return err;
  })
}

// AI 커버 생성을 위한 서버 제공 노래 소스 목록 조회 
export const getMusicSources = () => {
  return API.get("cover/source")
  .then(res => res.data)
  .catch(err => console.error(err))
}

// AI 커버 생성
export const createCover = (data: CoverCreateInterface) => {
  return API.post("cover/create", data)
  .then((res) => {
    return res.data;
  })
  .catch((err) => {
    return err;
  })
}

// AI 전체 목록 조회 
interface ListParams {
  target: string;
  page: number;
}

export const getCovers = (page: number) => {
  const params: ListParams = { target: "all", page };
  return API.get("cover", { params })
  .then(res => res.data)
  .catch(err => err)
}

// AI 마이 페이지 조회 - mine
export const getMyCovers = (page: number) => {
  const params: ListParams = { target: "mine", page };
  return API.get("cover", { params })
  .then(res => res.data)
  .catch(err => err)
}
// AI 마이페이지 조회 - like
export const getLikeCovers = () => {
  return API.get("cover", { params: {
    target: "like"
  } })
  .then(res => res.data.covers)
  .catch(err => console.error(err))
}

// AI 인기 목록 조회
export const getPopularCovers = () => {
  const params: ListParams = { target: "popular", page: 1 };

  return API.get("cover", { params })
  .then(res => res.data)
  .catch(err => err)
}

// AI 상세 목록 조회
export const getCover = (coverCode: string) => {
  return API.get(`cover/${coverCode}`)
  .then(res => res.data)
  .catch(err => err)
}

// AI 커버 게시(수정)
export const updateCover = (coverCode: string, edit: CoverResultInterface) => {
  return API.patch(`cover/board/${coverCode}`, edit)
  .then(res => res.data)
  .catch(err => err)
}

// AI 커버 삭제
export const deleteCover = (coverCode: string) => {
  return API.delete(`cover/board/${coverCode}`)
  .then(res => res.data)
  .catch(err => err)
}

// AI 커버 좋아요/취소 로직 병합
export const likeCover = (coverCode: string, isLiked: number) => {
  if (isLiked) {
    return API.delete(`/like/cover/${coverCode}`)
    .then(res => res)
    .catch(err => err)
  } else {
    return API.get(`/like/cover/${coverCode}`)
    .then(res => res)
    .catch(err => err)
  }
}

