import { Item } from '@/types';
import { PropsWithChildren, useReducer } from 'react';
import { CartContext } from './cart-context';
import { CartReducer, sumItems } from './cart-reducer';

let storage: Item[] = [];

if (typeof window !== 'undefined') {
  storage = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems')!)
    : [];
}

export function CartProvider({ children }: PropsWithChildren) {
  const initialState = {
    cartItems: storage,
    ...sumItems(storage),
    checkout: false,
  };
  const [state, dispatch] = useReducer(CartReducer, initialState);

  /**
   * Function to handle when an item is added from the store into the Cart
   */
  function addToCart(payload: Item) {
    dispatch({ type: 'ADD_TO_CART', payload });
  }

  /**
   * Function to handle when an item that is in the cart is added again
   */
  function increase(payload: Item) {
    dispatch({ type: 'INCREASE', payload });
  }

  /**
   * Function to handle when an item is removed from the cart
   */
  function decrease(payload: Item) {
    dispatch({ type: 'DECREASE', payload });
  }

  /**
   * Function to remove an item from the cart
   */
  function removeFromCart(payload: Item) {
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
