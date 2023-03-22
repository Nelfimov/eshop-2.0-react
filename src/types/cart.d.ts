import { Product } from './product';

export interface Cart {
  cartItems: CartItem[];
  totalCart: number;
  totalDiscount: number;
  totalShipping: number;
  itemCount: number;
}

export interface CartItem extends Partial<Product> {
  id: string;
  quantity: number;
  price: number;
  shippingCost: number;
  discount: number;
}
