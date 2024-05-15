import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import MESSAGES from "constants/message";
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

      callback && callback(res.data);

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message ?? MESSAGES.error_message);
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

      callback && callback(res.data);

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message ?? MESSAGES.error_message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ params, body, callback }, thunkAPI) => {
    try {
      const res = await api({
        path: `users/update/${params.identifier}`,
        method: "PATCH",
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

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async ({ params, callback }, thunkAPI) => {
    try {
      const res = await api({
        path: `users/delete/${params.identifier}`,
        method: "DELETE",
        params: {},
        body: {},
      });

      callback && callback(res);

      return res.data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message ?? MESSAGES.error_message);
    }
  }
);

export const getAllUserExceptMe = createAsyncThunk(
  "user/getUser",
  async ({ params, callback }, thunkAPI) => {
    try {
      const res = await api({
        path: `users/allusersexpectme/${params.identifier}`,
        method: "GET",
        params: {},
        body: {},
      });

      callback && callback();

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message ?? MESSAGES.error_message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    userDetails: {},
    allUsers: [],
    isLoading: false,
    hasError: false,
  },
  reducers: {
    updateUserDetails(state, action) {
      console.log("action.payload.userDetails: ", action.payload.userDetails);
      state.userDetails = {
        ...state.userDetails,
        ...action.payload.userDetails,
      };
    },
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
        state.userDetails = action.payload?.userDetails;
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
        state.userDetails = action.payload?.userDetails;
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
      })
      // Get all Users except me
      .addCase(getAllUserExceptMe.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(getAllUserExceptMe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = false;
        state.allUsers = action.payload?.allUsers;
      })
      .addCase(getAllUserExceptMe.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      });
  },
});

export const { updateUserDetails } = userSlice.actions;
export default userSlice.reducer;
