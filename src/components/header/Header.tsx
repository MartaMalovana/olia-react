import Spin from "hamburger-react";
import { useState, useContext, forwardRef } from "react";
import { Link } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import styles from "./styles.module.scss";
import basket from "../../icons/basket-2.svg";
import Menu from "../menu/Menu";
import Slogan from "../slogan/Slogan";
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

const Header = forwardRef((_props, ref: any) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const basketData = useContext<Item[]>(BasketData);
  let productAmount = basketData.reduce(
    (acc, { amount }) => (acc += amount),
    0
  );

  const closeMenu = () => {
    setMenuOpen(!menuOpen);
    setOpen(false);
  };

  return (
    <header className={styles.header} ref={ref}>
      <div className={styles.header_container}>
        {/* Emblem */}
        <Link to={"/"} className={styles.emblem}>
          <img
            src={emblem}
            width={80}
            alt="company emblem"
            className={styles.emblem_img}
          />
        </Link>
        {/* Slogan */}
        {useMediaQuery("(min-width:1000px)") && <Slogan />}
        {/* Button Basket */}
        <Link to="/basket" className={styles.basket}>
          <button>
            <img
              className={styles.basket_img}
              src={basket}
              width={25}
              height={25}
              alt="Product basket"
              // style={{ stroke: "#fff" }}
            />
            {productAmount !== 0 && (
              <div className={styles.product_amount}>{productAmount}</div>
            )}
          </button>
        </Link>
        {/* Button to open Menu */}
        {useMediaQuery("(max-width:1000px)") && (
          <div onClick={() => setMenuOpen(!menuOpen)}>
            <Spin size={24} toggled={isOpen} toggle={setOpen}></Spin>
          </div>
        )}
      </div>
      {/* Menu */}
      {menuOpen && <Menu close={closeMenu} />}
    </header>
  );
});

export default Header;
