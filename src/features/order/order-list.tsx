import React, { useCallback } from "react";
import { Gap } from "@alfalab/core-components/gap";
import { Scrollbar } from "@alfalab/core-components/scrollbar";
import { Typography } from "@alfalab/core-components/typography";
import { useAppDispatch, useAppSelector } from "app/store";
import { ButtonSwitchCounter, Col, Row } from "shared/ui";
import { translation } from "shared/helpers";

import { basketDelivery, basketList } from "./slice/selectors";
import {
  minusCountOfProdcut,
  plusCountOfProduct,
  removeProduct,
} from "./slice/slice";
import styles from "./styles.module.scss";

export const OrderList = () => {
  const list = useAppSelector(basketList);
  const priceDelivery = useAppSelector(basketDelivery);
  const totalPrice =
    list.reduce((acc, val) => (acc += val.totalPrice * val.totalCount), 0) +
    Number(priceDelivery);
  const dispatch = useAppDispatch();
  const handleMinusCount = useCallback(
    (id: string, count: number) => {
      if (count <= 1) {
        dispatch(removeProduct(id));
      } else {
        dispatch(minusCountOfProdcut(id));
      }
    },
    [dispatch]
  );

  const handlePlusCount = useCallback(
    (id: string) => {
      dispatch(plusCountOfProduct(id));
    },
    [dispatch]
  );

  if (list.length === 0) {
    return (
      <div className={styles.empty}>
        <Typography.Text className={styles.empty__basket}>
          Ваша корзина пуста :С
        </Typography.Text>
      </div>
    );
  }

  return (
    <Col className={styles.list}>
      <Scrollbar className={styles.scrollbar}>
        {list.map(
          ({
            color,
            totalPrice,
            size,
            stickerNumber,
            title,
            totalCount,
            preview,
            id,
          }) => (
            <React.Fragment key={id}>
              <Gap size="m" />
              <Row className={styles.basket}>
                <Col className={styles.basket__wrapper}>
                  <img
                    className={styles.basket__preview}
                    src={preview}
                    alt="preview img"
                  />
                  <Row className={styles.basket__countOfProducts}>
                    <ButtonSwitchCounter
                      count={totalCount}
                      id={id}
                      handleClick={handleMinusCount}
                    >
                      -
                    </ButtonSwitchCounter>
                    <p
                      className={styles.basket__count}
                      data-test-id="order-item-test-id"
                    >
                      {totalCount}
                    </p>
                    <ButtonSwitchCounter
                      count={totalCount}
                      id={id}
                      handleClick={handlePlusCount}
                    >
                      +
                    </ButtonSwitchCounter>
                  </Row>
                </Col>
                <Col className={styles.basket__description}>
                  <Typography.Text className={styles.basket__title}>
                    {title}
                  </Typography.Text>
                  {color && (
                    <Typography.Text>
                      Цвет: {translation(color)}
                    </Typography.Text>
                  )}
                  {size && <Typography.Text>Размер: {size}</Typography.Text>}
                  {stickerNumber && (
                    <Typography.Text>
                      Номер стикера: {stickerNumber}
                    </Typography.Text>
                  )}
                  <Typography.Text>
                    Цена: {totalPrice * totalCount}₽
                  </Typography.Text>
                </Col>
              </Row>
              <Gap size="l" />
            </React.Fragment>
          )
        )}
      </Scrollbar>
      <Gap size="xl" />
      <Col className={styles.final}>
        <Typography.Text className={styles.delivery}>
          Доставка: {priceDelivery} ₽
        </Typography.Text>
        <Typography.Text className={styles.sum}>
          Общая сумма: {totalPrice} ₽
        </Typography.Text>
      </Col>
    </Col>
  );
};
