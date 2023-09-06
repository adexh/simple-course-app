import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import addToCartService from "../services/addToCart";

export const addToCart = createAsyncThunk(
  'user/addToCart',
  async(id) => {
    await addToCartService(id);
  }
)

export const removeFromCart = createAsyncThunk(
  'user/addToCart',
  async(id) => {
    await addToCartService(id);
  }
)

export const cartSlice = createSlice({
  name: 'loginPopup',
  initialState : {
    items: [],
    totalAmt: 0,
    itemsCount: 0
  },
  reducers:{
  },
  extraReducers : (builder) =>{
    builder
    .addCase(cartSlice.fulfilled,(state) => {
      state.itemsCount += 1;
    })
  }
}
);

// export const {  } = cartSlice.actions

// export default cartSlice.reducer;