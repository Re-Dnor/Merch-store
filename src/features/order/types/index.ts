export type BasketItem = {
  title: string;
  totalPrice: number;
  size: string | null;
  color: string | null;
  stickerNumber: number | null;
  id: string;
  preview: string;
  totalCount: number;
  startId: string | undefined;
};

export type ProductsStateType = {
  list: BasketItem[];
  name: string;
  email: string;
  phone: string;
  address: string;
  deliveryType: string;
  comment?: string;
  deliveryPrice: number;
};

export type PersonDataPropsType = {
  name: string;
  email: string;
  phone: string;
  deliveryType: string;
  address: string;
  comment?: string;
  confirmation: boolean;
  list: BasketItem[];
};

export type useDeliveryPriceType = [string] | [];
