import { useBooleanParamsPropsType } from "../types";

export const useBooleanParams = ({
  colors,
  color,
  sizes,
  size,
  stickers,
  stickerNum,
}: useBooleanParamsPropsType) => {
  const booleanColor = colors === null ? false : !color?.length;
  const booleanSize = sizes === null ? false : !size?.length;
  const booleanSticker = stickers === null ? false : !stickerNum?.length;

  const disabledBtn = booleanColor || booleanSize || booleanSticker;

  return disabledBtn;
};
