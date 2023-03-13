import { useAppSelector } from "app/store";
import { Typography } from "@alfalab/core-components/typography";
import { Gap } from "@alfalab/core-components/gap";
import { Col } from "shared/ui";

import { groupsSelector } from "./slice/selectors";
import { ProductList } from "./product-list";
import styles from "./styles.module.scss";

export const Groups = () => {
  const groups = useAppSelector(groupsSelector);

  return (
    <Col className={styles.wrapper}>
      {groups.map((group, index) => (
        <div key={group.title} className={styles.group}>
          <Typography.Title tag="h1">{group.title}</Typography.Title>
          <Typography.Text>{group.description}</Typography.Text>
          <Gap size="l" />
          <ProductList products={group.products} />
          {index + 1 !== groups.length && <Gap size="2xl" />}
        </div>
      ))}
    </Col>
  );
};
