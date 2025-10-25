import { createSlice } from "@reduxjs/toolkit";

const SalesSlice = createSlice({
  name: "sales",
  initialState: {
    list: [],
    listTotal: 0,
  },
  reducers: {
    setSalesList: (state, action) => {
      state.list = action.payload;
    },
    setSalesListTotal: (state, action) => {
      state.listTotal = action.payload;
    },
  },
});

export const { setSalesList, setSalesListTotal } = SalesSlice.actions;
export default SalesSlice.reducer;
