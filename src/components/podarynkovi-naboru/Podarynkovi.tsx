import styles from "./styles.module.scss";
import uc from "../../icons/underconstruction.jpg";

export default function Podarynkovi() {
  return (
    <div className={styles.container}>
      <img
        src={uc}
        style={{ width: "300px", borderRadius: "20px", marginTop: "30px" }}
        alt="сторінка знаходиться у розробці"
      />
    </div>
  );
}
