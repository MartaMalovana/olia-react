import styles from "./styles.module.scss";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

export default function Slider() {
  return (
    <div className={styles.slider_container}>
      <Carousel
        showArrows={true}
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
      >
        <div className={styles.slider_item}>
          <img
            src={process.env.PUBLIC_URL + "/images/reklama/one.png"}
            alt="product banner"
          />
        </div>
        <div className={styles.slider_item}>
          <img
            src={process.env.PUBLIC_URL + "/images/reklama/two.jpg"}
            alt="product banner"
          />
        </div>
        <div className={styles.slider_item}>
          <img
            src={process.env.PUBLIC_URL + "/images/reklama/three.jpg"}
            alt="product banner"
          />
        </div>
      </Carousel>
    </div>
  );
}
