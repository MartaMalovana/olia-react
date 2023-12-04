import Spin from "hamburger-react";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/styles.module.scss";
import basket from "../../icons/basket-2.svg";
import Menu from "../menu/Menu";
import { BasketData } from "../../App";
import emblem from "../../icons/emblem.png";

type ProductItem = {
  id: number;
  name: string;
  size: [string, string][];
  description: string;
  icon: string;
  photo: string;
};
type Item = { product: ProductItem; size: string; amount: number };

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const basketData = useContext<Item[]>(BasketData);
  let productAmount = basketData.reduce(
    (acc, { amount }) => (acc += amount),
    0
  );

  return (
    <header className={styles.header}>
      <div className={styles.header_container}>
        {/* Emblem */}
        <Link to={"/"} className={styles.emblem}>
          <img src={emblem} width={80} alt="company emblem" />
        </Link>
        {/* Button Basket */}
        <Link to="/basket" className={styles.basket}>
          <button>
            <img
              src={basket}
              width={25}
              height={25}
              alt="Product basket"
              style={{ stroke: "#fff" }}
            />
            {productAmount !== 0 && (
              <div className={styles.product_amount}>{productAmount}</div>
            )}
          </button>
        </Link>
        {/* Button to open Menu */}
        <div onClick={() => setMenuOpen(!menuOpen)}>
          <Spin size={24}></Spin>
        </div>
      </div>
      {/* Menu */}
      {menuOpen && <Menu />}
    </header>
  );
}
