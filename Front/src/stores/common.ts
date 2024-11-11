import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

export interface AlarmData {
  notifyCode: number;
  userCode: number;
  notifyContent: string;
  notifyType: string;
  isChecked: number;
  createdTime: string;
  targetCode: number;
}

export interface CommonState {
  isOpen: boolean;
  alarmList: AlarmData[];
  unreadMsgCnt: number;
}

const initialState: CommonState = {
  isOpen: false,
  alarmList: [],
  unreadMsgCnt: 0
}

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    toggleSideBar(state) {
      state.isOpen = !state.isOpen
    },
    setAlarmList(state, action) {
      state.alarmList = action.payload;
    },
    checkAlarmState(state, action) {
      state.alarmList = state.alarmList.map(el => {
        if (el.notifyCode === action.payload) {
          el.isChecked = 1;
        }
        return el;
      })
    },
    setUnreadMsgCnt(state) {
      state.unreadMsgCnt = state.alarmList.filter(el => el.isChecked === 0).length
    },
    removeAlarm(state, action) {
      state.alarmList = state.alarmList.filter(el => el.notifyCode !== action.payload)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState);
  }
});

export const { toggleSideBar, setAlarmList, checkAlarmState, removeAlarm, setUnreadMsgCnt } = commonSlice.actions;
export default commonSlice.reducer;