import { createSlice } from "@reduxjs/toolkit";

const CategorySlice = createSlice({
  name: "brand",
  initialState: {
    List: [],
    ListTotal: 0,
  },

  reducers: {
    setCategoryList: (state, action) => {
      state.List = action.payload;
    },
    setCategoryListTotal: (state, action) => {
      state.ListTotal = action.payload;
    },
 
  },
});

export const { setCategoryList, setCategoryListTotal } =
  CategorySlice.actions;

export default CategorySlice.reducer;
