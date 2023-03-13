import { memo } from "react";
import { buttonSwitchCounterPropsType } from "entities/header/types";

import styles from "./styles.module.scss";

export const ButtonSwitchCounter = memo(
  ({ children, count, id, handleClick }: buttonSwitchCounterPropsType) => {
    const handleMinusCount = () => {
      handleClick(id, count);
    };
    return (
      <button className={styles.basket__changeCount} onClick={handleMinusCount}>
        {children}
      </button>
    );
  }
);
