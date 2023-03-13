export const translation = (color: string) => {
  if (color === "white") return "Белый";
  if (color === "black") return "Черный";
  if (color === "red") return "Красный";
  if (color === "green") return "Зеленый";
  if (color === "gray") return "Серый";

  return color;
};
