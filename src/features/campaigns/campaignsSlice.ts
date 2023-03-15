import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import MockApi from "../../api/mockapi";
import { type Campaign } from "../../types/Campaign";

export const createMockCampaign = createAsyncThunk(
  "mock/createCampaign",
  async (name: string) => {
    const response = await MockApi.createCompaign({ name });
    return response.data;
  },
);

export const fetchMockCampaign = createAsyncThunk(
  "mock/getCampaign",
  async () => {
    const response = await MockApi.getCompaign();
    return response.data;
  },
);

const initialState: CampaignsState = {
  campaigns: [],
  loading: false,
  error: undefined,
  creatingResult: undefined,
};

export const campaignsSlice = createSlice({
  name: "campaigns",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createMockCampaign.pending, function (state) {
        state.loading = true;
        state.error = undefined;
        state.creatingResult = undefined;
      })
      .addCase(createMockCampaign.fulfilled, (state, action) => {
        state.loading = false;
        state.creatingResult = "done";
      })
      .addCase(createMockCampaign.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchMockCampaign.pending, function (state) {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchMockCampaign.fulfilled, (state, action) => {
        state.loading = false;
        state.error = undefined;
        state.campaigns = action.payload;
      })
      .addCase(fetchMockCampaign.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default campaignsSlice.reducer;

export interface CampaignsState {
  campaigns: Campaign[];
  loading: boolean;
  error?: string;
  creatingResult?: string;
}
