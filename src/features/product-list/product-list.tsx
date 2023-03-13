import { Gap } from "@alfalab/core-components/gap";
import { Typography } from "@alfalab/core-components/typography";
import { Spinner } from "@alfalab/core-components/spinner";
import { Grid } from "@alfalab/core-components/grid";
import { useAppDispatch, useAppSelector } from "app/store";
import { useCallback, useEffect } from "react";
import { CardProduct, ErrorMessage } from "entities";
import { useNavigate } from "react-router";
import { Col } from "shared/ui";

import { productsSelector } from "./slice/selectors";
import { fetchProducts } from "./slice/slice";
import styles from "./styles.module.scss";

export const ProductList = () => {
  const { products, isLoading, errorMessage, hasError } =
    useAppSelector(productsSelector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClick = useCallback(
    (id: number) => {
      navigate(`/products/${id}`);
    },
    [navigate]
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  if (hasError) {
    return <ErrorMessage text={errorMessage} />;
  }

  return (
    <Col className={styles.products}>
      <Typography.Title className={styles.products__title} tag="h1">
        Сделано в Альфе
      </Typography.Title>
      <Typography.Text className={styles.products__subtitle}>
        Хотим каждую из этих вещей! Себе, родным и друзьям
      </Typography.Text>
      <Gap size="l" />
      {isLoading ? (
        <Spinner visible size="m" />
      ) : (
        <Grid.Row gutter={0}>
          {products.map(({ title, id, preview, price }) => (
            <CardProduct
              key={title}
              title={title}
              subtitle={null}
              id={id}
              preview={preview}
              price={price}
              handleClick={handleClick}
            />
          ))}
        </Grid.Row>
      )}
    </Col>
  );
};
