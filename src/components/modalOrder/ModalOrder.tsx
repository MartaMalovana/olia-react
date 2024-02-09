import { useState, useEffect } from "react";
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
import delivNova from "../../icons/delivNova.png";
import delivUkr from "../../icons/delivUkr.png";
import delivMeest from "../../icons/delivMeest.png";
import Message from "../message/Message";
import { Item } from "../../shared.types";

type Props = {
  products: Item[];
  close: () => void;
  showOrderButton: () => void;
  clearBasket: () => void;
};

export default function ModalOrder({
  products,
  close,
  showOrderButton,
  clearBasket,
}: Props) {
  const [message, setMessage] = useState<string>("");

  const formik = useFormik({
    initialValues: {
      lastName: "",
      firstName: "",
      phone: "",
      post: "novaposhta",
      address: { value: "", label: "" },
      postIndex: { value: "", label: "" },
      city: "",
      cities: [{ value: "", label: "" }],
      inputWh: "",
      warehouses: [{ value: "", label: "" }],
      meestCity: "",
      ukrposhtaIndex: "",
      comment: "",
      connect: ["call"],
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
      post: Yup.string(),
      address: Yup.object().shape({
        value: Yup.string().required("Це поле необхідно заповнити"),
        label: Yup.string(),
      }),
      postIndex: Yup.object().shape({
        value: Yup.string().required("Це поле необхідно заповнити"),
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
      ukrposhtaIndex: Yup.string().matches(/^([0-9]{1,})$/, "Лише цифри"),
      comment: Yup.string(),
      connect: Yup.array().of(Yup.string()),
    }),
    onSubmit: (values) => {
      let newData = {
        name: values.firstName,
        lastName: values.lastName,
        phone: values.phone,
        post: values.post,
        city: values.address.label,
        warehouse: values.postIndex.label,
        comment: values.comment,
        connect: values.connect,
        basket: products,
      };
      console.log(newData);
      setMessage("submitFormSuccess");
      // alert(JSON.stringify({ newData }, null, 2));
    },
  });

  useEffect(() => {
    // User've chosen "novaposhta" post company. And enters city name in input to get list of cities
    if (formik.values.post !== "novaposhta") return;
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
    if (formik.values.post !== "novaposhta") return;
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
    if (formik.values.post !== "meest") return;
    if (formik.values.meestCity === "") return;
    const promise = apiMeest(formik.values.meestCity);
    promise
      .then((result: any) => {
        const data = dataConvertNovaposhta(result.result, "meest");
        data.length !== 0 && formik.setFieldValue("warehouses", data);
      })
      .catch(console.log);
  }, [formik.values.meestCity, formik]);

  const aaa = (e: any) => {
    e.preventDefault();
    console.log(formik);
    try {
      formik.handleSubmit();
      // close();
      // clearBasket();
    } catch (error) {
      console.log(error);
      setMessage("submitFormError");
    }
  };

  const handleChangePost = (e: any) => {
    formik.setFieldValue("address", { value: "", label: "" });
    formik.setFieldValue("postIndex", { value: "", label: "" });
    formik.setFieldValue("city", "");
    formik.setFieldValue("cities", [{ value: "", label: "" }]);
    formik.setFieldValue("inputWh", "");
    formik.setFieldValue("warehouses", [{ value: "", label: "" }]);
    formik.setFieldValue("meestCity", "");
    formik.setFieldValue("post", e.target.value);
    formik.errors = {};
  };

  const haldleChangeConnect = (e: any) => {
    let newArr = [...formik.values.connect];
    const index = newArr.indexOf(e.target.value);
    if (index !== -1) {
      newArr.splice(index, 1);
    } else {
      newArr.push(e.target.value);
    }
    formik.setFieldValue("connect", newArr);
  };

  return (
    <div className={styles.container}>
      <p className={styles.title}>Оформлення замовлення</p>
      <form className={styles.form} onSubmit={aaa}>
        {/* CLIENT INFO (NAME, LAST NAME, PHONE NUMBER) */}
        <fieldset>
          <legend>Дані отримувача</legend>
          {/* Last name */}
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
          {/* First name */}
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
          {/* Phone */}
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
        {/* DELIVERY INFO (DELIVERY COMPANY NAME, CITY AND WAREHOUSE ADDRESS) */}
        <fieldset>
          <legend>Служба доставки</legend>
          {/* Delivery company select */}
          <span className={styles.label_select}>Оберіть службу доставки</span>
          <div className={styles.delivery}>
            <label>
              <input
                type="radio"
                name="delivery"
                value="novaposhta"
                checked={formik.values.post === "novaposhta"}
                onChange={handleChangePost}
              />
              <img src={delivNova} width={60} alt="nova poshta icon" />
            </label>
            <label>
              <input
                type="radio"
                name="delivery"
                value="ukrposhta"
                checked={formik.values.post === "ukrposhta"}
                onChange={handleChangePost}
              />
              <img src={delivUkr} width={60} alt="ukrposhta icon" />
            </label>
            <label>
              <input
                type="radio"
                name="delivery"
                value="meest"
                checked={formik.values.post === "meest"}
                onChange={handleChangePost}
              />
              <img src={delivMeest} width={60} alt="meest poshta icon" />
            </label>
          </div>
          {/* Nova Poshta company, city select. Send api fetch on input change */}
          {formik.values.post === "novaposhta" && (
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
                onFocus={(e: any) => {
                  formik.setFieldValue("warehouses", [
                    { value: "", label: "" },
                  ]);
                  formik.setFieldValue("address", { value: "", label: "" });
                }}
                options={formik.values.cities}
                className={styles.select}
              />
            </>
          )}
          {/* Nova Poshta company, warehouse select. Send api fetch on input change */}
          {formik.values.post === "novaposhta" &&
            formik.values.address.value && (
              <>
                <span className={styles.label_select}>
                  Введіть номер відділення або поштомату
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
          {/* Ukrposhta company */}
          {formik.values.post === "ukrposhta" && (
            <div style={{ marginBottom: "20px" }}>
              {/* Warehouse index */}
              <label className={styles.ukrposhta_label}>
                <span className={styles.ukrposhta_title}>
                  Індекс відділення
                </span>
                <input
                  name="ukrposhtaIndex"
                  type="text"
                  value={formik.values.postIndex.value}
                  onChange={(e) => {
                    formik.setFieldValue("ukrposhtaIndex", e.target.value);
                    formik.setFieldValue("postIndex", {
                      value: e.target.value,
                      label: e.target.value,
                    });
                  }}
                  placeholder="01001"
                  className={styles.ukrposhta_input}
                />
                {formik.touched.ukrposhtaIndex &&
                  formik.errors.ukrposhtaIndex && (
                    <span className={styles.ukrposhta_error}>
                      {formik.errors.ukrposhtaIndex}
                    </span>
                  )}
              </label>
              {/* City name */}
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
          {/* Meest company, send api fetch on input change */}
          {formik.values.post === "meest" && (
            <>
              <span
                className={styles.label_select}
                style={{ marginBottom: "20px" }}
              >
                Введіть адресу відділення Meest. Або адресу, поблизу якої
                потрібно знайти відділення Meest (наприклад: Київ, вул.
                Хрещатик, 21)
              </span>
              <Select
                value={formik.values.postIndex}
                inputValue={formik.values.meestCity}
                options={formik.values.warehouses}
                onChange={(e: any) => {
                  formik.setFieldValue("postIndex", e);
                  formik.setFieldValue("address", e);
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
                className={styles.select}
              />
            </>
          )}
        </fieldset>
        <fieldset>
          <legend>Деталі замовлення</legend>
          <label style={{ marginBottom: "20px" }}>
            <span className={styles.label_select}>Коментар до замовлення</span>
            <textarea
              className={styles.address}
              name="comment"
              value={formik.values.comment}
              onChange={(e: any) =>
                formik.setFieldValue("comment", e.target.value)
              }
            ></textarea>
          </label>
          <span className={styles.label_select}>
            Як краще з Вами зв'язатись?
          </span>
          <div className={styles.connect} style={{ marginTop: "10px" }}>
            <label>
              <input
                type="checkbox"
                name="connect"
                value="call"
                checked={formik.values.connect.includes("call")}
                onChange={haldleChangeConnect}
              />
              <span className={styles.connect_item}>Зателефонуйте мені</span>
            </label>
            <label>
              <input
                type="checkbox"
                name="connect"
                value="viber"
                checked={formik.values.connect.includes("viber")}
                onChange={haldleChangeConnect}
              />
              <span className={styles.connect_item}>Viber</span>
            </label>
            <label>
              <input
                type="checkbox"
                name="connect"
                value="telegram"
                checked={formik.values.connect.includes("telegram")}
                onChange={haldleChangeConnect}
              />
              <span className={styles.connect_item}>Telegram</span>
            </label>
          </div>
        </fieldset>
        {/* SUBMIT BUTTON */}
        <button className={styles.make_order} type="submit">
          ЗАМОВИТИ
        </button>
      </form>
      {/* CLOSE MODAL BUTTON */}
      <button
        className={styles.close_modal}
        onClick={() => {
          close();
          showOrderButton();
        }}
      >
        Закрити
      </button>
      {message && (
        <Message
          type={message}
          close={() => setMessage("")}
          closeOrder={close}
          clearBasket={clearBasket}
        />
      )}
    </div>
  );
}
