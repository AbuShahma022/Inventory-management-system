import { configureStore } from "@reduxjs/toolkit";
import loaderReducer from "../State-Slice/LoaderSlice.js";
import profileReducer from "../State-Slice/ProfileSlice.js";
import userDetailsReducer from "../State-Slice/UserDetailsSlice.js";

const store = configureStore({
  reducer: {
    loader: loaderReducer,
    profile: profileReducer,
    userDetails: userDetailsReducer,
  },
});

export default store;
