import { useEffect } from "react";
import { Gap } from "@alfalab/core-components/gap";
import { Spinner } from "@alfalab/core-components/spinner";
import { Typography } from "@alfalab/core-components/typography";
import { useAppDispatch, useAppSelector } from "app/store";
import { ErrorMessage } from "entities";
import { Col } from "shared/ui";

import { Groups } from "./groups";
import { loadingSelector, mainSelector } from "./slice/selectors";
import { fetchGroups } from "./slice/slice";
import styles from "./styles.module.scss";

export const GroupsList = () => {
  const isLoading = useAppSelector(loadingSelector);
  const { hasError, errorMessage } = useAppSelector(mainSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchGroups());
  }, []);

  if (hasError) {
    return <ErrorMessage text={errorMessage} />;
  }

  return (
    <Col className={styles.groups}>
      <Typography.Title className={styles.groups__title} tag="h1">
        Свой дизайн
      </Typography.Title>
      <Typography.Title className={styles.groups__subtitle} tag="h2">
        Выберите вещь, а затем — цвет, размер и стикер. Перенесём стикер на вещь
        как на фото
      </Typography.Title>
      <Gap size="l" />
      {isLoading ? <Spinner visible size="m" /> : <Groups />}
    </Col>
  );
};
