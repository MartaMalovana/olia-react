import styles from "../addProductSuccess/styles.module.scss";

type Props = {
  close: () => void;
};

export default function AddProductError({ close }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.text_container}>
        <p>
          Помилка. <br />
          Спробуйте, будь-ласка, пізніше
        </p>
        <button onClick={() => close()} className={styles.button} type="button">
          <span className={styles.text}>Гаразд</span>
        </button>
      </div>
    </div>
  );
}
