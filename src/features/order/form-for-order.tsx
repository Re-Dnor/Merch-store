import { useState } from "react";
import {
  BaseSelectChangePayload,
  SelectProps,
} from "@alfalab/core-components/select";
import { SelectResponsive } from "@alfalab/core-components/select/responsive";
import { Input } from "@alfalab/core-components/input";
import { IntlPhoneInput } from "@alfalab/core-components/intl-phone-input";
import { Textarea } from "@alfalab/core-components/textarea";
import { Checkbox } from "@alfalab/core-components/checkbox";
import { Button } from "@alfalab/core-components/button";
import { Gap } from "@alfalab/core-components/gap";
import { getIn, useFormik } from "formik";
import { optionsForDelivery } from "features/order/config/options-form";
import { useAppDispatch, useAppSelector } from "app/store";

import { schema } from "./config/validation";
import { formSubmission, setDeliveryPrice } from "./slice/slice";
import { basketList } from "./slice/selectors";
import styles from "./styles.module.scss";

export const FormForOrder = () => {
  const [deliveryValue, setDeliveryValue] = useState<SelectProps["selected"]>(
    []
  );
  const [disabledAddress, setDisabledAddress] = useState<boolean>(false);
  const list = useAppSelector(basketList);
  const dispatch = useAppDispatch();

  const handleChangePhoneNumber = (newValue: string): void => {
    if (formik.values.phone !== newValue) {
      // Бросаем данные в формик
      formik.setValues({ ...formik.values, phone: newValue });
    }
  };

  const handleChangeDelivery = ({
    selectedMultiple,
  }: BaseSelectChangePayload): void => {
    setDeliveryValue(selectedMultiple.map((option) => option.key));
    //Проверки на самовывоз и проброс данных в формик
    formik.setValues(
      selectedMultiple[0].value === "Pickup"
        ? {
            ...formik.values,
            address: "Самовывоз",
            deliveryType: selectedMultiple[0].value,
          }
        : {
            ...formik.values,
            address: "",
            deliveryType: selectedMultiple[0].value,
          }
    );
    setDisabledAddress(selectedMultiple[0].value === "Pickup" ? true : false);

    dispatch(setDeliveryPrice(selectedMultiple[0].value));
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "+7",
      deliveryType: "",
      address: "",
      comment: "",
      confirmation: false,
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(formSubmission({ list, ...values }));
    },
  });

  return (
    <form className={styles.form} onSubmit={formik.handleSubmit}>
      <Input
        type="text"
        label="ФИО"
        id="name"
        name="name"
        size="m"
        block
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.name && formik.errors.name}
      />
      <Gap size="xl" />
      <Input
        id="email"
        name="email"
        type="email"
        label="Email"
        size="m"
        block
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.email && formik.errors.email}
      />
      <Gap size="xl" />
      <IntlPhoneInput
        id="phone"
        name="phone"
        label="Номер телефона"
        block
        readOnly={false}
        value={formik.values.phone}
        onChange={handleChangePhoneNumber}
        onBlur={formik.handleBlur}
        error={getIn(formik.touched, "phone-input") && formik.errors.phone}
      />
      <Gap size="xl" />
      <SelectResponsive
        name="deliveryType"
        id="deliveryType"
        options={optionsForDelivery}
        size="m"
        placeholder="Доставка"
        block
        selected={deliveryValue}
        onChange={handleChangeDelivery}
      />
      <Gap size="xl" />
      <Input
        id="address"
        name="address"
        label="Адрес"
        size="m"
        block
        disabled={disabledAddress}
        value={formik.values.address}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.address && formik.errors.address}
      />
      <Gap size="xl" />
      <Textarea
        id="comment"
        name="comment"
        placeholder="Комментарии к заказу"
        autosize={false}
        resize="vertical"
        minRows={3}
        block
        value={formik.values.comment}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <Gap size="xl" />
      <Checkbox
        name="confirmation"
        id="confirmation"
        label="Согласен с политикой конфиденциальности и обработки персональных данных"
        size="m"
        block
        checked={formik.values.confirmation}
        onChange={formik.handleChange}
      />
      <Gap size="xl" />
      <div style={{ width: "100%" }}>
        <Button
          view="primary"
          type="submit"
          disabled={
            !(Object.keys(formik.errors).length === 0) ||
            !formik.values.confirmation ||
            list.length === 0
          }
        >
          Отправить
        </Button>
      </div>
    </form>
  );
};
