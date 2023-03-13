import { Link } from "react-router-dom";
import { List } from "@alfalab/core-components/list";
import { SidePanelResponsive } from "@alfalab/core-components/side-panel/responsive";
import { Typography } from "@alfalab/core-components/typography";
import { ActionButton } from "@alfalab/core-components/action-button";
import { MailIcon, PhoneIcon, WhatsAppIcon } from "shared/icons";
import { SidePanelPropsType } from "../types";
import styles from "../styles.module.scss";

export const SidePanelMenuContent = ({
  handleModalClose,
}: SidePanelPropsType) => {
  return (
    <>
      <SidePanelResponsive.Header dataTestId="header-side-panel" />
      <SidePanelResponsive.Content>
        <div>
          <List tag="ul" marker={<></>}>
            <Link
              className={styles.link}
              to="/made-in-alfa"
              onClick={handleModalClose}
            >
              Сделано в Альфе
            </Link>
            <Link
              className={styles.link}
              to="/your-design"
              onClick={handleModalClose}
            >
              Свой дизайн
            </Link>
            <Link
              className={styles.link}
              to="/contacts"
              onClick={handleModalClose}
            >
              Контакты
            </Link>
            <Link
              className={styles.link}
              to="/basket"
              onClick={handleModalClose}
            >
              Заказ
            </Link>
          </List>
        </div>
      </SidePanelResponsive.Content>
      <SidePanelResponsive.Footer>
        <List tag="ul" marker={<></>}>
          <Typography.Text tag="p">
            Политика конфиденциальности и обработки персональных данных
          </Typography.Text>
          <div>
            <ActionButton
              view="secondary"
              icon={<MailIcon />}
              target="_blank"
            />
            <ActionButton
              view="secondary"
              icon={<PhoneIcon />}
              target="_blank"
            />
            <ActionButton
              icon={<WhatsAppIcon />}
              view="secondary"
              target="_blank"
            />
          </div>
        </List>
      </SidePanelResponsive.Footer>
    </>
  );
};
