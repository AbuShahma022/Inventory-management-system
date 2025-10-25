import { createSlice } from "@reduxjs/toolkit";

const ProductSlice = createSlice({
  name: "product",
  initialState: {
    list: [],
    listTotal: 0,
  },
  reducers: {
    setProductList: (state, action) => {
      state.list = action.payload;
    },
    setProductListTotal: (state, action) => {
      state.listTotal = action.payload;
    },
  },
});

export const { setProductList, setProductListTotal } = ProductSlice.actions;
export default ProductSlice.reducer;
