import { OptionShape } from "@alfalab/core-components/select";

export const optionsForDelivery: OptionShape[] = [
  { key: "1", content: "Доставка по России — 350₽", value: "Russia" },
  { key: "2", content: "Доставка по Москве — 300₽", value: "Moscow" },
  {
    key: "3",
    content: "Самовывоз (пр-т Андропова, 18 корп. 3)",
    value: "Pickup",
  },
];
