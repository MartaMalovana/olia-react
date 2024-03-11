import { useState, FormEvent } from "react";
import styles from "./styles.module.scss";
import AmountButtons from "../amountButtons/AmountButtons";
import Size from "./Size";
import { ProductItem, Item } from "../../shared.types";

type Props = {
  product: ProductItem;
  addItem: (item: Item) => void;
  success: () => void;
  errorMessage: () => void;
  handleCheckedList: (id: number, size: string) => void;
  checkedList: { id: number; sizeChecked: string }[] | [];
  folderName: string;
};

export default function ProductNaboru({
  product,
  addItem,
  success,
  errorMessage,
  handleCheckedList,
  checkedList,
  folderName,
}: Props) {
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
    <li className={`${styles.product_item} ${styles.product_item_active}`}>
      {/* Product preview (product icon and name) */}
      <div
        className={`${styles.product_preview} ${styles.product_preview_active}`}
      >
        {/* Product name */}
        <p className={styles.product_name}>{product.name}</p>
      </div>

      {/* Product info (photo, description and the form to add product to basket) */}
      <div className={styles.product_info}>
        {/* Container with product photo and form to choose product */}
        <div className={styles.photo_form_container_naboru}>
          {/* Product photo*/}
          <div className={styles.img_container_naboru}>
            <img
              src={`/images/${folderName}-photos/${product.photo}`}
              width={200}
              height={200}
              className={styles.photo}
              alt={product.name}
            />
            <div className={styles.discount}>
              <div>
                <span style={{ display: "flex" }}>
                  {"-" +
                    (Number(product.size[0][2]) - Number(product.size[0][1])) +
                    "грн"}
                </span>
              </div>
            </div>
          </div>

          {/* Product form to choose product options and add to basket*/}
          <form className={styles.form_naboru} onSubmit={addProduct}>
            {/* Product sizes option*/}
            <div className={styles.sizes_container_naboru}>
              <Size
                collection="naboru"
                product={product.size}
                idProduct={product.id}
                icon={product.sizeIcon ? product.sizeIcon : ""}
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
            <button type="submit" className={styles.submit_button_naboru}>
              Додати до кошика
            </button>
          </form>

          {/* This div only for desktop version */}
          <div className={styles.product_description_desktop_naboru}>
            {/* Description */}
            {product.description && (
              <p className={styles.description_desktop}>
                {product.description}
              </p>
            )}
            {/* Ingredients */}
            {product.ingredients && (
              <p className={styles.ingredients_desktop}>
                <span>Містить: </span>
                <br />
                <ul>
                  {product.ingredients.split(",").map((s) => (
                    <li className={styles.properties}>{s.trim()}</li>
                  ))}
                </ul>
              </p>
            )}
          </div>
        </div>

        {/* Product description */}
        <div className={styles.product_description_naboru}>
          {product.description && (
            <p className={styles.description}>{product.description}</p>
          )}

          {/* Ingredients */}
          {product.ingredients && (
            <p className={styles.ingredients}>
              <span style={{ display: "block" }}>Містить: </span>
              <br />
              <ul>
                {product.ingredients.split(",").map((s) => (
                  <li className={styles.properties}>{s.trim()}</li>
                ))}
              </ul>
            </p>
          )}
        </div>
      </div>
    </li>
  );
}
