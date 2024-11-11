import { createSlice } from "@reduxjs/toolkit";

export interface VoiceModelState {
  modelCode: number,
  modelName: string,
  imagePath: string,
  recordCount: number,
  learnState: number,
  method: string,
  isFileUploaded: boolean,
  isStart: boolean
}

const initialState: VoiceModelState = {
  modelCode: 0,
  modelName: "",
  imagePath: "",
  recordCount: 0,
  learnState: 1,
  method: "self",
  isFileUploaded: false,
  isStart: false
}

const voiceModelSlice = createSlice({
  name: "voiceModel",
  initialState,
  reducers: {
    initModelInfo(state, action) {
      state.modelCode = action.payload;
    },
    setModelInfo(state, action) {
      state.modelCode = action.payload.modelCode;
      state.modelName = action.payload.modelName;
      state.imagePath = action.payload.imagePath;
      state.recordCount = action.payload.recordCount;
      state.learnState = action.payload.state;
    },
    selectMethod(state, action) {
      state.method = action.payload;
    },
    setIsFileUploaded(state, action) {
      state.isFileUploaded = action.payload;
    },
    setIsStart(state, action) {
      state.isStart = action.payload;
    },
    setIsLearning(state, action) {
      state.learnState = action.payload;
    },
    getNextSentence(state) {
      state.recordCount = state.recordCount + 1;
    }
  }
});

export const { 
  initModelInfo, 
  setModelInfo, 
  selectMethod, 
  setIsFileUploaded, 
  setIsStart, 
  setIsLearning, 
  getNextSentence 
} = voiceModelSlice.actions;
export default voiceModelSlice.reducer;