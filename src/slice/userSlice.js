import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginService } from "../services/login";

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
    user : null,
    error : null
  },
  extraReducers:(builder)=>{
    builder
    .addCase(loginUser.pending,(state)=>{
      state.loading = true;
      state.user = null;
      state.error = null;
    })
    .addCase(loginUser.fulfilled,(state,action)=>{
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    })
    .addCase(loginUser.rejected,(state,action)=>{
      state.loading = false;
      state.user = null;
      console.log(action.error.message);
      state.error = action.error.message;
    })
  }
});

export default userSlice.reducer;