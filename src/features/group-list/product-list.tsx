import { Grid } from "@alfalab/core-components/grid";
import { useNavigate } from "react-router";
import { CardProduct } from "entities";
import { useCallback } from "react";

import { ProductListPropsType } from "./types";

export const ProductList = ({ products }: ProductListPropsType) => {
  const navigate = useNavigate();

  const handleClick = useCallback(
    (id: number) => {
      navigate(`/products/${id}`);
    },
    [navigate]
  );

  return (
    <Grid.Row gutter={0}>
      {products.map(({ title, subtitle, id, preview, price }) => (
        <CardProduct
          key={title}
          title={title}
          subtitle={subtitle}
          id={id}
          preview={preview}
          price={price}
          handleClick={handleClick}
        />
      ))}
    </Grid.Row>
  );
};
