import React, { useCallback } from "react";
import { useNavigate } from "react-router";
import { SidePanelResponsive } from "@alfalab/core-components/side-panel/Component.responsive";
import { Divider } from "@alfalab/core-components/divider";
import { Typography } from "@alfalab/core-components/typography";
import { Gap } from "@alfalab/core-components/gap";
import { Button } from "@alfalab/core-components/button";
import { useAppDispatch, useAppSelector } from "app/store";
import { basketList } from "features/order/slice/selectors";
import {
  minusCountOfProdcut,
  plusCountOfProduct,
  removeProduct,
} from "features/order/slice/slice";
import { Col, Row } from "shared/ui";
import { ButtonSwitchCounter } from "shared/ui/button-switch-counter/button-switch-counter";
import { translation } from "shared/helpers";
import { SidePanelPropsType } from "../types";
import styles from "../styles.module.scss";

export const SidePanelBasketContent = ({
  handleModalClose,
}: SidePanelPropsType) => {
  const list = useAppSelector(basketList);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const totalPriceBasket = list.reduce(
    (acc, val) => (acc += val.totalPrice * val.totalCount),
    0
  );

  const handleMinusCount = useCallback(
    (id: string, count: number) => {
      if (count <= 1) {
        dispatch(removeProduct(id));
        if (list.length <= 1) {
          handleModalClose();
        }
      } else {
        dispatch(minusCountOfProdcut(id));
      }
    },
    [dispatch, list.length, handleModalClose]
  );

  const handlePlusCount = useCallback(
    (id: string) => {
      dispatch(plusCountOfProduct(id));
    },
    [dispatch]
  );

  const switchToBasket = () => {
    handleModalClose();
    navigate("/basket");
  };

  return (
    <>
      <SidePanelResponsive.Header dataTestId="header-side-panel">
        <Typography.Title tag="h1">Ваш заказ</Typography.Title>
        <Gap size="l" />
        <Divider />
      </SidePanelResponsive.Header>
      <SidePanelResponsive.Content>
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
                <Col>
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
                      data-test-id="count-product-test-id"
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
              </Row>
              <Gap size="l" />
              <Divider />
            </React.Fragment>
          )
        )}
        <Gap size="l" />
        <Col className={styles.total}>
          <Typography.Text className={styles.sum}>
            Сумма: {totalPriceBasket} ₽
          </Typography.Text>
          <Gap size="l" />
          <Button view="tertiary" onClick={switchToBasket}>
            Далее
          </Button>
        </Col>
      </SidePanelResponsive.Content>
    </>
  );
};
