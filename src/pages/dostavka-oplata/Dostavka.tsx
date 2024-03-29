import styles from "./styles.module.scss";
import PageTitle from "../../components/pageTitle/PageTitle";
import nova from "../../icons/delivNova.png";
import ukr from "../../icons/delivUkr.png";
import meest from "../../icons/delivMeest.png";
import kurier from "../../icons/kurier.png";

export default function Dostavka() {
  return (
    <div className={styles.container}>
      <PageTitle text={"Доставка та оплата"} />
      <section className={styles.section}>
        {/* <p className={styles.section_title}>Оформлення замовлення</p> */}
        <div style={{ margin: "0 20px" }}>
          <p>
            <strong>Шановні клієнти!</strong>
          </p>
          <div>Оформити замовлення можна:</div>
          <ul className={styles.list}>
            <li> на сайті через кошик</li>
            <li>
              по електронній пошті{" "}
              <a href="mailto:matolli_oil@outlook.com">
                matolli_oil@outlook.com
              </a>
            </li>
            <li>
              по телефону (пн-пт 10:00 - 18:00, сб 10:00 - 15:00) або
              <a
                href="viber://chat?number=%2B380985583388"
                className={styles.viber}
              >
                <div className={styles.viber_icon}></div>Viber
              </a>
              , Telegram, WhatsApp. Менеджер Matolli{" "}
              <a href="tel:+380985583388">+380985583388</a>
            </li>
            <li>
              також замовлення можна зробити написавши нам в direct на нашій
              сторінці{" "}
              <a
                href="https://instagram.com/matolli_oil?igshid=OGQ5ZDc2ODk2ZA%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            </li>
          </ul>
          <p>
            Замовлення опрацьовуємо з понеділка по п'ятницю з 10:00 до 18:00, в
            суботу з 10:00 до 15:00.
          </p>
          <p>
            Заявки залишені за допомогою Viber, Telegram, WhatsApp, а також
            телефонні дзвінки в неробочий час, ми опрацьовуємо в першу чергу на
            наступний робочий день.
          </p>
          <p>
            Ми працюємо без мінімального замовлення. Всі ціни на сайті
            представлені за 1 одиницю товару.
          </p>
          <p>Термін відправки 1-3 робочих дні з моменту оплати замовлення.</p>
        </div>
      </section>
      <section className={styles.section}>
        <p className={styles.section_title}>Оплата</p>
        <div style={{ margin: "0 20px" }}>
          <p className={styles.text_decor}>
            Вся олія віджимається індивідуально для кожного клієнта після
            отримання Вашого замовлення, що гарантує максимальну свіжість та
            збереження всіх корисних речовин.
          </p>
          <p>
            У нас діє 100% передоплата. Після отримання Вашого замовлення з Вами
            звʼяжеться менеджер аби підтвердити дані необхідні для доставки та
            надасть вам реквізити для оплати.
          </p>
          <p>
            Будь ласка, вказуйте Ваше прізвище в призначенні платежу при
            здійсненні оплати!
          </p>
          <p>Ми працюємо офіційно дотримуючись всіх вимог законодавства. </p>
        </div>
      </section>
      <section className={styles.section}>
        <p className={styles.section_title}>Доставка</p>
        <div style={{ margin: "0 20px" }}>
          <p className={styles.text_decor}>
            У нас власне, надійне пакування, тому Вам не доведеться доплачувати
            за нього на пошті.
          </p>
          <div style={{ marginBottom: "20px" }}>
            <b>Доставити замовлення можна в такий спосіб:</b>
          </div>
          <ul>
            <li>
              <div className={styles.dostavka_title}>
                <img src={kurier} width={100} alt="kurier icon" />
                <div>
                  <b>Кур'єром по Львову </b>
                </div>
              </div>
              <p style={{ marginTop: "10px" }}>
                (+смт. Брюховичі, с.Бірки, с.Ясниська, с.Збиранка, с. Рудно,
                с.Підрясне, с.Зимна Вода, с.Малехів)
              </p>
              <p>Вартість доставки по Львову становить 50 грн.</p>
              <p>
                При замовленні на суму більше 1000 грн доставка - безкоштовною.
              </p>
              <p>Деталі доставки обговорюються з менеджером.</p>
            </li>
            <li>
              <div className={styles.dostavka_title}>
                <img src={nova} width={100} alt="nova poshta icon" />
                <div>
                  <b>
                    Доставка кур'єрською службою Нова Пошта до відділення чи
                    поштомату
                  </b>
                </div>
              </div>
              <p style={{ marginTop: "10px" }}>
                Вартість доставки на склад Нової Пошти у Ваше місто буде
                становити від 50 грн або безкоштовно при замовленні від 1000
                грн.
              </p>
              <p>
                Доставка товару займає 1-3 дні в залежності від місця
                призначення. При отриманні потрібно мати при собі посвідчення
                особи.
              </p>
              <p>
                Звертаємо Вашу увагу, що на відділенні одержувача посилки
                зберігаються до 5 робочих днів. Після закінчення терміну
                зберігання посилки повертаються на наш склад.
              </p>
              <p>
                Повторна відправка замовлення можлива на протязі 3-х робочих
                днів після повернення посилки за рахунок клієнта.
              </p>
            </li>
            <li>
              <div className={styles.dostavka_title}>
                <img src={nova} width={100} alt="nova poshta icon" />
                <div>
                  <b>Доставка кур'єрською службою Нова Пошта до дверей</b>
                </div>
              </div>
              <p style={{ marginTop: "10px" }}>
                Ви можете отримати товар до себе додому, оформивши замовлення з
                доставкою "до дверей". Вартість доставки буде складати додатково
                до 50 грн, до вартість цієї послуги( Ви оплачуєте при оформленні
                замовлення). Всі інші умови оплати доставки зберігаються.
              </p>
              <p>
                Після підтвердження замовлення нашим менеджером, доставка займе
                1-3 дні в залежності від місця призначення.
              </p>
              <p>
                Звертаємо Вашу увагу, що кур'єр здійснює не більше 3-х спроб
                (протягом 3 днів) доставки замовлення за вказаною Вами адресою.
                Після закінчення кількості спроб доставки посилки повертаються
                на наш склад.
              </p>
              <p>
                Повторна відправка замовлення можлива на протязі 3-х робочих
                днів після повернення посилки за рахунок клієнта.
              </p>
              <p>
                Детальніше про доставку поштового оператора Нова Пошта можна
                дізнатися за посиланням{" "}
                <a
                  href="https://novaposhta.ua/basic_tariffs"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://novaposhta.ua/basic_tariffs
                </a>
              </p>
            </li>
            <li>
              <div className={styles.dostavka_title}>
                <img src={ukr} width={100} alt="ukr poshta icon" />
                <div>
                  <b>Доставка кур'єрською службою Укрпошта до відділення</b>
                </div>
              </div>
              <p style={{ marginTop: "10px" }}>
                Вартість доставки до відділення у Ваше місто буде становити від
                40 грн або безкоштовно при замовленні від 1000 грн.
              </p>
              <p>
                Доставка товару займає 2-8 днів в залежності від міста
                призначення.
              </p>
              <p>
                Звертаємо Вашу увагу, що на відділенні одержувача посилки
                зберігаються до 7 днів. Після закінчення терміну зберігання
                посилки повертаються на наш склад.
              </p>
              <p>
                Повторна відправка замовлення можлива на протязі 3-х робочих
                днів після повернення посилки за рахунок клієнта.
              </p>
              <p>
                Детальніше про доставку поштового оператора Укрпошта можна
                дізнатися тут{" "}
                <a
                  href="https://www.ukrposhta.ua/ua/taryfy-ukrposhta-ekspres"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://www.ukrposhta.ua/ua/taryfy-ukrposhta-ekspres
                </a>
              </p>
            </li>
            <li>
              <div className={styles.dostavka_title}>
                <img src={meest} width={100} alt="meest poshta icon" />
                <div>
                  <b>Доставка кур'єрською службою Міст до відділення</b>
                </div>
              </div>
              <p style={{ marginTop: "10px" }}>
                Вартість доставки до відділення у Ваше місто буде становити від
                60 грн або безкоштовно при замовленні від 1000 грн.
              </p>
              <p>
                Доставка товару займає 2-8 днів в залежності від місця
                призначення.
              </p>
              <p>
                Звертаємо Вашу увагу, що на відділенні одержувача посилки
                зберігаються до 5 днів. Після закінчення терміну зберігання
                посилки повертаються на наш склад.
              </p>
              <p>
                Повторна відправка замовлення можлива на протязі 3-х робочих
                днів після повернення посилки за рахунок клієнта.
              </p>
              <p>
                Детальніше про доставку поштового оператора Міст можна дізнатися
                тут{" "}
                <a
                  href="https://meestposhta.com.ua/storage/pdf/Tariffs%20Ukraine/tariffs_na_poslugi_dostavki_dlya_privatnih_clients.pdf?_t=1704719284"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://meestposhta.com.ua/storage/pdf/Tariffs%20Ukraine/tariffs_na_poslugi_dostavki_dlya_privatnih_clients.pdf?_t=1704719284
                </a>
              </p>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
