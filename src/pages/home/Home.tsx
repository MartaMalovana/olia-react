import { Link } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import styles from "./styles.module.scss";
import Slider from "../../components/slider/Slider";
// import oil from "../../icons/oil-black.svg";
import olia from "../../icons/olia.png";
// import flour from "../../icons/flour-black.svg";
import boroshno from "../../icons/boroshno.png";
// import zhmuh from "../../icons/zhmuh-black.svg";
import nasinnya from "../../icons/nasinnya.png";
// import present from "../../icons/present-black.svg";
import naboru from "../../icons/naboru.png";
import Slogan from "../../components/slogan/Slogan";

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main_container}>
        {/* Slogan */}
        {useMediaQuery("(max-width:1000px)") && <Slogan />}

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
          <Link to="gorihu" className={styles.section}>
            <img src={nasinnya} alt="Link to page with oil cake" />
            <p className={styles.section_name}>Знежирене насіння та горіхи</p>
          </Link>
          <Link to="podarynkovi-naboru" className={styles.section}>
            <img src={naboru} alt="Link to page with present sets" />
            <p className={styles.section_name}>Набори</p>
          </Link>
        </div>
      </main>
    </div>
  );
}
