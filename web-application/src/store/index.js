import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import uploadReducer from "./uploadSlice";
import chatReducer from "./chatSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    upload: uploadReducer,
    chat: chatReducer,
  },
});

export default store;
