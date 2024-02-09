import ProductList from "../productList/ProductList";
import data from "./olia.json";
import { Item } from "../../shared.types";

type Props = {
  addItem: (item: Item) => void;
};

export default function Olia({ addItem }: Props) {
  return (
    <ProductList
      data={data}
      addItem={addItem}
      title={"Олії"}
      folderName={"olia"}
    />
  );
}
