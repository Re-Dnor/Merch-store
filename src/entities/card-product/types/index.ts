export type CardProductPropsType = {
  title: string;
  preview: string;
  subtitle: string | null;
  price: number;
  id: number;
  handleClick: (id: number) => void;
};

export type CardImgPropsType = {
  preview: string;
  id: number;
  handleClick: (id: number) => void;
};
