import { Cart } from '@/types';
import { PropsWithChildren, useReducer } from 'react';
import { CartContext } from './cart-context';
import { CartReducer } from './cart-reducer';

export function CartProvider({ children }: PropsWithChildren) {
  const initialState: Cart | [] = localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart')!)
    : [];
  const [state, dispatch] = useReducer(CartReducer, initialState);

  /**
   * Function to handle when an item is added from the store into the Cart
   */
  function addToCart(payload: any) {
    dispatch({ type: 'ADD_TO_CART', payload });
  }

  /**
   * Function to handle when an item that is in the cart is added again
   */
  function increase(payload: any) {
    dispatch({ type: 'INCREASE', payload });
  }

  /**
   * Function to handle when an item is removed from the cart
   */
  function decrease(payload: any) {
    dispatch({ type: 'DECREASE', payload });
  }

  /**
   * Function to remove an item from the cart
   */
  function removeFromCart(payload: any) {
    dispatch({ type: 'REMOVE_ITEM', payload });
  }

  /**
   * Function to clear the cart
   */
  function clearCart() {
    dispatch({ type: 'CLEAR' });
  }

  /**
   * Function to handle when the user clicks the checkout button
   */
  function handleCheckout() {
    dispatch({ type: 'CHECKOUT' });
  }

  return (
    <CartContext.Provider
      value={{
        showCart: state.showCart,
        cartItems: state.cartItems,
        addToCart,
        removeFromCart,
        increase,
        decrease,
        handleCheckout,
        clearCart,
        ...state,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
