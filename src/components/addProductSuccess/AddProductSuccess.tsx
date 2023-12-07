import styles from "./styles.module.scss";

type Props = {
  close: () => void;
};

export default function AddProductSuccess({ close }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.text_container}>
        <p>Продукт додано до кошика</p>
        <button onClick={() => close()} className={styles.button} type="button">
          <span className={styles.text}>Добре</span>
        </button>
      </div>
    </div>
  );
}
