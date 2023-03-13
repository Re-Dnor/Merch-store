import { Typography } from "@alfalab/core-components/typography";
import { useNavigate } from "react-router";
import { Row } from "shared/ui";

import styles from "./styles.module.scss";

export const SwitchPage = () => {
  const navigate = useNavigate();

  const switchToMadeInAlfa = () => {
    navigate("/made-in-alfa");
  };

  const switchToYourDesign = () => {
    navigate("/your-design");
  };

  return (
    <Row className={styles.home}>
      <Row
        className={`${styles.home__background} ${styles.home__background_madeIn}`}
        onClick={switchToMadeInAlfa}
      >
        <Typography.Text className={styles.home__description}>
          Сделано в Альфе
        </Typography.Text>
      </Row>
      <Row
        className={`${styles.home__background} ${styles.home__background_yourD}`}
        onClick={switchToYourDesign}
      >
        <Typography.Text className={styles.home__description}>
          Свой дизайн
        </Typography.Text>
      </Row>
    </Row>
  );
};
