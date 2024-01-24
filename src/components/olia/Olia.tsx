"use client";
import { useState } from "react";
import Product from "./Product";
import styles from "./styles.module.scss";
import data from "./olia.json";
import AddProductMessage from "../addProductMessage/AddProductMessage";

export default function Olia({ addItem }: { addItem: any }) {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [checkedList, setCheckedList] = useState<
    { id: number; sizeChecked: string }[] | []
  >([]);

  const handleCheckedList: (id: number, size: string) => void = (id, size) => {
    setCheckedList((data) => {
      let newData = JSON.parse(JSON.stringify(data));
      if (newData.lenght === 0) return;
      let item = newData.find(
        (el: { id: number; sizeChecked: string }) => el.id === id
      );
      if (!item) {
        newData.push({ id: id, sizeChecked: size });
      } else {
        item.sizeChecked = size;
      }

      return newData;
    });
  };

  return (
    <div className={styles.products}>
      <main className={styles.main}>
        {/* Product list */}
        <ul className={styles.product_list}>
          {data.map((product) => (
            /* Product item */
            <Product
              product={product}
              key={product.id}
              addItem={addItem}
              success={() => setSuccess(true)}
              errorMessage={() => setError(true)}
              handleCheckedList={handleCheckedList}
              checkedList={checkedList}
            />
          ))}
        </ul>
      </main>

      {/* Modal "adding product to basket, status success or error" */}
      {success && (
        <AddProductMessage close={() => setSuccess(false)} type="success" />
      )}
      {error && (
        <AddProductMessage close={() => setError(false)} type="error" />
      )}
    </div>
  );
}
