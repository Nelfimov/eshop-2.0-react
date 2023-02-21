import { Product } from './product';

export interface Cart {
  cartItems: CartItem[];
  checkout: boolean;
}

export interface CartItem extends Partial<Product> {
  id: string;
  quantity: number;
  price: number;
}
