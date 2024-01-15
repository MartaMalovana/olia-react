import { useState, FormEvent } from "react";
import styles from "./styles.module.scss";
// import arrowOpen from "../../icons/arrow-open.svg";
import AmountButtons from "../amountButtons/AmountButtons";
import Size from "./Size";

type ProductItem = {
  id: number;
  name: string;
  size: string[][];
  description: string;
  icon: string;
  photo: string;
};
type Item = { product: ProductItem; size: string; amount: number };

type Props = {
  product: ProductItem;
  addItem: (item: Item) => void;
  success: () => void;
  errorMessage: () => void;
  handleCheckedList: (id: number, size: string) => void;
  checkedList: { id: number; sizeChecked: string }[] | [];
};

export default function Product({
  product,
  addItem,
  success,
  errorMessage,
  handleCheckedList,
  checkedList,
}: Props) {
  const [showInfo, setShowInfo] = useState(false);
  const [amount, setAmount] = useState(1);

  const addProduct = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const target = event.target as HTMLFormElement;
      let size: string = [...(Object as any).values(target)].find(
        (e) => e.checked
      ).value;

      const newProduct = {
        product: product,
        size: size,
        amount: amount,
      };
      addItem(newProduct);
      success();
    } catch (error) {
      errorMessage();
    }
  };

  return (
    <li
      className={
        showInfo
          ? `${styles.product_item} ${styles.product_item_active}`
          : styles.product_item
      }
    >
      {/* Product preview (product icon and name) */}
      <div
        className={
          showInfo
            ? `${styles.product_preview} ${styles.product_preview_active}`
            : styles.product_preview
        }
        onClick={() => setShowInfo(!showInfo)}
      >
        {/* Product icon */}
        <img
          className={styles.icon}
          src={`/images/product-icons/${product.icon}`}
          alt="product icon"
        />
        {/* Product name */}
        <p className={styles.product_name}>{product.name}</p>
        {/* Arrow down to open the product info */}
        <div
          className={
            showInfo
              ? `${styles.arrow_open} ${styles.arrow_open_active}`
              : styles.arrow_open
          }
          // src={arrowOpen}
          // width={35}
          // height={35}
          // alt="arrow down"
        ></div>
      </div>

      {/* Product info (photo, description and the form to add product to basket) */}
      {showInfo && (
        <div className={styles.product_info}>
          {/* Container with product photo and form to choose product */}
          <div className={styles.photo_form_container}>
            {/* Product photo*/}
            <img
              src={`/images/product-photos/${product.photo}`}
              width={100}
              className={styles.photo}
              alt="product icon"
            />
            {/* Product form to choose product options and add to basket*/}
            <form className={styles.form} onSubmit={addProduct}>
              {/* Product sizes option*/}
              <div className={styles.sizes_container}>
                <Size
                  product={product.size}
                  idProduct={product.id}
                  handleCheckedList={handleCheckedList}
                  checkedList={checkedList}
                />
              </div>
              {/* Product amount option (buttons to change amount)*/}
              <label>
                <input
                  type="text"
                  name="amount"
                  value={amount}
                  className={styles.amount_input}
                ></input>
                <AmountButtons
                  amount={amount}
                  minus={() => setAmount(amount - 1)}
                  plus={() => setAmount(amount + 1)}
                />
              </label>
              {/* Submit button to add chosen product to basket*/}
              <button type="submit" className={styles.submit_button}>
                Додати до кошика
              </button>
            </form>
          </div>
          {/* Product description */}
          <p className={styles.product_description}>{product.description}</p>
        </div>
      )}
    </li>
  );
}
