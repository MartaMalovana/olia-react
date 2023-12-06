import styles from "./styles.module.scss";

type Props = {
  action: (itemId: number, operation: string) => void;
  data: { index: number; operation: string };
  showModal: () => void;
};

export default function DeleteFromBasket({ action, data, showModal }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.text_container}>
        <p>Видалити цей продукт з корзини?</p>
        <button
          onClick={() => {
            action(data.index, data.operation);
            showModal();
          }}
          className={styles.button}
          type="button"
        >
          <span className={styles.text}>Так</span>
        </button>
        <button
          onClick={() => showModal()}
          className={styles.button}
          type="button"
        >
          <span className={styles.text}>Ой ні, не видаляти</span>
        </button>
      </div>
    </div>
  );
}
