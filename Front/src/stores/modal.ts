import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface ModalState {
  modalType: string;
  isOpen: boolean;
  payload?: any;
}

const initialState: ModalState = {
  modalType: "",
  isOpen: false,
}

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state,  action: PayloadAction<{modalType: string; payload?: any}>) => {
      const { modalType, payload } = action.payload;
      state.modalType = modalType;
      state.isOpen = true;
      state.payload = payload;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;