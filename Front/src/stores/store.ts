import { combineReducers, configureStore } from "@reduxjs/toolkit";
import sessionStorage from "redux-persist/lib/storage/session";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from 'redux-persist';
import userSlice, { UserState } from "./user";
import voiceModelSlice, { VoiceModelState } from "./voiceModel";
import menuSlice, { MenuState }  from "./menu";
import commonSlice, { CommonState } from "./common";
import playlistsSlice, { PlaylistsState } from "./playlists";
import modalSlice, { ModalState } from "./modal";
import commentSlice, { CommentState } from "./comment";
import audioPlayerSlice , { AudioPlayerState } from "./audioPlayer";

export interface RootState {
  user: UserState;
  voiceModel: VoiceModelState;
  menu: MenuState;
  common: CommonState;
  playlists: PlaylistsState;
  modal: ModalState;
  comment: CommentState;
  audioPlayer: AudioPlayerState;
}

const persistConfig = {
  key: 'root',
  storage: sessionStorage,
  whitelist: ['user', 'playlists', 'comment', 'common', 'menu'] // 저장할 상태 넣기
}

// reducer 등록하는 곳
const rootReducer = combineReducers({
  user: userSlice,
  voiceModel: voiceModelSlice,
  menu: menuSlice,
  common: commonSlice,
  playlists: playlistsSlice,
  modal: modalSlice,
  comment: commentSlice,
  audioPlayer: audioPlayerSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export const persistor = persistStore(store);

export const selectModal = (state: RootState) => state.modal;
