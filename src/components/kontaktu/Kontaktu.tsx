import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
// import logo from "PUBLIC_URL/images/kontaktu/logo.png";
// import korobka from "%PUBLIC_URL%/images/kontaktu/korobka.png";
// import meneger from "%PUBLIC_URL%/images/kontaktu/meneger.png";
// import pres from "%PUBLIC_URL%/images/kontaktu/pres.png";
// import qr from "%PUBLIC_URL%/images/kontaktu/qr.png";
// import surobuna from "%PUBLIC_URL%/images/kontaktu/surovuna.png";
import PageTitle from "../pageTitle/PageTitle";

export default function Kontaktu() {
  console.log(process.env);
  return (
    <div className={styles.container}>
      <PageTitle text={"Про нас"} />
      <div className={styles.contacts_section}>
        <img
          src={process.env.PUBLIC_URL + "images/kontaktu/logo.png"}
          width={250}
          alt="company logo"
          className={styles.contacts_img}
        />
        <p className={styles.text}>
          <span>Matolli</span>
          Matolli – це крафтове українське виробництво натуральних олій
          холодного віджиму методом пресування, безглютенового борошна та
          продуктів здорового харчування. Наші олії не тільки корисно, а й
          безпечно вживати в їжу та використовувати в косметології.
        </p>
      </div>
      <div className={styles.contacts_section}>
        <img
          src={process.env.PUBLIC_URL + "images/kontaktu/surovuna.png"}
          width={250}
          alt="company logo"
          className={styles.contacts_img}
        />
        <p className={styles.text}>
          <span>Сировина</span>
          Ми використовуємо сертифіковану сировину найвищої якості, ступінь
          очистки якої сягає до 99%. Додатково миємо та сушимо нашу сировину за
          допомогою обдуву без нагрівання, таким чином при виробництві наших
          олій повністю відсутня термообробка.Таку технологію ми перейняли у
          наших італійських колег.
        </p>
      </div>
      <div className={styles.contacts_section}>
        <img
          src={process.env.PUBLIC_URL + "images/kontaktu/pres.png"}
          width={250}
          alt="company logo"
          className={styles.contacts_img}
        />
        <p className={styles.text}>
          <span>Унікальна технологія виробництва</span>
          Технологія виробництва наших олій поєднує стародавні традиції та
          сучасні інновації, дозволяючи виготовляти для Вас, максимально корисну
          продукцію. Нашу олію ми відтискаємо методом багатотонного пресування
          сировини в капролонових діжках. При виробництві наша олія не контактує
          з металом та не піддається жодному нагріванню. У виробництві наших
          олій ми використовуємо виключно гідравлічні преси та капролонові
          діжки. Чому саме капролонова, а не дубова діжка? Дубова діжка звичайно
          вважається екологічно чистим варіантом, але на жаль неможливо повністю
          очистити таку діжку від залишку олії. Тому, перейнявши практику
          італійських колег ми обрали найсучасніший матеріал - капролон, що
          використовується в харчовій та медичній галузях. В медичній галузі
          капролон використовують для виготовлення шовного матеріалу. Цей
          високоміцний матеріал виявився ідеальним вибором: без запаху, стійкий
          до стирання, мінеральних кислот і лугів. Після кожного віджиму його
          легко очищати, олія не контактує з металом. Наша мета - не лише
          смачна, але й корисна олія, тому ми досліджуємо ринок щодня, щоб
          забезпечити Вам та вашій родині найвищу якість продукції!
        </p>
      </div>
      <div className={styles.contacts_section}>
        <img
          src={process.env.PUBLIC_URL + "images/kontaktu/korobka.png"}
          width={250}
          alt="company logo"
          className={styles.contacts_img}
        />
        <p className={styles.text}>
          <span>Пакування</span>
          Свіжо відтиснуті олії ми відразу розливаємо в заздалегідь
          простерилізовані пляшки з темного скла та коркуємо. Що мінімалізує
          контакт олії з повітрям та сонячними променями. Всі Ваші замовлення ми
          ретельно пакуємо. У нас власне, надійне пакування, тому Вам не
          доведеться доплачувати за нього на пошті.
        </p>
      </div>
      <div className={styles.contacts_section}>
        <img
          src={process.env.PUBLIC_URL + "images/kontaktu/meneger.png"}
          width={250}
          alt="company logo"
          className={styles.contacts_img}
        />
        <p className={styles.text}>
          <span>Індивідуальний підхід</span>
          Наші менеджери завжди радо проконсультують Вас, яку олію, борошно чи
          суміш краще обрати під Ваші потреби та яка олія найбільше смакуватиме
          саме Вам.
        </p>
      </div>
      <Link
        to="/olia"
        className={styles.linkOlia}
        onClick={() => window.scroll(0, 0)}
      >
        Замовити олію
      </Link>
      <img
        src={process.env.PUBLIC_URL + "images/kontaktu/qr.png"}
        width={130}
        height={130}
        className={styles.qr}
        alt="qr code to instagram page"
      />
      <p className={styles.final_text}>
        &quot; Наші олії, суміші та борошно створені для тих, хто обирає більше,
        ніж просто харчування - це спосіб дбати про себе кожен день. Пориньте у
        світ смаку та користі разом із <span>Matolli</span> &quot;
      </p>
    </div>
  );
}
