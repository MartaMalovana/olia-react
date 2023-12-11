import { forwardRef } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import olia from "../../icons/oil-black.svg";
import flour from "../../icons/flour-black.svg";
import zhmuh from "../../icons/zhmuh-black.svg";
import present from "../../icons/present-black.svg";
import main from "../../icons/main.svg";
import dostavka from "../../icons/dostavka.svg";
import komanda from "../../icons/komanda.svg";

type Props = { close: () => void };

export default function Menu({ close }: Props) {
  return (
    <nav className={styles.navigation} onClick={() => close()}>
      <ul>
        <li>
          <Link to="/">
            <div>
              <img
                src={main}
                width={17}
                height={20}
                alt="icon oil"
                style={{
                  marginRight: "15px",
                }}
              />
              Головна
            </div>
          </Link>
        </li>
        <li>
          <Link to="/olia">
            <div>
              <img
                src={olia}
                width={20}
                height={20}
                alt="icon oil"
                style={{ marginRight: "15px" }}
              />
              Олія
            </div>
          </Link>
        </li>
        <li>
          <Link to="/boroshno">
            <div>
              <img
                src={flour}
                width={20}
                height={20}
                alt="icon oil"
                style={{ marginRight: "15px" }}
              />
              Борошно
            </div>
          </Link>
        </li>
        <li>
          <Link to="/zhmuh">
            <div>
              <img
                src={zhmuh}
                width={20}
                height={20}
                alt="icon oil"
                style={{ marginRight: "15px" }}
              />
              Жмих
            </div>
          </Link>
        </li>
        <li>
          <Link to="/podarynkovi-naboru">
            <div>
              <img
                src={present}
                width={20}
                height={20}
                alt="icon oil"
                style={{ marginRight: "15px" }}
              />
              Подарункові набори
            </div>
          </Link>
        </li>
        <li>
          <Link to="/dostavka-oplata">
            <div>
              <img
                src={dostavka}
                width={20}
                height={20}
                alt="icon oil"
                style={{ marginRight: "15px" }}
              />
              Доставка та оплата
            </div>
          </Link>
        </li>
        <li>
          <Link to="/kontaktu">
            <div>
              <img
                src={komanda}
                width={18}
                height={20}
                alt="icon oil"
                style={{ marginRight: "15px" }}
              />
              Про нас
            </div>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
