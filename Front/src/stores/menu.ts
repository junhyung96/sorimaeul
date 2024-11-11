import { createSlice } from "@reduxjs/toolkit";

type MenuItem = "나의 음성 모델" | "더빙 컨텐츠" | "AI 커버" | "관심 컨텐츠" | "플레이리스트";

export interface MenuState {
  selectedMenu: MenuItem;
  likeType: string; 
}

const initialState: MenuState = {
  selectedMenu: "나의 음성 모델",
  likeType: "더빙"
}

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setSelectedMenu(state, action) {
      state.selectedMenu = action.payload;
    },
    setLikeType(state, action) {
      state.likeType = action.payload;
    }
  }
});

export const { setSelectedMenu, setLikeType } = menuSlice.actions;
export default menuSlice.reducer;