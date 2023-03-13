import { Typography } from "@alfalab/core-components/typography";
import { Divider } from "@alfalab/core-components/divider";
import { Gap } from "@alfalab/core-components/gap";
import { OrderList } from "features/order/order-list";
import { Col, Row } from "shared/ui";

import styles from "./styles.module.scss";
import { FormForOrder } from "./form-for-order";

export const Order = () => {
  return (
    <Col className={styles.order}>
      <Typography.Title tag="h1" className={styles.title}>
        Ваш заказ
      </Typography.Title>
      <Gap size="s" />
      <Divider />
      <Gap size="xl" />
      <Row className={styles.wrapper}>
        <FormForOrder />
        <OrderList />
      </Row>
    </Col>
  );
};
