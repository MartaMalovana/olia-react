import styles from "./styles.module.scss";

type Props = {
  type: string;
  close: () => void;
  closeOrder?: () => void;
  clearBasket?: () => void;
};

export default function Message({
  type,
  close,
  closeOrder,
  clearBasket,
}: Props) {
  let message: any = "";
  switch (type) {
    case "success":
      message = "Продукт додано до кошика";
      break;
    case "error":
      message = (
        <>
          Помилка.
          <br />
          Спробуйте, будь-ласка, пізніше
        </>
      );
      break;
    case "submitFormSuccess":
      message = (
        <>
          Дякуємо за замовлення!
          <br />
          Наш менеджер незабаром звʼяжеться з вами
        </>
      );
      break;
    case "submitFormError":
      message = (
        <>
          Помилка сервера.
          <br />
          Спробуйте, будь-ласка, пізніше
        </>
      );
      break;
    default:
      break;
  }

  const handleClick = () => {
    close();
    if (type === "submitFormSuccess" && closeOrder && clearBasket) {
      closeOrder();
      clearBasket();
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.text_container}>
        <p>{message}</p>
        <button onClick={handleClick} className={styles.button} type="button">
          <span className={styles.text}>Добре</span>
        </button>
      </div>
    </div>
  );
}
