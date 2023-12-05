import { Link } from "react-router-dom";
import "../../App.css";
import styles from "../../styles/styles.module.scss";
import Header from "../header/Header";
import Slider from "../slider/Slider";
import Footer from "../footer/Footer";
import oil from "../../icons/oil-black.svg";
import flour from "../../icons/flour-black.svg";
import zhmuh from "../../icons/zhmuh-black.svg";
import present from "../../icons/present-black.svg";
// import { caveat } from "./styles/fonts.js";

export default function Home() {
  return (
    <>
      <Header />

      <main className={styles.main_container}>
        {/* Drop and welcome text */}
        <div className={styles.drop}>
          {/* <img src={drop} width={50} height={50} alt="Oil drop" /> */}
          <p>
            &quot;Виготовляємо олію під замовлення. Тому вона завжди свіжа та
            преміум якості!&quot;
          </p>
        </div>

        {/* Slider */}
        <Slider />

        {/* Product sections */}
        <div className={styles.section_list}>
          <Link to="olia" className={styles.section}>
            <img
              src={oil}
              width={40}
              height={40}
              alt="Link to page with oils"
            />
            <p className={styles.section_name}>Олія</p>
          </Link>
          <Link to="boroshno" className={styles.section}>
            <img
              src={flour}
              width={40}
              height={40}
              alt="Link to page with flours"
            />
            <p className={styles.section_name}>Борошно</p>
          </Link>
          <Link to="zhmuh" className={styles.section}>
            <img
              src={zhmuh}
              width={40}
              height={40}
              alt="Link to page with oil cake"
            />
            <p className={styles.section_name}>Жмих</p>
          </Link>
          <Link to="podarynkovi-naboru" className={styles.section}>
            <img
              src={present}
              width={40}
              height={40}
              alt="Link to page with present sets"
            />
            <p className={styles.section_name}>Подарункові набори</p>
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}
