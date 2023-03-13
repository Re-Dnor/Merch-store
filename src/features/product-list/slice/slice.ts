import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProductByMadeInAlfa } from "shared/api";
import { ProductsType } from "shared/api/types";

import { ProductsStateType } from "../types";

export const fetchProducts = createAsyncThunk(
  "products/fetchData",
  async (): Promise<ProductsType[]> => {
    try {
      const response = await getProductByMadeInAlfa();
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
  products: [],
  isLoading: false,
  hasError: false,
  errorMessage: "",
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.hasError = false;
      state.isLoading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.hasError = true;
      state.errorMessage = action.error.message;
      state.isLoading = false;
    });
  },
});

export default productsSlice.reducer;
