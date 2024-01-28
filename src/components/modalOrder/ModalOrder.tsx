import { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { PhoneInput } from "react-international-phone";
import * as _ from "lodash";
import Select from "react-select";
import "react-international-phone/style.css";
import styles from "./styles.module.scss";
import apiNovaPoshta from "../../api/apiNovaPoshta";
import apiMeest from "../../api/apiMeest";
import dataConvertNovaposhta from "../../utils/dataConverterSelect";

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
  const formik = useFormik({
    initialValues: {
      lastName: "",
      firstName: "",
      phone: "",
      post: { value: "", label: "" },
      address: { value: "", label: "" },
      postIndex: { value: "", label: "" },
      city: "",
      cities: [{ value: "", label: "" }],
      inputWh: "",
      warehouses: [{ value: "", label: "" }],
      meestCity: "",
      meestStreet: "",
      meestHouse: "",
    },
    validationSchema: Yup.object({
      lastName: Yup.string()
        .max(20, "Не більше 20 літер")
        .matches(/(^([a-zA-Zа-яА-ЯьіІїЇ-]+ {0,})+$)/, "Лише літери")
        .required("Це поле необхідно заповнити"),
      firstName: Yup.string()
        .max(20, "Не більше 20 літер")
        .matches(/(^([a-zA-Zа-яА-ЯьіІїЇ-]+ {0,})+$)/, "Лише літери")
        .required("Це поле необхідно заповнити"),
      phone: Yup.string()
        .matches(/(^[0-9+-]{13}$)/, "Неправильно вказаний номер")
        .required("Це поле необхідно заповнити"),
      post: Yup.object().shape({
        value: Yup.string(),
        label: Yup.string(),
      }),
      address: Yup.object().shape({
        value: Yup.string().required("Це поле необхідно заповнити"),
        label: Yup.string(),
      }),
      postIndex: Yup.object().shape({
        value: Yup.string()
          // .matches(/^([0-9]{4,6})$/, "Введіть валідний числовий індекс")
          .required("Це поле необхідно заповнити"),
        label: Yup.string(),
      }),
      city: Yup.string(),
      cities: Yup.array().of(
        Yup.object().shape({
          value: Yup.string(),
          label: Yup.string(),
        })
      ),
      inputWh: Yup.string(),
      warehouses: Yup.array().of(
        Yup.object().shape({
          value: Yup.string(),
          label: Yup.string(),
        })
      ),
      meestCity: Yup.string(),
      // .required("Це поле необхідно заповнити"),
      meestStreet: Yup.string().matches(
        /(^([0-9а-яА-ЯьіІїЇ-]+ {0,})+$)/,
        "Лише літери та цифриі"
      ),
      // .required("Це поле необхідно заповнити"),
      meestHouse: Yup.string().matches(/^([0-9]{1,5})$/, "Лише цифри"),
    }),
    onSubmit: (values) => {
      console.log("submit");
      let newData = {
        name: formik.values.firstName,
        lastName: formik.values.lastName,
        phone: formik.values.phone,
        post: formik.values.post.label,
        city: formik.values.address.label,
        warehouse: formik.values.postIndex.label,
        basket: products,
      };
      alert(JSON.stringify({ newData }, null, 2));
    },
  });

  useEffect(() => {
    // User've chosen "novaposhta" post company. And enters city name in input to get list of cities
    if (formik.values.post.value !== "novaposhta") return;
    const promise = apiNovaPoshta("cities", formik.values.city, "");
    if (!promise) return;
    promise
      .then((result: any) => {
        const data = dataConvertNovaposhta(result.data, "novaposhta");
        formik.setFieldValue("cities", data);
      })
      .catch(console.log);
  }, [formik.values.city, formik]);

  useEffect(() => {
    // User've chosen "novaposhta" post company. And selects another city from select options or enters another warehouse number to get new list options
    if (formik.values.post.value !== "novaposhta") return;
    if (formik.values.inputWh === "") return;
    const promise = apiNovaPoshta(
      "warehouses",
      formik.values.address.value,
      formik.values.inputWh
    );
    if (!promise) return;
    promise
      .then((result: any) => {
        const data = dataConvertNovaposhta(result.data, "novaposhtaWarehouses");
        formik.setFieldValue("warehouses", data);
      })
      .catch(console.log);
  }, [formik.values.inputWh, formik.values.address, formik]);

  useEffect(() => {
    // User've chosen "meest" post company. And enters street name in input to get list of warehouses
    if (formik.values.post.value !== "meest") return;
    if (formik.values.meestCity === "") return;
    const promise = apiMeest(
      formik.values.meestCity
      // formik.values.meestStreet,
      // formik.values.meestHouse
    );
    promise
      .then((result: any) => {
        const data = dataConvertNovaposhta(result.result, "meest");
        data.length !== 0 && formik.setFieldValue("warehouses", data);
        // setMeestListOpen(true);
      })
      .catch(console.log);
  }, [formik.values.meestCity, formik]);

  const aaa = (e: any) => {
    e.preventDefault();
    console.log(formik);
    try {
      formik.handleSubmit();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <p className={styles.title}>Оформлення замовлення</p>
      <form className={styles.form} onSubmit={aaa}>
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
            name="post"
            value={formik.values.post}
            onChange={(e: any) => {
              formik.setFieldValue("address", { value: "", label: "" });
              formik.setFieldValue("postIndex", { value: "", label: "" });
              formik.setFieldValue("city", "");
              formik.setFieldValue("cities", [{ value: "", label: "" }]);
              formik.setFieldValue("inputWh", "");
              formik.setFieldValue("warehouses", [{ value: "", label: "" }]);
              formik.setFieldValue("meestCity", "");
              formik.setFieldValue("meestStreet", "");
              formik.setFieldValue("meestHouse", "");
              formik.setFieldValue("post", e);
              formik.errors = {};
            }}
            options={[
              { value: "novaposhta", label: "Нова Пошта" },
              { value: "ukrposhta", label: "Укрпошта" },
              { value: "meest", label: "Meest Пошта" },
            ]}
            className={styles.select}
          />
          {formik.values.post.value === "novaposhta" && (
            <>
              <span className={styles.label_select}>
                Введіть назву населеного пункту
              </span>
              <Select
                value={formik.values.address}
                inputValue={formik.values.city}
                onInputChange={_.debounce((e: any) => {
                  formik.setFieldValue("warehouses", [
                    { value: "", label: "" },
                  ]);
                  formik.setFieldValue("postIndex", { value: "", label: "" });
                  formik.setFieldValue("city", e);
                }, 100)}
                onChange={(e: any) => formik.setFieldValue("address", e)}
                options={formik.values.cities}
                className={styles.select}
              />
            </>
          )}

          {formik.values.post.value === "novaposhta" &&
            formik.values.address.value && (
              <>
                <span className={styles.label_select}>
                  Введіть номер відділення
                </span>
                <Select
                  value={formik.values.postIndex}
                  inputValue={formik.values.inputWh}
                  onChange={(e: any) => formik.setFieldValue("postIndex", e)}
                  onInputChange={_.debounce(
                    (e: any) => formik.setFieldValue("inputWh", e),
                    100
                  )}
                  options={formik.values.warehouses}
                  className={styles.select}
                />
              </>
            )}

          {formik.values.post.value === "ukrposhta" && (
            <div style={{ marginBottom: "20px" }}>
              <label className={styles.ukrposhta_label}>
                <span className={styles.ukrposhta_title}>
                  Індекс відділення
                </span>
                <input
                  name="postIndex"
                  type="text"
                  value={formik.values.postIndex.value}
                  onChange={(e) =>
                    formik.setFieldValue("postIndex", {
                      value: e.target.value,
                      label: e.target.value,
                    })
                  }
                  placeholder="01001"
                  className={styles.ukrposhta_input}
                />
                {formik.touched.postIndex && formik.errors.postIndex && (
                  <span className={styles.ukrposhta_error}>
                    {formik.errors.postIndex.value}
                  </span>
                )}
              </label>
              <label className={styles.ukrposhta_label}>
                <span className={styles.ukrposhta_title}>
                  Назва населеного пункту
                </span>
                <textarea
                  placeholder="Київ"
                  className={styles.address}
                  name="address"
                  value={formik.values.address.label}
                  onChange={(e) =>
                    formik.setFieldValue("address", {
                      value: e.target.value,
                      label: e.target.value,
                    })
                  }
                  onBlur={formik.handleBlur}
                ></textarea>
                {formik.touched.address && formik.errors.address && (
                  <span className={styles.ukrposhta_error}>
                    {formik.errors.address.value}
                  </span>
                )}
              </label>
            </div>
          )}

          {formik.values.post.value === "meest" && (
            <>
              <span
                className={styles.label_select}
                style={{ marginBottom: "20px" }}
              >
                Введіть адресу відділення Meest. Або адресу, поблизу якої
                потрібно знайти відділення Meest (наприклад: Київ, вул.
                Хрещатик, 21)
              </span>
              {/* <label className={styles.meest_label}>
                <span>Назва населеного пункту</span>
                <input
                  type="text"
                  name="meestCity"
                  onChange={(e) => {
                    formik.setFieldValue("meestStreet", "");
                    formik.setFieldValue("meestHouse", "");
                    formik.setFieldValue("postIndex", { value: "", label: "" });
                    formik.setFieldValue("warehouses", [
                      { value: "", label: "" },
                    ]);
                    formik.setFieldValue("meestCity", e.target.value);
                  }}
                  value={formik.values.meestCity}
                  className={styles.ukrposhta_input}
                  style={{ backgroundColor: "white" }}
                  placeholder="Київ"
                />
                {formik.touched.meestCity && formik.errors.meestCity && (
                  <span className={styles.ukrposhta_error}>
                    {formik.errors.meestCity}
                  </span>
                )}
              </label> */}
              {/* <label className={styles.meest_label}>
                <span>Вулиця</span>
                <input
                  type="text"
                  name="meestStreet"
                  onChange={formik.handleChange}
                  value={formik.values.meestStreet}
                  className={styles.ukrposhta_input}
                  style={{ backgroundColor: "white" }}
                  placeholder="Грушевського"
                />
                {formik.touched.meestStreet && formik.errors.meestStreet && (
                  <span className={styles.ukrposhta_error}>
                    {formik.errors.meestStreet}
                  </span>
                )}
              </label> */}
              {/* <label className={styles.meest_label}>
                <span>Номер будинку (необов'язково)</span>
                <input
                  type="text"
                  name="meestHouse"
                  onChange={formik.handleChange}
                  value={formik.values.meestHouse}
                  className={styles.ukrposhta_input}
                  style={{ backgroundColor: "white" }}
                  placeholder="14"
                />
                {formik.touched.meestHouse && formik.errors.meestHouse && (
                  <span className={styles.ukrposhta_error}>
                    {formik.errors.meestHouse}
                  </span>
                )}
              </label> */}
              <Select
                value={formik.values.postIndex}
                inputValue={formik.values.meestCity}
                options={formik.values.warehouses}
                onChange={(e: any) => {
                  formik.setFieldValue("postIndex", e);
                  // setMeestListOpen(!meestListOpen);
                }}
                onInputChange={_.debounce((inputData: string) => {
                  let newCityName = inputData
                    .split(",")
                    .map((el: string) => el.trim())
                    .join(", ")
                    .trimEnd()
                    .split(".")
                    .map((el: string) => el.trim())
                    .join(". ");
                  formik.setFieldValue("meestCity", newCityName);
                }, 100)}
                // menuIsOpen={meestListOpen}
              />
            </>
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
