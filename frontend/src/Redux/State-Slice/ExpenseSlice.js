import { createSlice } from "@reduxjs/toolkit";

const ExpenseSlice = createSlice({
  name: "expense",
  initialState: {
    list: [],
    listTotal: 0,
  },
  reducers: {
    setExpenseList: (state, action) => {
      state.list = action.payload;
    },
    setExpenseListTotal: (state, action) => {
      state.listTotal = action.payload;
    },
  },
});

export const { setExpenseList, setExpenseListTotal } = ExpenseSlice.actions;
export default ExpenseSlice.reducer;
