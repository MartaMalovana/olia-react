import styles from "./styles.module.scss";

export default function PageTitle({ text }: { text: string }) {
  return <div className={styles.page_title}>{text}</div>;
}
