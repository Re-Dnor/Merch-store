import { useAppDispatch, useAppSelector } from "app/store";
import { useEffect } from "react";
import { useParams } from "react-router";

import { translation } from "../../../shared/helpers";
import { mainSelector } from "../slice/selectors";
import { fetchCurrentProduct } from "../slice/slice";

export const useProductData = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const {
    isLoading,
    hasError,
    errorMessage,
    title,
    price,
    preview,
    images,
    colors,
    sizes,
    stickerNumbers,
    description,
    availability,
    startImg,
  } = useAppSelector(mainSelector);
  const optionsColors = colors
    ? colors.map((color, i) => ({
        key: String(i + 1),
        content: translation(color),
      }))
    : null;

  const optionsSizes = sizes
    ? sizes.map((size, i) => ({ key: String(i + 1), content: size }))
    : null;

  const optionsStickerNumbers = stickerNumbers
    ? stickerNumbers.map((sticker, i) => ({
        key: String(i + 1),
        content: sticker,
      }))
    : null;

  useEffect(() => {
    if (id) {
      dispatch(fetchCurrentProduct(id));
    }
  }, []);

  return {
    isLoading,
    hasError,
    errorMessage,
    title,
    price,
    preview,
    images,
    colors: optionsColors,
    sizes: optionsSizes,
    stickerNumbers: optionsStickerNumbers,
    description,
    availability,
    startImg,
    id,
  };
};
