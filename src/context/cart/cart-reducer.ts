import { CartActions, Cart, CartItem, Product } from '@/types';
import {
  REMOVE_ITEM,
  ADD_TO_CART,
  INCREASE,
  DECREASE,
  CHECKOUT,
  CLEAR,
  INIT,
  UPDATE_PRICES,
} from './cart-types';

export function sumItems(cartItems: CartItem[]) {
  const itemCount = cartItems.reduce(
    (total, product) => total + product.quantity,
    0
  );
  const total = parseInt(
    cartItems
      .reduce((total, product) => total + product.price * product.quantity, 0)
      .toFixed(2)
  );
  return { itemCount, total };
}

export function CartReducer(state: Cart, action: CartActions) {
  switch (action.type) {
    case INIT:
      return {
        ...state,
        cartItems: [...action.payload.cartItems],
      };

    case ADD_TO_CART:
      if (!state.cartItems.find((item) => item.id === action.payload!.id)) {
        state.cartItems.push({
          id: action.payload!.id,
          price: action.payload!.totalPrice,
          quantity: 1,
        });
      }

      return {
        ...state,
        ...sumItems(state.cartItems),
        cartItems: [...state.cartItems],
      };

    case REMOVE_ITEM:
      return {
        ...state,
        ...sumItems(
          state.cartItems.filter((item) => item.id !== action.payload.id)
        ),
        cartItems: [
          ...state.cartItems.filter((item) => item.id !== action.payload.id),
        ],
      };

    case INCREASE:
      state.cartItems[
        state.cartItems.findIndex((item) => item.id === action.payload.id)
      ].quantity++;
      return {
        ...state,
        ...sumItems(state.cartItems),
        cartItems: [...state.cartItems],
      };

    case DECREASE:
      const index = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index >= 0) {
        state.cartItems[index].quantity > 1
          ? state.cartItems[index].quantity--
          : state.cartItems.splice(index, 1);
      }
      return {
        ...state,
        ...sumItems(state.cartItems),
        cartItems: [...state.cartItems],
      };

    case CHECKOUT:
      return {
        cartItems: [],
        checkout: true,
        ...sumItems([]),
      };

    case CLEAR:
      return {
        ...state,
        cartItems: [],
        ...sumItems([]),
      };

    case UPDATE_PRICES:
      action.payload.forEach((product: Product) => {
        state.cartItems[
          state.cartItems.findIndex((item) => item.id === product._id)
        ].price = product.totalPrice;
      });
      return {
        ...state,
        ...sumItems(state.cartItems),
        cartItems: [...state.cartItems],
      };

    default:
      return state;
  }
}
