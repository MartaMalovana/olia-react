export type ProductItem = {
  id: number;
  collection: string;
  name: string;
  size: string[][];
  description: string;
  ingredients?: string;
  properties?: string[];
  info?: string[];
  icon: string;
  sizeIcon: string;
  photo: string;
};

export type Item = { product: ProductItem; size: string; amount: number };
