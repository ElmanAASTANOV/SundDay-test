import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import MockApi from "../../api/mockapi";
import { type Install } from "../../types/Install";
import { type Revenue } from "../../types/Revenue";

export const fetchMockOverview = createAsyncThunk(
  "mock/getOverview",
  async () => {
    const response = await MockApi.getOverview();
    return response.data;
  },
);

const initialState: OverviewState = {
  installs: [],
  revenue: [],
  loading: false,
  error: undefined,
};

export const overviewSlice = createSlice({
  name: "overview",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchMockOverview.pending, function (state) {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchMockOverview.fulfilled, (state, action) => {
        state.installs = action.payload.installs;
        state.revenue = action.payload.revenue;
        state.loading = false;
      })
      .addCase(fetchMockOverview.rejected, (state, action) => {
        state.installs = [];
        state.revenue = [];
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default overviewSlice.reducer;

export interface OverviewState {
  installs: Install[];
  revenue: Revenue[];
  loading: boolean;
  error?: string;
}
