import { Typography } from "@alfalab/core-components/typography";
import { Row } from "shared/ui";
import styles from "./styles.module.scss";

export const Footer = () => {
  return (
    <Row className={styles.footer}>
      <Typography.Text className={styles.footer__text}>
        © ООО «Альфа Фьюче Пипл», 2023
      </Typography.Text>
    </Row>
  );
};
