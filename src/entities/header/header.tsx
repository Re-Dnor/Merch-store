import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@alfalab/core-components/button";
import { SidePanelResponsive } from "@alfalab/core-components/side-panel/responsive";
import { MenuIcon } from "shared/icons";
import { BasketIcon } from "shared/icons";
import { useAppSelector } from "app/store";
import { basketList } from "features/order/slice/selectors";
import { Row } from "shared/ui";
import { SidePanelBasketContent, SidePanelMenuContent } from "./side-panels";
import styles from "./styles.module.scss";

export const Header = () => {
  const [open, setOpen] = useState(false);
  const [openBasket, setOpenBasket] = useState(false);
  const list = useAppSelector(basketList);

  const handleModalOpen = useCallback(() => setOpen(true), []);
  const handleBasketModalOpen = useCallback(() => setOpenBasket(true), []);

  const handleModalClose = useCallback(() => setOpen(false), []);
  const handleBasketModalClose = useCallback(() => setOpenBasket(false), []);

  const calculateItems = () =>
    list.reduce((acc, val) => (acc += val.totalCount), 0);

  return (
    <Row className={styles.header}>
      <Link className={styles.header__title} to="/">
        A-Store
      </Link>
      <div>
        {!!list.length && (
          <Button
            className={styles.header__basket}
            view="ghost"
            leftAddons={<BasketIcon />}
            dataTestId="basket-test-id"
            rightAddons={calculateItems()}
            onClick={handleBasketModalOpen}
          />
        )}
        <Button
          className={styles.header__btn}
          leftAddons={<MenuIcon />}
          view="ghost"
          onClick={handleModalOpen}
        >
          Меню
        </Button>
      </div>
      <SidePanelResponsive open={open} onClose={handleModalClose}>
        <SidePanelMenuContent handleModalClose={handleModalClose} />
      </SidePanelResponsive>
      <SidePanelResponsive open={openBasket} onClose={handleBasketModalClose}>
        <SidePanelBasketContent handleModalClose={handleBasketModalClose} />
      </SidePanelResponsive>
    </Row>
  );
};
