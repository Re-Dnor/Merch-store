import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCurrentProduct } from "shared/api";
import { GroupProductsType } from "shared/api/types";

import { CurrentProductType } from "../types";

export const fetchCurrentProduct = createAsyncThunk(
  "currentProduct/fetchData",
  async (id: string): Promise<GroupProductsType> => {
    try {
      const response = await getCurrentProduct(id);
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

const initialState: CurrentProductType = {
  isLoading: false,
  hasError: false,
  errorMessage: "",
  title: "",
  subtitle: "",
  description: "",
  price: 0,
  preview: "",
  startImg: "",
  images: [],
  stickerNumbers: null,
  colors: null,
  sizes: null,
  availability: null,
};

export const currentProductSlice = createSlice({
  name: "currentProduct",
  initialState,
  reducers: {
    handleSwithPreview: (state, action: PayloadAction<string>) => {
      state.startImg = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentProduct.pending, () => {
      return {
        ...initialState,
        isLoading: true,
        hasError: false,
      };
    });
    builder.addCase(fetchCurrentProduct.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        startImg: action.payload.preview,
        ...action.payload,
      };
    });
    builder.addCase(fetchCurrentProduct.rejected, (state, action) => {
      return {
        ...state,
        isLoading: false,
        hasError: true,
        errorMessage: action.error.message,
      };
    });
  },
});

export const { handleSwithPreview } = currentProductSlice.actions;

export default currentProductSlice.reducer;
