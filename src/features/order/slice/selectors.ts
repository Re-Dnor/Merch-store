import { ApplicationState } from "app/store";

export const mainSelector = (state: ApplicationState) => state.basket;

export const basketList = (state: ApplicationState) => mainSelector(state).list;
export const basketDelivery = (state: ApplicationState) =>
  mainSelector(state).deliveryPrice;
