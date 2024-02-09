import data from "./boroshno.json";
import { Item } from "../../shared.types";
import ProductList from "../productList/ProductList";

type Props = {
  addItem: (item: Item) => void;
};

export default function Boroshno({ addItem }: Props) {
  return (
    <ProductList
      data={data}
      addItem={addItem}
      title={"Знежирене борошно"}
      folderName={"boroshno"}
    />
  );
}
