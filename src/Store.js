import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice";
import loginPopupReducer from "./slice/loginPopupSlice";

const store = configureStore({
  reducer : {
    user: userReducer,
    loginPopup: loginPopupReducer
  }
})

export default store;