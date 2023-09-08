import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginService } from "../services/login";
import { logoutService } from "../services/logout";

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async(userCredentials) => {
    const result = await loginService(userCredentials);
    console.log("from slice",result);
    return result;
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState : {
    loading : false,
    isAuthenticated:false,
    error : null
  },
  reducers: {
    unAuthenticate : (state)=>{
      state.isAuthenticated = false;
      logoutService();
    },
    setAuthenticated : (state) => {
      state.isAuthenticated = true;
    },
    unsetError : (state) => {
      state.loading = false;
      state.user = null;
      state.error = null;
    }
  },
  extraReducers:(builder)=>{
    builder
    .addCase(loginUser.pending,(state)=>{
      state.loading = true;
      state.error = null;
    })
    .addCase(loginUser.fulfilled,(state,action)=>{
      state.loading = false;
      state.isAuthenticated = true;
      state.error = null;
      localStorage.setItem("user",JSON.stringify(action.payload));
    })
    .addCase(loginUser.rejected,(state,action)=>{
      state.loading = false;
      state.user = null;
      state.error = action.error.message;
    })
  }
});

export const { unAuthenticate, setAuthenticated, unsetError } = userSlice.actions

export default userSlice.reducer;