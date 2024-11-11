import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AudioPlayerState {
  currentAudio: string | null; // 현재 재생 중인 오디오의 coverCode 저장
}

const initialState: AudioPlayerState = {
  currentAudio: null,
};

export const audioPlayerSlice = createSlice({
  name: 'audioPlayer',
  initialState,
  reducers: {
    setCurrentAudio: (state, action: PayloadAction<string | null>) => {
      state.currentAudio = action.payload;
    }
  },
});

export const { setCurrentAudio } = audioPlayerSlice.actions;
export default audioPlayerSlice.reducer;
