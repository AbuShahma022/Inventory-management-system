import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, // will hold user object (name, email, photo, etc.)
};

const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.user = action.payload;
    },

  },
});

export const { setUserDetails} = userDetailsSlice.actions;

export default userDetailsSlice.reducer;
