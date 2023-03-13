import { Link } from "react-router-dom";
import { Typography } from "@alfalab/core-components/typography";
import { Button } from "@alfalab/core-components/button";
import { Col } from "shared/ui";
import { ErrorMessagePropsType } from "./types";
import styles from "./styles.module.scss";

export const ErrorMessage = ({ text }: ErrorMessagePropsType) => {
  return (
    <Col className={styles.error}>
      <Typography.Title className={styles.error__title} tag="h1">
        Возникла ошибка
      </Typography.Title>
      <Typography.Text className={styles.error__subtitle}>
        {text}
      </Typography.Text>
      <Link className={styles.link} to="/">
        <Button view="primary">На главную</Button>
      </Link>
    </Col>
  );
};
