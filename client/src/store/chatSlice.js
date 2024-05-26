import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import MESSAGES from "constants/message";
import api from "api";

export const fetchAllMessages = createAsyncThunk(
  "upload/fetchAllMessages",
  async ({ params, callback }, thunkAPI) => {
    try {
      const res = await api({
        path: `pings/fetchmessages`,
        method: "GET",
        params,
        body: {},
      });

      callback && callback();

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message ?? MESSAGES.error_message);
    }
  }
);

export const sendMessage = createAsyncThunk(
  "user/sendMessage",
  async ({ body, callback }, thunkAPI) => {
    try {
      const res = await api({
        path: `pings/sendmessage`,
        method: "POST",
        params: {},
        body,
      });

      callback && callback();

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message ?? MESSAGES.error_message);
    }
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: [],
    isLoading: false,
    hasError: false,
  },
  reducers: {
    updateMessages(state, action) {
      console.log("action.payload: ", action.payload);
      state.messages = [...state.messages, action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all messages
      .addCase(fetchAllMessages.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
        state.messages = [];
      })
      .addCase(fetchAllMessages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = false;
        state.messages = action.payload?.allMessages;
      })
      .addCase(fetchAllMessages.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
        state.messages = [];
      })
      // Send message
      .addCase(sendMessage.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(sendMessage.fulfilled, (state) => {
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(sendMessage.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      });
  },
});

export const { updateMessages } = chatSlice.actions;
export default chatSlice.reducer;
