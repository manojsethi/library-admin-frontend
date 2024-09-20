// src/redux/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  email: string;
  name: string;
  roles: string[];
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  isLoading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<{ loading: boolean }>) => {
      state.isLoading = action.payload.loading;
    },
    setCredentials: (state, action: PayloadAction<{ user: User }>) => {
      //   state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    },
    clearCredentials: (state) => {
      //   state.accessToken = null;
      state.user = null;
    },
  },
});

export const { setCredentials, clearCredentials, setLoading } =
  authSlice.actions;
export default authSlice.reducer;
