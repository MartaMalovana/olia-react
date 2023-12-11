import styles from "../addProductMessage/styles.module.scss";

type Props = {
  type: string;
  close: () => void;
};

export default function AddProductMessage({ type, close }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.text_container}>
        {type === "success" ? (
          <p>Продукт додано до кошика</p>
        ) : (
          <p>
            Помилка. <br></br>
            Спробуйте, будь-ласка, пізніше
          </p>
        )}
        <button onClick={() => close()} className={styles.button} type="button">
          <span className={styles.text}>Добре</span>
        </button>
      </div>
    </div>
  );
}
