import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { configureSlice } from "@/lib/helpers";
import {API} from "@/config/api.config";

interface IState {
  isLoggedIn: boolean;
  user: any;
  token: string;
  loading: boolean;
  error: any;
  success: boolean;
  message: string;
}

const initialState: IState = {
  isLoggedIn: false,
  user: {},
  token: "",
  loading: false,
  error: null,
  success: false,
  message: "",
};

export const login = createAsyncThunk(
  "auth/sign-in",
  async (data:any, { rejectWithValue }) => {
    try {
      // Step 2: Make login request using Axios
      const response = await API().post("/auth/sign-in", data);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    clearAuthState(state) {
      state.isLoggedIn = false;
      state.user = {};
      state.token = "";
      state.loading = false;
      state.error = null;
      state.success = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.isLoggedIn = true;
      state.user = payload.data;
      state.token = payload.token;
      state.loading = false;
      state.error = null;
      state.success = payload.status;
      state.message = payload.message;
    });
    builder.addCase(login.rejected, (state, { payload }: any) => {
      state.isLoggedIn = false;
      state.user = {};
      state.token = "";
      state.loading = false;
      state.success = false;
      state.error = payload.response?.data;
      state.message = payload.response?.data.message || "An error occurred.";
    });
  },
});

export const { clearAuthState } = authSlice.actions;

export const authSliceConfig = configureSlice(authSlice, true);
