import styles from "./styles.module.scss";
import plusIcon from "../../icons/plus.svg";
import minusIcon from "../../icons/minus.svg";

type Props = {
  amount: number;
  minus: () => void;
  plus: () => void;
};

export default function AmountButtons({ amount, minus, plus }: Props) {
  return (
    <div className={styles.buttons_container}>
      <button type="button" disabled={amount === 1 && true} onClick={minus}>
        <img src={minusIcon} width={15} height={15} alt="minus one product" />
      </button>
      <span>{amount}</span>
      <button type="button" onClick={plus}>
        <img src={plusIcon} width={15} height={15} alt="add one product" />
      </button>
    </div>
  );
}
