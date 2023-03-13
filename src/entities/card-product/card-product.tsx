import { memo } from "react";
import { Gap } from "@alfalab/core-components/gap";
import { Grid } from "@alfalab/core-components/grid";
import { Typography } from "@alfalab/core-components/typography";
import { Col } from "shared/ui";
import { CardProductPropsType } from "./types";
import styles from "./styles.module.scss";

export const CardProduct = memo(
  ({
    title,
    preview,
    subtitle,
    price,
    id,
    handleClick,
  }: CardProductPropsType) => {
    const navigateTo = () => {
      handleClick(id);
    };

    return (
      <Grid.Col key={title} width={{ mobile: 12, tablet: 5, desktop: 4 }}>
        <Col className={styles.item} dataTestId="product-item">
          <img
            className={styles.img}
            src={preview}
            alt="Product"
            data-test-id={`card-image-${id}`}
            onClick={navigateTo}
          />
          <Gap size={"s"} />
          <Typography.Title className={styles.title} tag="h2">
            {title}
          </Typography.Title>
          <Gap size={"3xs"} />
          <Typography.Text className={styles.subtitle}>
            {subtitle}
          </Typography.Text>
          <Gap size={"3xs"} />
          <Typography.Text className={styles.price}>{price}₽</Typography.Text>
          <Gap size={"s"} />
        </Col>
      </Grid.Col>
    );
  }
);
