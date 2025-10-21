import { createSlice } from "@reduxjs/toolkit";

// actions
import { login } from "./auth.actions";

// types
import { Statuses } from "@/types/enums.types";
import type { AuthInitialState } from "./auth.types";

const initialState: AuthInitialState = {
  isAuth: false,
  status: Statuses.LOADING,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = Statuses.LOADING;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isAuth = action.payload;
        state.status = Statuses.SUCCESS;
      })
      .addCase(login.rejected, (state) => {
        state.status = Statuses.ERROR;
      });
  },
});

export default authSlice.reducer;
