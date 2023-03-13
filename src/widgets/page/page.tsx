import { Col } from "shared/ui";
import { Footer, Header } from "entities";
import { Notifications } from "shared/ui";
import { PagePropsType } from "./types";
import styles from "./styles.module.scss";

export const Page = ({ children }: PagePropsType) => {
  return (
    <Col className={styles.wrapper}>
      <Notifications />
      <Header />
      <Col className={styles.wrapper__content}>{children}</Col>
      <Footer />
    </Col>
  );
};
