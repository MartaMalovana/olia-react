import { Link } from "react-router-dom";
import styles from "../../styles/styles.module.scss";
import drop from "../../icons/drop.png";
import instagram from "../../icons/instagram.svg";
import facebook from "../../icons/facebook.svg";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer_container}>
        <div className={styles.footer_drop}>
          <img src={drop} width={30} height={30} alt="oil drop decor"></img>
        </div>
        <div className={styles.footer_contacts}>
          <div className={styles.social_container}>
            <img
              src={facebook}
              width={27}
              height={27}
              className={styles.facebook}
              alt="facebook icon"
            />
            <img
              src={instagram}
              width={30}
              height={30}
              className={styles.instagram}
              alt="instagram icon"
            />
          </div>
          <a href="mailto:marta.malovana@gmail.com?subject='olia'&body='hello martas">
            olia@gmail.com
          </a>
          <a href="tel:+380670676756">+380670676756</a>
        </div>
        <div className={styles.footer_links}>
          <Link to="/kontaktu">Про нас</Link>
          <Link to="/dostavka-oplata">Доставка та оплата</Link>
        </div>
      </div>
    </footer>
  );
}
