export const getDeliveryPrice = (type: string) => {
  if (type === "Pickup") {
    return "Самовывоз (пр-т Андропова, 18 корп. 3)";
  }
  if (type === "Moscow") {
    return "Курьером по Москве — 300₽";
  }
  if (type === "Russia") {
    return "Доставка по России — 350₽";
  }

  return "Самовывоз (пр-т Андропова, 18 корп. 3)";
};
