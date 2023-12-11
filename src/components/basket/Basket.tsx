import { useState, useContext } from "react";
import { BasketData } from "../../App";
import styles from "./styles.module.scss";
import AmountButtons from "../amountButtons/AmountButtons";
import DeleteFromBasket from "../deleteFromBasket/DeleteFromBasket";
import { Link } from "react-router-dom";

type Props = {
  changeBasketAmount: (itemId: number, operation: string) => void;
};
type ProductItem = {
  id: number;
  name: string;
  size: [string, string][];
  description: string;
  icon: string;
  photo: string;
};
type Item = { product: ProductItem; size: string; amount: number };
type DeleteInfo = { index: number; operation: string };

export default function Basket({ changeBasketAmount }: Props) {
  const basketData = useContext<Item[]>(BasketData);
  console.log(basketData);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteData, setDeleteData] = useState<DeleteInfo>({
    index: 0,
    operation: "delete",
  });

  const totalPrice: () => number = () => {
    return basketData.reduce(
      (
        acc: number,
        {
          amount,
          product,
          size,
        }: { amount: number; product: ProductItem; size: string }
      ) => {
        const a = product.size.find((el) => el[0] === size);
        if (a !== undefined) acc += Number(a[1]) * amount;
        return acc;
      },
      0
    );
  };

  const price = (arr: [string, string][], size: string) => {
    const result = arr.find((el) => el[0] === size);
    if (result) return result[1];
  };

  const deleteProduct: (index: number) => void = (index) => {
    setDeleteData((data) => {
      data.index = index;
      return data;
    });
    setShowDelete(true);
  };

  return (
    <div className={styles.container}>
      {basketData?.length !== 0 ? (
        <div style={{ marginBottom: "auto" }}>
          <ul className={styles.basketList}>
            {basketData &&
              basketData.map(({ product, size, amount }, index) => (
                <li key={index} className={styles.basket_item}>
                  <img
                    src={`/images/product-photos/${product.photo}`}
                    className={styles.basket_image}
                    alt="bottle with oil"
                  />
                  <div>
                    <p className={styles.product_name}>{product.name}</p>
                    <p>{size + "мл | " + price(product.size, size) + "грн"}</p>
                    <AmountButtons
                      amount={amount}
                      minus={() => changeBasketAmount(index, "minus")}
                      plus={() => changeBasketAmount(index, "plus")}
                    />
                    <p>
                      Вартість:{" "}
                      <span className={styles.product_amount}>
                        {amount * Number(price(product.size, size))} грн
                      </span>
                    </p>
                  </div>
                  <button
                    className={styles.delete_item}
                    onClick={() => deleteProduct(index)}
                  >
                    <div className={styles.delete_icon}></div>
                    <p className={styles.delete_text}>Видалити</p>
                  </button>
                </li>
              ))}
          </ul>
          <p className={styles.total_price}>
            Загальна вартість замовлення:{" "}
            <span>
              {totalPrice()}
              {" грн"}
            </span>
          </p>
          <Link to="/olia" className={styles.continue_shopping}>
            Продовжити знайомство з продукцією
          </Link>
          <button className={styles.order_button}>Замовити</button>
        </div>
      ) : (
        <p className={styles.empty_basket}>Кошик порожній</p>
      )}

      {showDelete && (
        <DeleteFromBasket
          action={changeBasketAmount}
          data={deleteData}
          showModal={() => setShowDelete(false)}
        />
      )}
    </div>
  );
}
