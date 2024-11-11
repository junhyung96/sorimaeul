import { createSlice, PayloadAction  } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";


interface Cover {
  coverCode: string,
  coverSinger: string;
  singer: string;
  title: string;
  nickname: string;
  storagePath: string;
  isPublic: boolean;
}

interface Playlist {
  playlistCode: string;
  playlistName: string;
  createdTime: string;
  covers: Cover[];
}



export interface PlaylistsState {
  playlists: Playlist[];
  selectedPlaylist?: Playlist;
  totalPages: number;
}

const initialState: PlaylistsState = {
  playlists: [],
  totalPages: 0,
};

export const playlistsSlice = createSlice({
  name: 'playlists',
  initialState,
  reducers: {
    // 기존 플레이리스트 목록에 새로 생성된 플레이리스트를 추가하는 액션
    addPlaylist: (state, action: PayloadAction<Playlist>) => {
      state.playlists.unshift(action.payload);
    },
    // 기존 플레이리스트 목록에서 삭제된 플레이리스트를 제거하는 액션
    removePlaylist: (state, action: PayloadAction<string>) => {
      state.playlists = state.playlists.filter(playlist => playlist.playlistCode !== action.payload);
    },
    setPlaylists: (state, action: PayloadAction<Playlist[]>) => {
      state.playlists = action.payload;
    },
    setSelectedPlaylist: (state, action: PayloadAction<Playlist>) => {
      state.selectedPlaylist = action.payload;
    },
    setTotalPages: (state, action: PayloadAction<number>) => {
      state.totalPages = action.payload;
    },
    updatePlaylistName: (state, action: PayloadAction<{playlistCode: string, playlistName: string}>) => {
      const index = state.playlists.findIndex(playlist => playlist.playlistCode === action.payload.playlistCode);
      if (index !== -1) {
        state.playlists[index].playlistName = action.payload.playlistName;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState);
  }
});

export const { addPlaylist, removePlaylist, setPlaylists, setSelectedPlaylist, setTotalPages, updatePlaylistName } = playlistsSlice.actions;
export default playlistsSlice.reducer;