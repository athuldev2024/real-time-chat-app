import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ERROR_MESSAGE } from "constants/message";
import api from "api";

export const fileUpload = createAsyncThunk(
  "upload/fileUpload",
  async ({ body, headers, callback }, thunkAPI) => {
    try {
      const res = await api({
        path: `uploads/uploadprofile`,
        method: "POST",
        params: {},
        body,
        headers,
      });

      callback && callback();

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message ?? ERROR_MESSAGE);
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
      return thunkAPI.rejectWithValue(error?.message ?? ERROR_MESSAGE);
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
      .addCase(fileUpload.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(fileUpload.fulfilled, (state) => {
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(fileUpload.rejected, (state) => {
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
