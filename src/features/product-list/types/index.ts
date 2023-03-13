import { ProductsType } from "shared/api/types";

export type ProductsStateType = {
  products: ProductsType[];
  isLoading: boolean;
  hasError: boolean;
  errorMessage: string | undefined;
};
