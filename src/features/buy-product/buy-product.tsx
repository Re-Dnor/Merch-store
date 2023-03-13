import { Gap } from "@alfalab/core-components/gap";
import { Spinner } from "@alfalab/core-components/spinner";
import { Typography } from "@alfalab/core-components/typography";
import { GalleryImages, ErrorMessage } from "entities";
import { useAppDispatch } from "app/store";
import { addInBasketProduct } from "features/order/slice/slice";
import { Col, Row } from "shared/ui";

import { useProductData } from "./hooks/use-product-data";
import { FormForProduct } from "./form-for-product";
import styles from "./styles.module.scss";

export const BuyProduct = () => {
  const {
    isLoading,
    title,
    price,
    preview,
    images,
    description,
    availability,
    colors,
    sizes,
    stickerNumbers,
    startImg,
    hasError,
    errorMessage,
    id,
  } = useProductData();
  const dispatch = useAppDispatch();

  const handleSubmit = (
    color: string | null,
    size: string | null,
    sticker: number | null
  ) => {
    const customId = title + color + size + sticker;
    const data = {
      title,
      totalPrice: price,
      color,
      size,
      id: customId,
      preview,
      stickerNumber: sticker,
      totalCount: 1,
      startId: id,
    };

    dispatch(addInBasketProduct(data));
  };

  if (isLoading) {
    return (
      <div className={styles.wrapper}>
        <Spinner visible size="m" />
      </div>
    );
  }

  if (hasError) {
    return <ErrorMessage text={errorMessage} />;
  }

  return (
    <Row className={styles.wrapper}>
      <Col className={styles.images}>
        <img className={styles.preview} src={startImg} alt="preview product" />
        <GalleryImages images={images} />
      </Col>
      <Col className={styles.description}>
        <Typography.Title tag="h1">{title}</Typography.Title>
        <Gap size="m" />
        <Typography.Text className={styles.price}>{price}₽</Typography.Text>
        <Gap size="m" />
        {availability ? (
          <FormForProduct
            colors={colors}
            sizes={sizes}
            stickers={stickerNumbers}
            handleSubmit={handleSubmit}
          />
        ) : (
          <Typography.Text>Простите, но товар закончился.</Typography.Text>
        )}
        <Gap size="m" />
        <Typography.Text>{description}</Typography.Text>
      </Col>
    </Row>
  );
};
