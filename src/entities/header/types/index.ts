import { ReactNode } from "react";

export type SidePanelPropsType = {
  handleModalClose: () => void;
};

export type buttonSwitchCounterPropsType = {
  children: ReactNode;
  count: number;
  id: string;
  handleClick: (id: string, count: number) => void;
};
