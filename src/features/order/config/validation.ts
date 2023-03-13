import * as yup from "yup";

export const schema = yup.object({
  name: yup.string().required("Введите имя"),
  email: yup
    .string()
    .email("Введите корреткную почту")
    .required("Введите почту"),
  phone: yup.string().min(16, "Введите корректный номер телефона"),
  deliveryType: yup.string().required("Выберите доставку"),
  address: yup.string().required("Введите адрес доставки"),
  comment: yup.string(),
  confirmation: yup.bool().required("Подтверждение"),
});
