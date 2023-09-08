import { createSlice } from "@reduxjs/toolkit";

export const signupPopupSlice = createSlice({
  name: 'signupPopup',
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

export const { setClose, setOpen } = signupPopupSlice.actions

export default signupPopupSlice.reducer;