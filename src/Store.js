import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice";
import loginPopupReducer from "./slice/loginPopupSlice";
import signupPopupSlice from "./slice/signupPopupSlice";

const store = configureStore({
  reducer : {
    user: userReducer,
    loginPopup: loginPopupReducer,
    signupPopup: signupPopupSlice
  }
})

export default store;