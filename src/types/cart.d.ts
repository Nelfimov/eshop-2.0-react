import { Product } from './product';

export interface Cart {
  cartItems: CartItem[];
  checkout: boolean;
  total: number;
  itemCount: number;
}

export interface CartItem extends Partial<Product> {
  id: string;
  quantity: number;
  price: number;
}
