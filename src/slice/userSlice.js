import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const env = import.meta.env;

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async(userCredentials) => {
    console.log("user creds",userCredentials);
    const request = await axios.get(`${env.VITE_API}/user/userLogin`,{
      headers : {
        username : userCredentials.email,
        password : userCredentials.password
      }
    })
    return request.data;
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