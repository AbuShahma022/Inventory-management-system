import { createSlice } from "@reduxjs/toolkit";

const PurchaseSlice = createSlice({
  name: "purchase",
  initialState: {
    list: [],
    listTotal: 0,
  },
  reducers: {
    setPurchaseList: (state, action) => {
      state.list = action.payload;
    },
    setPurchaseListTotal: (state, action) => {
      state.listTotal = action.payload;
    },
  },
});

export const { setPurchaseList, setPurchaseListTotal } = PurchaseSlice.actions;

export default PurchaseSlice.reducer;
