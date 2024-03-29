import { useState, useContext } from "react";
import { BasketData } from "../../App";
import styles from "./styles.module.scss";
import AmountButtons from "../../components/amountButtons/AmountButtons";
import DeleteFromBasket from "../../components/deleteFromBasket/DeleteFromBasket";
import { Link } from "react-router-dom";
import ModalOrder from "../../components/modalOrder/ModalOrder";
import { ProductItem, Item } from "../../shared.types";
// import Product from "../productList/Product";
import { Circles } from "react-loader-spinner";

type Props = {
  changeBasketAmount: (itemId: number, operation: string) => void;
  clearBasket: () => void;
};
type DeleteInfo = { index: number; operation: string };

export default function Basket({ changeBasketAmount, clearBasket }: Props) {
  const basketData = useContext<Item[]>(BasketData);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteData, setDeleteData] = useState<DeleteInfo>({
    index: 0,
    operation: "delete",
  });
  const [orderForm, setOrderForm] = useState(false);
  const [orderButton, setOrderButton] = useState(true);
  const [loader, setLoader] = useState<boolean>(false);

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

  const price = (arr: string[][], size: string) => {
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

  const loaderSwitch = (a: boolean) => {
    setLoader(a);
  };

  return (
    <div className={styles.container}>
      {basketData?.length !== 0 ? (
        <div style={{ margin: "0 20px auto" }}>
          <h1>Кошик</h1>
          <ul className={styles.basketList}>
            {basketData &&
              basketData.map(({ product, size, amount }, index) => (
                <li key={index} className={styles.basket_item}>
                  <img
                    src={`/images/${product.collection}-photos/${product.photo}`}
                    className={styles.basket_image}
                    alt={product.name}
                  />
                  <div>
                    <p className={styles.product_name}>{product.name}</p>
                    <p>{size + " | " + price(product.size, size) + " грн"}</p>
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
          {orderButton && (
            <button
              className={styles.order_button}
              onClick={() => {
                setOrderForm(true);
                setOrderButton(!orderButton);
              }}
            >
              Оформити замовлення
            </button>
          )}
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

      {orderForm && (
        <ModalOrder
          products={basketData}
          total={totalPrice()}
          close={() => setOrderForm(false)}
          showOrderButton={() => setOrderButton(!orderButton)}
          clearBasket={clearBasket}
          loader={(a) => loaderSwitch(a)}
        />
      )}

      {loader && (
        <div className={styles.loader}>
          {" "}
          <Circles
            height="50"
            width="50"
            color="black"
            ariaLabel="circles-loading"
            wrapperStyle={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100vh",
            }}
            wrapperClass="loader"
            visible={true}
          />
        </div>
      )}
    </div>
  );
}
