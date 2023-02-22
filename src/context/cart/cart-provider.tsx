import { Product } from '@/types';
import { PropsWithChildren, useEffect, useReducer } from 'react';
import { CartContext } from './cart-context';
import { CartReducer, sumItems } from './cart-reducer';

export function CartProvider({ children }: PropsWithChildren) {
  const initialState = {
    cartItems: [],
    ...sumItems([]),
    checkout: false,
  };

  const [state, dispatch] = useReducer(CartReducer, initialState);

  useEffect(() => {
    const cartStorage = localStorage.getItem('cart');
    if (cartStorage) {
      dispatch({
        type: 'INIT',
        payload: JSON.parse(cartStorage),
      });
    }
  }, []);

  useEffect(() => {
    if (state !== initialState) {
      localStorage.setItem('cart', JSON.stringify(state));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  /**
   * Function to handle when an item is added from the store into the Cart
   */
  function addToCart(payload: Product) {
    dispatch({ type: 'ADD_TO_CART', payload });
  }

  /**
   * Function to handle when an item that is in the cart is added again
   */
  function increase(payload: Product) {
    dispatch({ type: 'INCREASE', payload });
  }

  /**
   * Function to handle when an item is removed from the cart
   */
  function decrease(payload: Product) {
    dispatch({ type: 'DECREASE', payload });
  }

  /**
   * Function to remove an item from the cart
   */
  function removeFromCart(payload: Product) {
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
        ...state,
        cartItems: state.cartItems,
        addToCart,
        removeFromCart,
        increase,
        decrease,
        handleCheckout,
        clearCart,
        ...sumItems(state.cartItems),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
