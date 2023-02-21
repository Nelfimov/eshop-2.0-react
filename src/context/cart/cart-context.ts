import { Item } from '@/types';
import { createContext } from 'react';

interface CartCon {
  cartItems: Item[];
  checkout: boolean;
  removeFromCart: (payload: any) => void;
  addToCart: (payload: any) => void;
  increase: (payload: any) => void;
  decrease: (payload: any) => void;
  clearCart: () => void;
  handleCheckout: () => void;
}

export const CartContext = createContext<CartCon | null>(null);
