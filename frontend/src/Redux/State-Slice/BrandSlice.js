import { createSlice } from "@reduxjs/toolkit";

const BrandSlice = createSlice({
  name: "brand",
  initialState: {
    List: [],
    ListTotal: 0,
  },

  reducers: {
    setBrandList: (state, action) => {
      state.List = action.payload;
    },
    setBrandListTotal: (state, action) => {
      state.ListTotal = action.payload;
    },
 
  },
});

export const { setBrandList, setBrandListTotal } =
  BrandSlice.actions;

export default BrandSlice.reducer;
