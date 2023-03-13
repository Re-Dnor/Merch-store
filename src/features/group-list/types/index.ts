import { GroupProductsType, GroupType } from "shared/api/types";

export type ProductsStateType = {
  groups: GroupType[];
  isLoading: boolean;
  hasError: boolean;
  errorMessage: string | undefined;
};

export type ProductListPropsType = {
  products: GroupProductsType[];
};
