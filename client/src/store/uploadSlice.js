import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import MESSAGES from "constants/message";
import api from "api";

export const fileSingleUpload = createAsyncThunk(
  "upload/fileSingleUpload",
  async ({ body, headers, identifier, callback }, thunkAPI) => {
    try {
      const res = await api({
        path: `uploads/uploadsingle/${identifier}`,
        method: "POST",
        params: {},
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

export const getSingleFile = createAsyncThunk(
  "upload/getSingleFile",
  async ({ identifier, callback }, thunkAPI) => {
    try {
      const res = await api({
        path: `uploads/previewsingle/${identifier}`,
        method: "GET",
        params: {},
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
      .addCase(getSingleFile.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(getSingleFile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = false;
        state.profile = action.payload;
      })
      .addCase(getSingleFile.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      });
  },
});

export default uploadSlice.reducer;
