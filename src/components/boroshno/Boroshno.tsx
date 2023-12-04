import styles from "./styles.module.scss";
import Header from "../header/Header";
import Footer from "../footer/Footer";

export default function Boroshno() {
  return (
    <div className={styles.container}>
      <Header />
      <p style={{ textAlign: "center" }}>
        Упс... Над цією сторіночкою я ще працюю!
      </p>
      <p style={{ textAlign: "center" }}>Тут буде БОРОШНО</p>
      <Footer />
    </div>
  );
}
