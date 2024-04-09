import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import uploadReducer from "./uploadSlice";
import chatReducer from "./chatSlice";
import { createContext } from "react";

const store = configureStore({
  reducer: {
    user: userReducer,
    upload: uploadReducer,
    chat: chatReducer,
  },
});

export const MyContext = createContext("");

export default store;
