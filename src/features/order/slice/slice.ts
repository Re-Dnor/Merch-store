import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createProduct } from "shared/api";
import { error, success } from "shared/ui/notifications/slice/slice";
import { notificationError, notificationSuccess } from "../constants";
import { getDeliveryPrice } from "../helpers";

import { BasketItem, PersonDataPropsType, ProductsStateType } from "../types";

const initialState: ProductsStateType = {
  list: [],
  name: "",
  email: "",
  phone: "",
  address: "",
  deliveryType: "",
  comment: "",
  deliveryPrice: 0,
};

export const formSubmission = createAsyncThunk(
  "order/submitForm",
  async (personData: PersonDataPropsType, { dispatch }) => {
    try {
      const { list, deliveryType } = personData;
      const newList = list.map((product) => ({
        ...product,
        id: product.startId,
        model: product.title,
      }));
      const delivery = getDeliveryPrice(deliveryType);
      const data = {
        ...personData,
        list: newList,
        deliveryType: delivery,
        paymentType: "Банковская карта",
      };
      const response = await createProduct(data);

      if (!response.ok) {
        throw response.statusText;
      }

      dispatch(success({ title: notificationSuccess }));
    } catch (e) {
      dispatch(error({ title: notificationError }));
      throw e;
    }
  }
);

export const basketSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addInBasketProduct: (state, action: PayloadAction<BasketItem>) => {
      // Товар уже добален в корзину, увеличиваем его кол-во
      if (state.list.some((prod) => prod.id === action.payload.id)) {
        const newList = state.list.map((prod) => {
          if (prod.id === action.payload.id) {
            prod.totalCount++;
          }
          return prod;
        });
        state.list = newList;
        // пушим новый товар
      } else {
        state.list.push(action.payload);
      }
    },
    setDeliveryPrice: (state, action) => {
      if (action.payload === "Pickup") {
        state.deliveryPrice = 0;
      }
      if (action.payload === "Moscow") {
        state.deliveryPrice = 300;
      }
      if (action.payload === "Russia") {
        state.deliveryPrice = 350;
      }
    },
    removeProduct: (state, action: PayloadAction<string>) => {
      const newList = state.list.filter((prod) => prod.id !== action.payload);
      state.list = newList;
    },

    plusCountOfProduct: (state, action: PayloadAction<string>) => {
      const newList = state.list.map((prod) => {
        if (prod.id === action.payload) {
          prod.totalCount++;
        }
        return prod;
      });
      state.list = newList;
    },

    minusCountOfProdcut: (state, action: PayloadAction<string>) => {
      const newList = state.list.map((prod) => {
        if (prod.id === action.payload) {
          prod.totalCount--;
        }
        return prod;
      });
      state.list = newList;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(formSubmission.fulfilled, () => {
      return { ...initialState, isLoad: true };
    });
  },
});

export const {
  addInBasketProduct,
  removeProduct,
  plusCountOfProduct,
  minusCountOfProdcut,
  setDeliveryPrice,
} = basketSlice.actions;

export default basketSlice.reducer;
