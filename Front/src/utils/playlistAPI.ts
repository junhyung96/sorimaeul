import API from "./axios";

const URL = "/playlist";

export interface PlaylistCreateInterface {
  playlistName : string;
}

// 플레이리스트 생성
export const createPlaylist = (data: PlaylistCreateInterface) => {
  return API.post(URL, data, {
    headers: {
      'Content-Type': 'application/json'
    }})
  .then(res => res)
  .catch(err => console.log(err))
}

// 플레이리스트 전체 목록 조회
export const getPlaylists = () => {
  return API.get(URL)
  .then(res => res.data)
  .catch(err => console.log(err))
}

// 플레이리스트 상세 조회 : 플레이리스트 내 커버 목록 조회
export const getPlaylist = (playlistCode: string) => {
  return API.get(URL + `/${playlistCode}`)
  .then((res) => res.data)
  .catch(err => console.log(err))
}

// 플레이리스트 수정
export const updatePlaylist = (playlistCode: string, data: PlaylistCreateInterface) => {
  return API.patch(URL + `/${playlistCode}`, data)
  .then((res) => res.data)
  .catch(err => console.log(err))
}


// 플레이리스트 삭제 
export const deletePlaylist = (playlistCode: string) => {
  return API.delete(URL + `/${playlistCode}`)
  .then(res => res)
  .catch(err => console.log(err))
}

// 플레이리스트에 ai 커버 추가 
export const addCoverToList = (playlistCode: string, coverCode: string) => {
  return API.post(URL + `/${playlistCode}/${coverCode}`)
  .then(res => res)
  .catch(err => err)
}

// 플레이리스트에 ai 커버 삭제
export const deleteCoverFromList = (playlistCode: string, coverCode: string) => {
  return API.delete(URL + `/${playlistCode}/${coverCode}`)
  .then(res => res)
  .catch(err => err)
}