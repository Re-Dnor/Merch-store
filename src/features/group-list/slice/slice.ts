import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProductByYourDesign } from "shared/api";
import { GroupType } from "shared/api/types";

import { ProductsStateType } from "../types";

export const fetchGroups = createAsyncThunk(
  "groups/fetchData",
  async (): Promise<GroupType[]> => {
    try {
      const response = await getProductByYourDesign();
      if (!response.ok) {
        throw response.statusText;
      }
      const data = await response.json();
      return data;
    } catch (e) {
      throw e;
    }
  }
);

const initialState: ProductsStateType = {
  groups: [],
  isLoading: false,
  hasError: false,
  errorMessage: "",
};

export const groupSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGroups.pending, (state) => {
      state.hasError = false;
      state.isLoading = true;
    });
    builder.addCase(fetchGroups.fulfilled, (state, action) => {
      state.groups = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchGroups.rejected, (state, action) => {
      state.hasError = true;
      state.errorMessage = action.error.message;
      state.isLoading = false;
    });
  },
});

export default groupSlice.reducer;
