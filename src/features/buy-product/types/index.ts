import { ColorType, SizeType } from "shared/api/types";

export type CurrentProductType = {
  isLoading: boolean;
  hasError: boolean;
  errorMessage: string | undefined;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  preview: string;
  startImg: string;
  images: string[];
  stickerNumbers: number[] | null;
  colors: ColorType[] | null;
  sizes: SizeType[] | null;
  availability: boolean | null;
};

type optionColor = {
  key: string;
  content: string;
};

type optionSize = {
  key: string;
  content: string;
};

type optionSticker = {
  key: string;
  content: number;
};

export type FormForProductPropsType = {
  colors: optionColor[] | null;
  sizes: optionSize[] | null;
  stickers: optionSticker[] | null;
  handleSubmit: (
    arg0: string | null,
    arg1: string | null,
    arg2: number | null
  ) => void;
};

export type useBooleanParamsPropsType = {
  colors: optionColor[] | null;
  color: string[];
  sizes: optionSize[] | null;
  size: string[];
  stickers: optionSticker[] | null;
  stickerNum: string[];
};
