import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import uploadReducer from "./uploadSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    upload: uploadReducer,
  },
});

export default store;
