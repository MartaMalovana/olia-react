import styles from "./styles.module.scss";
import ProductList from "../../components/productList/ProductList";
import data from "./naboru.json";
import { Item } from "../../shared.types";

type Props = {
  addItem: (item: Item) => void;
};

export default function Podarynkovi({ addItem }: Props) {
  return (
    <ProductList
      data={data}
      addItem={addItem}
      title={"Набори"}
      folderName={"naboru"}
    />
  );
}
