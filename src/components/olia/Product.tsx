import { useState, FormEvent } from "react";
import styles from "./styles.module.scss";
import arrowOpen from "../../icons/arrow-open.svg";
import bottle from "../../icons/bottle.svg";
import AmountButtons from "../amountButtons/AmountButtons";

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
};

export default function Product({
  product,
  addItem,
  success,
  errorMessage,
}: Props) {
  const [showInfo, setShowInfo] = useState(false);
  const [amount, setAmount] = useState(1);

  const addProduct = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(event);
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
          width={70}
          alt="product icon"
        />
        {/* Product name */}
        <p className={styles.product_name}>{product.name}</p>
        {/* Arrow down to open the product info */}
        <img
          className={
            showInfo
              ? `${styles.arrow_open} ${styles.arrow_open_active}`
              : styles.arrow_open
          }
          src={arrowOpen}
          width={35}
          height={35}
          alt="arrow down"
        />
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
                {product.size.map(([size, price], index) => (
                  <>
                    <input
                      type="radio"
                      name="bottle-size"
                      id={`${index}`}
                      value={size}
                      className={styles.size_input}
                      defaultChecked={index === 0 ? true : false}
                    ></input>
                    <label
                      className={styles.sizes_item}
                      key={size}
                      htmlFor={`${index}`}
                    >
                      <div className={styles.size_button}>
                        <img
                          className={styles.bottle}
                          src={bottle}
                          width={30 + index * 7}
                          alt="bottle icon"
                        />
                      </div>
                      <p className={styles.size_text}>
                        {size} <span>мл</span>
                      </p>
                      <p>
                        {price} <span>грн</span>
                      </p>
                    </label>
                  </>
                ))}
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
