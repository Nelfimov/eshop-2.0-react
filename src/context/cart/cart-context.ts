import { CartItem, Product } from '@/types';
import { createContext } from 'react';

interface CartCon {
  cartItems: CartItem[];
  itemCount: number;
  total: number;
  checkout: boolean;
  removeFromCart: (payload: Product) => void;
  addToCart: (payload: Product) => void;
  increase: (payload: Product) => void;
  decrease: (payload: Product) => void;
  clearCart: () => void;
  handleCheckout: () => void;
}

export const CartContext = createContext<CartCon | null>(null);
