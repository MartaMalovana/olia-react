import { ChangeEvent } from "react";
import styles from "./styles.module.scss";
import bottle from "../../icons/bottle.svg";
import bag from "../../icons/bag.png";
import jar from "../../icons/jar.png";

type Props = {
  collection?: string;
  product: string[][];
  idProduct: number;
  icon: string;
  checkedList: { id: number; sizeChecked: string }[] | [];
  handleCheckedList: (id: number, size: string) => void;
};

export default function Size({
  collection,
  product,
  idProduct,
  icon,
  handleCheckedList,
  checkedList,
}: Props) {
  const getSizeIcon = () => {
    switch (icon) {
      case "bottle":
        return bottle;
      case "jar":
        return jar;
      case "bag":
        return bag;
      default:
        return "";
    }
  };

  const changeSize: (e: ChangeEvent<HTMLInputElement>, id: number) => void = (
    e,
    idProduct
  ) => {
    handleCheckedList(idProduct, e.target.value);
  };

  return (
    <>
      {product.map(([size, price, oldPrice], index) => (
        <div key={index}>
          <input
            type="radio"
            name={String(idProduct)}
            id={size + idProduct}
            value={String(size)}
            className={styles.size_input}
            checked={
              checkedList?.find((el) => el.id === idProduct)
                ? checkedList?.find((el) => el.id === idProduct)
                    ?.sizeChecked === size
                : index === 0
            }
            onChange={(e) => changeSize(e, idProduct)}
          ></input>
          <label
            className={
              collection === "naboru"
                ? styles.sizes_item_naboru
                : styles.sizes_item
            }
            htmlFor={size + idProduct}
          >
            {icon !== "" && (
              <div className={styles.size_button}>
                <img
                  className={styles.bottle}
                  src={getSizeIcon()}
                  width={30 + index * 7}
                  alt="bottle icon"
                />
              </div>
            )}
            <p className={styles.size_text}>
              {collection && collection === "naboru" ? (
                <span className={styles.size_text_oldprice}>
                  {oldPrice + " грн"}
                </span>
              ) : (
                size
              )}
            </p>
            <p className={collection === "naboru" ? styles.newPrice : ""}>
              {price} <span>грн</span>
            </p>
          </label>
        </div>
      ))}
    </>
  );
}
