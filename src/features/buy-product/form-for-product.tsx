import { ChangeEvent, useState } from "react";
import { SelectResponsive } from "@alfalab/core-components/select/Component.responsive";
import { BaseSelectChangePayload } from "@alfalab/core-components/select";
import { Gap } from "@alfalab/core-components/gap";
import { Button } from "@alfalab/core-components/button";

import { FormForProductPropsType } from "./types";
import styles from "./styles.module.scss";
import { useBooleanParams } from "./hooks/use-boolean-params";
import { success } from "shared/ui/notifications/slice/slice";
import { useAppDispatch } from "app/store";

export const FormForProduct = ({
  colors,
  sizes,
  stickers,
  handleSubmit,
}: FormForProductPropsType) => {
  const [color, setColor] = useState<string[]>([]);
  const [size, setSize] = useState<string[]>([]);
  const [stickerNum, setStickerNum] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  //Хук для блокировки/разблокировки кнопки
  const disabledBtn = useBooleanParams({
    colors,
    color,
    sizes,
    size,
    stickers,
    stickerNum,
  });

  const handleChangeColor = ({ selectedMultiple }: BaseSelectChangePayload) => {
    setColor(selectedMultiple.map((option) => option.key));
  };

  const handleChangeSize = ({ selectedMultiple }: BaseSelectChangePayload) => {
    setSize(selectedMultiple.map((option) => option.key));
  };

  const handleChangeSticker = ({
    selectedMultiple,
  }: BaseSelectChangePayload) => {
    setStickerNum(selectedMultiple.map((option) => option.key));
  };

  const handleClick = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    let colorContent = null,
      sizeContent = null,
      stickerContent = null;
    if (colors)
      colorContent = colors.filter((c) => c.key === color[0])[0].content;
    if (sizes) sizeContent = sizes.filter((s) => s.key === size[0])[0].content;
    if (stickers)
      stickerContent = stickers.filter((s) => s.key === stickerNum[0])[0]
        .content;

    handleSubmit(colorContent, sizeContent, stickerContent);
    dispatch(success({ title: "Товар успешно добавлен в корзину" }));
  };

  return (
    <form className={styles.form} onSubmit={handleClick}>
      {colors && (
        <>
          <SelectResponsive
            dataTestId="color-id"
            block
            options={colors}
            size="m"
            placeholder="Цвет"
            name="color"
            selected={color}
            onChange={handleChangeColor}
          />
          <Gap size="m" />
        </>
      )}
      {sizes && (
        <>
          <SelectResponsive
            block
            options={sizes}
            size="m"
            placeholder="Размер"
            name="size"
            selected={size}
            onChange={handleChangeSize}
          />
          <Gap size="m" />
        </>
      )}

      {stickers && (
        <>
          <SelectResponsive
            block
            options={stickers}
            size="m"
            placeholder="Номер стикера"
            name="stickerNumber"
            selected={stickerNum}
            onChange={handleChangeSticker}
          />
          <Gap size="m" />
        </>
      )}
      <Button view="primary" disabled={disabledBtn} type="submit">
        В корзину
      </Button>
    </form>
  );
};
