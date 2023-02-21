export interface Cart {
  items: Item[];
  checkout: boolean;
}

export interface Item {
  id: string;
  quantity: number;
  price: number;
}
