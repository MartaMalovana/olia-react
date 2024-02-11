import data from "./gorihu.json";
import { Item } from "../../shared.types";
import ProductList from "../../components/productList/ProductList";

type Props = {
  addItem: (item: Item) => void;
};

export default function Gorihu({ addItem }: Props) {
  return (
    <ProductList
      data={data}
      addItem={addItem}
      title={"Знежирене насіння та горіхи"}
      folderName={"gorihu"}
    />
  );
}
