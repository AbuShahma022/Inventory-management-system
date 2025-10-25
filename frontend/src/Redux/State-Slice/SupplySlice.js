import { createSlice } from "@reduxjs/toolkit";

const SupplySlice = createSlice({
  name: "supply",
  initialState: {
    List: [],
    ListTotal: 0,
  },

  reducers: {
    setSupplyList: (state, action) => {
      state.List = action.payload;
    },
    setSupplyListTotal: (state, action) => {
      state.ListTotal = action.payload;
    },
  },
});
 

export const { setSupplyList, setSupplyListTotal } = SupplySlice.actions;

export default SupplySlice.reducer;