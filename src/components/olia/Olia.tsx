"use client";
import { useState } from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import Product from "./Product";
import styles from "./styles.module.scss";
import data from "./olia.json";
import AddProductSuccess from "../addProductSuccess/AddProductSuccess";
import AddProductError from "../addProductError/AddProductError";

export default function Olia({ addItem }: { addItem: any }) {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [checkedList, setCheckedList] = useState<
    { id: number; sizeChecked: string }[] | []
  >([]);

  const handleCheckedList: (id: number, size: string) => void = (id, size) => {
    setCheckedList((data) => {
      console.log(data);
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
      console.log(newData);

      return newData;
    });
  };

  return (
    <div className={styles.products}>
      <Header />

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

      <Footer />

      {/* Modal "adding product to basket, status success" */}
      {success && <AddProductSuccess close={() => setSuccess(false)} />}
      {error && <AddProductError close={() => setError(false)} />}
    </div>
  );
}
