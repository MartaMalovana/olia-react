import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import Slider from "../slider/Slider";
// import oil from "../../icons/oil-black.svg";
import olia from "../../icons/olia.png";
// import flour from "../../icons/flour-black.svg";
import boroshno from "../../icons/boroshno.png";
// import zhmuh from "../../icons/zhmuh-black.svg";
import nasinnya from "../../icons/nasinnya.png";
// import present from "../../icons/present-black.svg";
import naboru from "../../icons/naboru.png";

export default function Home() {
  return (
    <>
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
        <div
          className={styles.section_list}
          onClick={() => window.scroll(0, 0)}
        >
          <Link to="olia" className={styles.section}>
            <img src={olia} alt="Link to page with oils" />
            <p className={styles.section_name}>Олії</p>
          </Link>
          <Link to="boroshno" className={styles.section}>
            <img src={boroshno} alt="Link to page with flours" />
            <p className={styles.section_name}>Знежирене борошно</p>
          </Link>
          <Link to="zhmuh" className={styles.section}>
            <img src={nasinnya} alt="Link to page with oil cake" />
            <p className={styles.section_name}>Знежирене насіння та горіхи</p>
          </Link>
          <Link to="podarynkovi-naboru" className={styles.section}>
            <img src={naboru} alt="Link to page with present sets" />
            <p className={styles.section_name}>Набори</p>
          </Link>
        </div>
      </main>
    </>
  );
}
