import { Item } from "../shared.types";

type newItem = {
  collection: string;
  productName: string;
  size: string;
  price: string;
  amount: number;
};

export default function newOrderDataFormatter(data: Item[]) {
  const formattedData = data.reduce(
    (acc: newItem[], { product, size, amount }) => {
      const priceArr = product.size.find((el) => el[0] === size);
      const obj = {
        collection: product.collection,
        productName: product.name,
        size: size,
        price: priceArr ? priceArr[1] : "",
        amount: amount,
      };
      acc.push(obj);
      return acc;
    },
    []
  );

  return formattedData;
}
