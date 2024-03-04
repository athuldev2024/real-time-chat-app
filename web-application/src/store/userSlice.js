import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ERROR_MESSAGE } from "constants/message";
import api from "api";

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async ({ body, callback }, thunkAPI) => {
    try {
      const res = await api({
        path: "users/register",
        method: "POST",
        params: {},
        body,
      });

      callback && callback();

      return res.data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message ?? ERROR_MESSAGE);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ params, callback }, thunkAPI) => {
    try {
      const res = await api({
        path: "users/login",
        method: "GET",
        params,
        body: {},
      });

      callback && callback();

      return res.data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message ?? ERROR_MESSAGE);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ body, callback }, thunkAPI) => {
    try {
      const res = await api({
        path: `users/update/${body.mobile}`,
        method: "PATCH",
        params: {},
        body,
      });

      callback && callback();

      return res.data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message ?? ERROR_MESSAGE);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async ({ params, callback }, thunkAPI) => {
    try {
      const res = await api({
        path: `users/delete/${params.mobile}`,
        method: "DELETE",
        params: {},
        body: {},
      });

      callback && callback();

      return res.data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message ?? ERROR_MESSAGE);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    userDetails: {},
    isLoading: false,
    hasError: false,
  },
  extraReducers: (builder) => {
    builder
      // Register User
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = false;
        state.userDetails = action.payload;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      })
      // Login User
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = false;
        state.userDetails = action.payload;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      })
      // update User
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(updateUser.fulfilled, (state) => {
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(updateUser.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      })
      // delete User
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(deleteUser.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      });
  },
});

export default userSlice.reducer;
