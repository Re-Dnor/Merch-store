import { memo } from "react";
import { GalleryImgPropsType } from "./types";
import styles from "./styles.module.scss";

export const GalleryImg = memo(({ img, handleClick }: GalleryImgPropsType) => {
  const switchImage = () => {
    handleClick(img);
  };
  return (
    <img
      className={styles.gallery__img}
      src={img}
      alt="Gallery images"
      onClick={switchImage}
    />
  );
});
