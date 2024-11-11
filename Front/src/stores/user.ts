import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

export interface UserState {
  nickname: string,
  profileImage: string,
  loggedIn: boolean,
  learnCount: number,
  coverCount: number,
  dubCount: number
}

const initialState: UserState = {
  nickname: "",
  profileImage: "",
  loggedIn: false,
  learnCount: 0,
  coverCount: 0,
  dubCount: 0
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    set(state, action) {
      const { nickname, profileImage, learnCount, coverCount, dubCount } = action.payload;
      state.nickname = nickname;
      state.profileImage = profileImage;
      state.learnCount = learnCount;
      state.coverCount = coverCount;
      state.dubCount = dubCount;
    },
    login(state) {
      state.loggedIn = true;
    },
    logout(state) {
      state.loggedIn = false;
      state.nickname = "";
      state.profileImage = "";
      state.learnCount = 0;
      state.coverCount = 0;
      state.dubCount = 0;
    },
    decreaseLearnCount(state) {
      state.learnCount -= 1;
    },
    decreaseCoverCount(state) {
      state.coverCount -= 1;
    },
    decreaseDubCount(state) {
      state.dubCount -= 1;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState);
  }
});

export const { set, login, logout, decreaseLearnCount, decreaseCoverCount, decreaseDubCount } = userSlice.actions;
export default userSlice.reducer;