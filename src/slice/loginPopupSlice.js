import { createSlice } from "@reduxjs/toolkit";

export const loginPopupSlice = createSlice({
  name: 'loginPopup',
  initialState : {
    value:false
  },
  reducers:{
    setClose: (state) => {
      state.value = false;
    },
    setOpen: (state) => {
      state.value = true;
    }
  }
});

export const { setClose, setOpen } = loginPopupSlice.actions

export default loginPopupSlice.reducer;