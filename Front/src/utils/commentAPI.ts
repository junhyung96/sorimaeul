import API from "./axios";

const URL = "/comment"

interface CommentCreateInterface {
  content: string
}

// 커버 게시물 댓글 등록 
export const createCoverComment = (coverCode: string, data: CommentCreateInterface ) => {
  return API.post(URL + `/cover/${coverCode}`, data)
  .then(res => res.data)
  .catch(err => console.error(err))
}

// 커버 게시물 댓글 조회
export const getCoverComment = (coverCode: string) => {
  return API.get(URL + `/cover/${coverCode}`)
  .then(res => res.data.comments)
  .catch(err => console.error(err))
}

// 더빙 게시물 댓글 등록
export const createDubComment = (dubCode: string, data: CommentCreateInterface ) => {
  return API.post(URL + `/dub/${dubCode}`, data)
  .then(res => res.data)
  .catch(err => console.error(err))
}

// 더빙 게시물 댓글 조회
export const getDubComment = (dubCode: string) => {
  return API.get(URL + `/dub/${dubCode}`)
  .then(res => res.data.comments)
  .catch(err => console.error(err))
}

// 댓글 삭제 
export const deleteComment = (commentCode: string) => {
  return API.delete(URL + `/${commentCode}`)
  .then(res => res.data)
  .catch(err => console.error(err))
}