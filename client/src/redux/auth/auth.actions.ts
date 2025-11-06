import { createAsyncThunk } from "@reduxjs/toolkit";

// api
import AuthService from "@/api/auth/auth.service";

// types
import { LoginBody } from "@/api/auth/auth.types";

export const login = createAsyncThunk<boolean, LoginBody, { rejectValue: { message: string } }>(
  "auth/login",
  async (body, { rejectWithValue }) => {
    try {
      await AuthService.login(body);
      return true;
    } catch (err: any) {
      return rejectWithValue({
        message: err.message || "Unknown error",
      });
    }
  }
);

export const refresh = createAsyncThunk<boolean, void, { rejectValue: { message: string } }>(
  "auth/refresh",
  async (_, { rejectWithValue }) => {
    try {
      await AuthService.refresh();
      return true;
    } catch (err: any) {
      return rejectWithValue({
        message: err.message || "Unknown error",
      });
    }
  }
);

export const logout = createAsyncThunk<boolean, void, { rejectValue: { message: string } }>(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await AuthService.logout();
      return false;
    } catch (err: any) {
      return rejectWithValue({
        message: err.message || "Unknown error",
      });
    }
  }
);
