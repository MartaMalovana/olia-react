import { ChangeEvent } from "react";
import styles from "./styles.module.scss";
import bottle from "../../icons/bottle.svg";

type Props = {
  product: string[][];
  idProduct: number;
  checkedList: { id: number; sizeChecked: string }[] | [];
  handleCheckedList: (id: number, size: string) => void;
};

export default function Size({
  product,
  idProduct,
  handleCheckedList,
  checkedList,
}: Props) {
  const changeSize: (e: ChangeEvent<HTMLInputElement>, id: number) => void = (
    e,
    idProduct
  ) => {
    handleCheckedList(idProduct, e.target.value);
  };

  return (
    <>
      {product.map(([size, price], index) => (
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
          <label className={styles.sizes_item} htmlFor={size + idProduct}>
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
        </div>
      ))}
    </>
  );
}
