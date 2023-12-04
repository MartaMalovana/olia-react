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
