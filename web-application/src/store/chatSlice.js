import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ERROR_MESSAGE } from "constants/message";
import api from "api";

export const getAllUsers = createAsyncThunk(
  "chats/getalluser",
  async ({ params, callback }, thunkAPI) => {
    try {
      const res = await api({
        path: `chats/getallusers`,
        method: "GET",
        params,
        body: {},
        headers: {},
      });

      callback && callback();

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message ?? ERROR_MESSAGE);
    }
  }
);

export const sendMessage = createAsyncThunk(
  "chats/sendmessage",
  async ({ body, callback }, thunkAPI) => {
    console.log("BODY: ", body);
    try {
      const res = await api({
        path: `chats/sendmessage`,
        method: "POST",
        params: {},
        body,
        headers: {},
      });

      callback && callback();

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message ?? ERROR_MESSAGE);
    }
  }
);

export const fetchMessages = createAsyncThunk(
  "chats/fetchmessages",
  async ({ params, callback }, thunkAPI) => {
    const { myid, hisid } = params;
    try {
      const res = await api({
        path: `chats/fetchmessages/${myid}/${hisid}`,
        method: "GET",
        params: {},
        body: {},
        headers: {},
      });

      callback && callback();

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message ?? ERROR_MESSAGE);
    }
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    isLoading: false,
    hasError: false,
    users: {},
    selected: {},
    messages: [],
  },
  extraReducers: (builder) => {
    builder
      // get all users
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = false;
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      })
      // send message
      .addCase(sendMessage.pending, (state) => {
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(sendMessage.fulfilled, (state) => {
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(sendMessage.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      })
      // fetch messages
      .addCase(fetchMessages.pending, (state) => {
        state.isLoading = false;
        state.hasError = false;
        state.messages = [];
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = false;
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      });
  },
  reducers: {
    userSelected: (state, action) => {
      state.selected = action.payload;
    },
  },
});

export const { userSelected } = chatSlice.actions;

export default chatSlice.reducer;
