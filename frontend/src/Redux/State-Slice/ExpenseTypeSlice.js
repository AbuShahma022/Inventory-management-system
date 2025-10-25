import { createSlice } from "@reduxjs/toolkit";

const ExpenseTypeSlice = createSlice({
  name: "expenseType",
  initialState: {
    list: [],
    listTotal: 0,
  },
  reducers: {
    setExpenseTypeList: (state, action) => {
      state.list = action.payload;
    },
    setExpenseTypeListTotal: (state, action) => {
      state.listTotal = action.payload;
    },
   
  },
});

export const {
  setExpenseTypeList,
  setExpenseTypeListTotal,
  
} = ExpenseTypeSlice.actions;

export default ExpenseTypeSlice.reducer;
