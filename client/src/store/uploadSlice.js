import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import MESSAGES from "constants/message";
import api from "api";

export const fileSingleUpload = createAsyncThunk(
  "upload/fileUpload",
  async ({ body, headers, params, callback }, thunkAPI) => {
    try {
      const res = await api({
        path: `uploads/uploadsingle`,
        method: "POST",
        params,
        body,
        headers,
      });

      callback && callback();

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message ?? MESSAGES.error_message);
    }
  }
);

export const getFile = createAsyncThunk(
  "upload/getFile",
  async ({ params, callback }, thunkAPI) => {
    try {
      const res = await api({
        path: `uploads/retrieve`,
        method: "GET",
        params,
        body: {},
      });

      callback && callback(res);

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message ?? MESSAGES.error_message);
    }
  }
);

const uploadSlice = createSlice({
  name: "upload",
  initialState: {
    profile: null,
    isLoading: false,
    hasError: false,
  },
  extraReducers: (builder) => {
    builder
      // file upload
      .addCase(fileSingleUpload.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(fileSingleUpload.fulfilled, (state) => {
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(fileSingleUpload.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      })
      // get file
      .addCase(getFile.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(getFile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = false;
        state.profile = action.payload;
      })
      .addCase(getFile.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      });
  },
});

export default uploadSlice.reducer;
