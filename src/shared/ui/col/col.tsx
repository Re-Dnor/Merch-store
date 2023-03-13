import { ReactNode } from "react";

import styles from "./styles.module.scss";

export type ColPropsType = {
  children: ReactNode;
  className?: string;
  dataTestId?: string;
};

export const Col = ({ children, className, dataTestId }: ColPropsType) => {
  return (
    <div className={`${styles.col} ${className}`} data-test-id={dataTestId}>
      {children}
    </div>
  );
};
