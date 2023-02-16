import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  currentUser: null,
  status: "idle",
  error: null,
};

export const signup = createAsyncThunk(
  "auth/signup",
  async ({ email, password, username }) => {
    const response = await axios.post(
      `${process.env.NEXT_APP_API_URL}/auth/signup`,
      { email, password, username }
    );
    return response.data;
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
    const response = await axios.post(
      `${process.env.NEXT_APP_API_URL}/auth/login`,
      { email, password }
    );
    // response.data === payload
    return response.data;
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  return null;
});

export const getCurrentUser = createAsyncThunk(
  "auth/currentUser",
  async (token) => {
    const response = await axios.post(
      `${process.env.NEXT_APP_API_URL}/auth/get-current-user`,
      {
        token: token,
      }
    );
    return response.data;
  }
);

const methods = [signup, login, logout, getCurrentUser];

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetStatus(state, _action) {
      state.status = "idle";
    },
  },
  extraReducers(builder) {
    methods.forEach((m) => {
      builder
        .addCase(m.pending, (state, _action) => {
          state.status = "loading";
        })
        .addCase(m.fulfilled, (state, action) => {
          state.status = "succeeded";
          switch (m) {
            case login:
              state.currentUser = action.payload.user;
              localStorage.setItem("token", action.payload.token);
              break;
            case logout:
              state.currentUser = null;
              localStorage.removeItem("token");
              break;
            case getCurrentUser:
              state.status = "idle";
              state.currentUser = action.payload.user;
              break;
            default:
              break;
          }
        })
        .addCase(m.rejected, (state, action) => {
          state.status = "idle";
        });
    });
  },
});

export default authSlice.reducer;

export const { resetStatus } = authSlice.actions;
