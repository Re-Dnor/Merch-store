import { DataType } from "./types";

const BASE_URL = "http://qa-games.ru/astore";
const YOUR_DESIGN = "/your-design";
const MADE_IN_ALFA = "/made-in-alfa";
const PRODUCT = "/product/";
const CREATE_PRODUCT = "/create-order";

export const getProductByYourDesign = async () => fetch(BASE_URL + YOUR_DESIGN);

export const getProductByMadeInAlfa = async () =>
  fetch(BASE_URL + MADE_IN_ALFA);

export const getCurrentProduct = async (id: string) =>
  fetch(`${BASE_URL + PRODUCT}${id}`);

export const createProduct = async (data: DataType) =>
  fetch(BASE_URL + CREATE_PRODUCT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
