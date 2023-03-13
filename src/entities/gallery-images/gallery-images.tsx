import { useCallback } from "react";
import { useAppDispatch } from "app/store";
import { handleSwithPreview } from "features/buy-product/slice/slice";
import { Row } from "shared/ui";
import { GalleryImagesPropsType } from "./types";
import { GalleryImg } from "./gallery-img";
import styles from "./styles.module.scss";

export const GalleryImages = ({ images }: GalleryImagesPropsType) => {
  const dispatch = useAppDispatch();

  const handleClick = useCallback(
    (img: string) => {
      dispatch(handleSwithPreview(img));
    },
    [dispatch]
  );

  return (
    <Row className={styles.gallery}>
      {images.map((img) => (
        <GalleryImg key={img} img={img} handleClick={handleClick} />
      ))}
    </Row>
  );
};
