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
