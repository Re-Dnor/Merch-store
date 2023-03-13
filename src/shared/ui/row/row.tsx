import { ReactNode } from "react";

import styles from "./styles.module.scss";

export type RowPropsType = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

export const Row = ({ children, className, onClick }: RowPropsType) => {
  return (
    <div className={`${styles.row} ${className}`} onClick={onClick}>
      {children}
    </div>
  );
};
