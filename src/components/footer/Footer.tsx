import { Link } from "react-router-dom";
import styles from "../../styles/styles.module.scss";
import drop from "../../icons/drop.png";
import instagram from "../../icons/instagram.svg";
import facebook from "../../icons/facebook.svg";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer_container}>
        <Link to="olia" className={styles.footer_drop}>
          <img src={drop} width={30} height={30} alt="oil drop decor"></img>
        </Link>
        <div className={styles.footer_contacts}>
          <div className={styles.social_container}>
            <a
              href="https://www.facebook.com/profile.php?id=61552696846756"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={facebook}
                width={27}
                height={27}
                className={styles.facebook}
                alt="facebook icon"
              />
            </a>
            <a
              href="https://instagram.com/matolli_oil?igshid=OGQ5ZDc2ODk2ZA%3D%3D&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={instagram}
                width={30}
                height={30}
                className={styles.instagram}
                alt="instagram icon"
              />
            </a>
          </div>
          <a href="mailto:marta.malovana@gmail.com?subject='olia'&body='hello martas">
            olia@gmail.com
          </a>
          <a href="tel:+380985583388">+380985583388</a>
        </div>
        <div className={styles.footer_links}>
          <Link to="/kontaktu">Про нас</Link>
          <Link to="/dostavka-oplata">Доставка та оплата</Link>
        </div>
      </div>
    </footer>
  );
}
