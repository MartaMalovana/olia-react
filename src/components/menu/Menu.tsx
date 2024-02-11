import { Link, useLocation } from "react-router-dom";
import styles from "./styles.module.scss";
// import olia from "../../icons/oil-black.svg";
// import flour from "../../icons/flour-black.svg";
// import zhmuh from "../../icons/zhmuh-black.svg";
// import present from "../../icons/present-black.svg";
// import main from "../../icons/main.svg";
// import dostavka from "../../icons/dostavka.svg";
// import komanda from "../../icons/komanda.svg";
import active from "../../icons/leaves.svg";

type Props = { close: () => void };

export default function Menu({ close }: Props) {
  const { pathname } = useLocation();

  return (
    <nav
      className={styles.navigation}
      onClick={() => {
        close();
        window.scroll({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      }}
    >
      <ul>
        <li>
          <Link to="/">
            <div>
              {pathname === "/" && (
                <img
                  src={active}
                  width={50}
                  height={50}
                  alt="icon leaves"
                  className={styles.active_icon}
                />
              )}
              {/* <img
                src={main}
                width={17}
                height={20}
                alt="icon oil"
                style={{
                  marginRight: "15px",
                }}
              /> */}
              Головна
            </div>
          </Link>
        </li>
        <li>
          <Link to="/olia">
            <div>
              {pathname === "/olia" && (
                <img
                  src={active}
                  width={50}
                  height={50}
                  alt="icon leaves"
                  className={styles.active_icon}
                />
              )}
              {/* <img
                src={olia}
                width={20}
                height={20}
                alt="icon oil"
                style={{ marginRight: "15px" }}
              /> */}
              Олії
            </div>
          </Link>
        </li>
        <li>
          <Link to="/boroshno">
            <div>
              {pathname === "/boroshno" && (
                <img
                  src={active}
                  width={50}
                  height={50}
                  alt="icon leaves"
                  className={styles.active_icon}
                />
              )}
              {/* <img
                src={flour}
                width={20}
                height={20}
                alt="icon oil"
                style={{ marginRight: "15px" }}
              /> */}
              Знежирене борошно
            </div>
          </Link>
        </li>
        <li>
          <Link to="/gorihu">
            <div>
              {pathname === "/gorihu" && (
                <img
                  src={active}
                  width={50}
                  height={50}
                  alt="icon leaves"
                  className={styles.active_icon}
                />
              )}
              {/* <img
                src={zhmuh}
                width={20}
                height={20}
                alt="icon oil"
                style={{ marginRight: "15px" }}
              /> */}
              Знежирене насіння та горіхи
            </div>
          </Link>
        </li>
        <li>
          <Link to="/podarynkovi-naboru">
            <div>
              {pathname === "/podarynkovi-naboru" && (
                <img
                  src={active}
                  width={50}
                  height={50}
                  alt="icon leaves"
                  className={styles.active_icon}
                />
              )}
              {/* <img
                src={present}
                width={20}
                height={20}
                alt="icon oil"
                style={{ marginRight: "15px" }}
              /> */}
              Набори
            </div>
          </Link>
        </li>
        <li>
          <Link to="/dostavka-oplata">
            <div>
              {pathname === "/dostavka-oplata" && (
                <img
                  src={active}
                  width={50}
                  height={50}
                  alt="icon leaves"
                  className={styles.active_icon}
                />
              )}
              {/* <img
                src={dostavka}
                width={20}
                height={20}
                alt="icon oil"
                style={{ marginRight: "15px" }}
              /> */}
              Доставка та оплата
            </div>
          </Link>
        </li>
        <li>
          <Link to="/kontaktu">
            <div>
              {pathname === "/kontaktu" && (
                <img
                  src={active}
                  width={50}
                  height={50}
                  alt="icon leaves"
                  className={styles.active_icon}
                />
              )}
              {/* <img
                src={komanda}
                width={18}
                height={20}
                alt="icon oil"
                style={{ marginRight: "15px" }}
              /> */}
              Про нас
            </div>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
