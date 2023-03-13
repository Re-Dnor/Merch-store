export type SizeType = "XS" | "S" | "M" | "L" | "XL" | "XXL";
export type ColorType = "white" | "black" | "red" | "green" | "gray";

export type GroupProductsType = {
  id: number;
  preview: string;
  images: string[];
  title: string;
  subtitle: string;
  price: number;
  description: string;
  colors: ColorType[];
  sizes: SizeType[];
  stickerNumbers: number[];
  availability: boolean;
};

export type GroupType = {
  id: number;
  title: string;
  description: string;
  products: GroupProductsType[];
};

export type DataGroupsType = {
  groups: GroupType[];
};

export type DataProductsType = {
  products: ProductsType[];
};

export type ProductsType = {
  id: number;
  preview: string;
  title: string;
  price: number;
  availability: boolean;
};

export type DataType = {
  list: {
    id: string | undefined;
    totalPrice: number;
    totalCount: number;
    stickerNumber: number | null;
    color: string | null;
    size: string | null;
    model: string;
  }[];
  name: string;
  email: string;
  phone: string;
  address: string;
  comment?: string | undefined;
  deliveryType: string;
  paymentType: string;
};
