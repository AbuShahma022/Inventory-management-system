import { createSlice } from "@reduxjs/toolkit";

const ReturnSlice = createSlice({
  name: "return",
  initialState: {
    list: [],
    listTotal: 0,
  },
  reducers: {
    setlist: (state, action) => {
      state.list = action.payload;
    },
    setlistTotal: (state, action) => {
      state.listTotal = action.payload;
    },
  },
});

export const { setlist, setlistTotal } = ReturnSlice.actions;
export default ReturnSlice.reducer;
