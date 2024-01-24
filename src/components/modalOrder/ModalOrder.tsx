import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { PhoneInput } from "react-international-phone";
import * as _ from "lodash";
import Select from "react-select";
import "react-international-phone/style.css";
import styles from "./styles.module.scss";
import apiNovaPoshta from "../../api/apiNovaPoshta";

type ProductItem = {
  id: number;
  name: string;
  size: [string, string][];
  description: string;
  icon: string;
  photo: string;
};

type Item = { product: ProductItem; size: string; amount: number };

type Props = {
  products: Item[];
  close: () => void;
  showOrderButton: () => void;
};

export default function ModalOrder({
  products,
  close,
  showOrderButton,
}: Props) {
  const [post, setPost] = useState<any>("");
  const [cities, setCities] = useState<any>([]);
  const [city, setCity] = useState<any>("");
  const [selectedCity, setSelectedCity] = useState<any>("");
  const [warehouses, setWarehouses] = useState<any>([]);
  const [inputWh, setInputWh] = useState<string>("");
  const [selectedWh, setSelectedWh] = useState<any>("");

  useEffect(() => {
    if (post === "") return;
  }, [post]);

  useEffect(() => {
    const promise = apiNovaPoshta("cities", city, "");
    if (!promise) return;
    promise
      .then((result: any) => {
        const newArr = result.data.reduce((acc: any, el: any) => {
          acc.push({
            value: el.Ref,
            label: `${el.SettlementTypeDescription} ${el.Description}, ${el.AreaDescription} область`,
          });
          return acc;
        }, []);
        setCities(newArr);
      })
      .catch(console.log);
  }, [city]);

  useEffect(() => {
    const promise = apiNovaPoshta("warehouses", selectedCity.value, inputWh);
    if (!promise) return;
    promise
      .then((result: any) => {
        const newArr = result.data.reduce((acc: any, el: any) => {
          acc.push({ value: el.Description, label: el.Description });
          return acc;
        }, []);
        setWarehouses(newArr);
      })
      .catch(console.log);
  }, [inputWh]);

  const formik = useFormik({
    initialValues: {
      lastName: "",
      firstName: "",
      phone: "",
      address: "",
    },
    validationSchema: Yup.object({
      lastName: Yup.string()
        .max(20, "Не більше 20 літер")
        .matches(/(^([a-zA-Zа-яА-Яь\-]+ {0,})+$)/, "Лише літери")
        .required("Це поле необхідно заповнити"),
      firstName: Yup.string()
        .max(20, "Не більше 20 літер")
        .matches(/(^([a-zA-Zа-яА-Яь\-]+ {0,})+$)/, "Лише літери")
        .required("Це поле необхідно заповнити"),
      phone: Yup.string()
        .matches(/(^[0-9\+\-]{13}$)/, "Неправильно вказаний номер")
        .required("Це поле необхідно заповнити"),
      address: Yup.string().required("Це поле необхідно заповнити"),
    }),
    onSubmit: (values) => {
      console.log(products);
      let data = { ...values, products };
      if (post.value === "novaposhta") {
        data.address = `${selectedCity.label}, ${selectedWh.label}`;
      }
      alert(JSON.stringify({ data }, null, 2));
    },
  });

  return (
    <div className={styles.container}>
      <p className={styles.title}>Оформлення замовлення</p>
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <fieldset>
          <legend>Дані отримувача</legend>
          <label className={styles.label}>
            <span className={styles.label_text}>Прізвище</span>
            <input
              id="lastName"
              type="text"
              name="lastName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastName}
              className={styles.input}
              style={{ backgroundColor: "white" }}
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <span className={styles.error_text}>
                {formik.errors.lastName}
              </span>
            )}
          </label>
          <label className={styles.label}>
            <span className={styles.label_text}>Ім'я</span>
            <input
              type="text"
              name="firstName"
              onChange={formik.handleChange}
              value={formik.values.firstName}
              className={styles.input}
              style={{ backgroundColor: "white" }}
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <span className={styles.error_text}>
                {formik.errors.firstName}
              </span>
            )}
          </label>
          <label className={styles.label}>
            <span className={styles.label_text}>Номер телефону</span>
            <PhoneInput
              name="phone"
              defaultCountry="ua"
              onChange={(e: any) => {
                formik.setFieldValue("phone", e);
              }}
              className={styles.input_phone}
              value={formik.values.phone}
              style={{ backgroundColor: "white" }}
            />
            {formik.touched.phone && formik.errors.phone && (
              <span className={styles.error_text}>{formik.errors.phone}</span>
            )}
          </label>
        </fieldset>
        <fieldset>
          <legend>Служба доставки</legend>
          <span className={styles.label_select}>Оберіть службу доставки</span>
          <Select
            name="poshta"
            value={post}
            onChange={(e: any) => setPost(e)}
            options={[
              { value: "novaposhta", label: "Нова Пошта" },
              { value: "ukrposhta", label: "Укрпошта" },
              { value: "meest", label: "Meest Пошта" },
            ]}
            className={styles.select}
          />
          {post.value === "novaposhta" && (
            <>
              <span className={styles.label_select}>
                Введіть назву населеного пункту
              </span>
              <Select
                value={selectedCity}
                inputValue={city}
                onInputChange={_.debounce((e: any) => {
                  setCity("");
                  setWarehouses([]);
                  setSelectedWh("");
                  setCity(e);
                }, 100)}
                onChange={(e: any) => setSelectedCity(e)}
                options={cities}
                className={styles.select}
              />
            </>
          )}

          {post.value === "novaposhta" && selectedCity && (
            <>
              <span className={styles.label_select}>
                Введіть номер відділення
              </span>
              <Select
                value={selectedWh}
                inputValue={inputWh}
                onChange={(e: any) => setSelectedWh(e)}
                onInputChange={_.debounce((e: any) => setInputWh(e), 100)}
                options={warehouses}
                className={styles.select}
              />
            </>
          )}

          {post.value === "ukrposhta" && (
            <div style={{ marginBottom: "20px" }}>
              <textarea
                placeholder="Введіть індекс та адресу відділення Укрпошти"
                className={styles.address}
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></textarea>
              {formik.touched.address && formik.errors.address && (
                <span className={styles.error_text}>
                  {formik.errors.address}
                </span>
              )}
            </div>
          )}
        </fieldset>
        <button className={styles.make_order} type="submit">
          ЗАМОВИТИ
        </button>
      </form>
      <button
        className={styles.close_modal}
        onClick={() => {
          close();
          showOrderButton();
        }}
      >
        Закрити
      </button>
    </div>
  );
}
