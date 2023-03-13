import { useNavigate } from "react-router";
import { Button } from "@alfalab/core-components/button";
import { Gap } from "@alfalab/core-components/gap";
import { Typography } from "@alfalab/core-components/typography";

export const GoingHome = () => {
  const navigate = useNavigate();

  const relocate = () => {
    navigate("/");
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  };

  return (
    <>
      <Typography.Title tag="h1">
        Простите... что-то пошло не так
      </Typography.Title>
      <Gap size="m" />
      <Button onClick={relocate}>Перейти на главную</Button>
    </>
  );
};
