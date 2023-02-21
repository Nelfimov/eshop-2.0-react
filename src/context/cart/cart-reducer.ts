import { Item } from '@/types';
import {
  REMOVE_ITEM,
  ADD_TO_CART,
  INCREASE,
  DECREASE,
  CHECKOUT,
  CLEAR,
} from './cart-types';

function Storage(cartItems: Item[]) {
  if (typeof window !== 'undefined')
    localStorage.setItem(
      'cartItems',
      JSON.stringify(cartItems.length > 0 ? cartItems : [])
    );
}

export function sumItems(cartItems: Item[]) {
  Storage(cartItems);
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

export function CartReducer(
  state: any,
  action: {
    type:
      | 'ADD_TO_CART'
      | 'REMOVE_ITEM'
      | 'INCREASE'
      | 'DECREASE'
      | 'CHECKOUT'
      | 'CLEAR';
    payload?: any;
  }
) {
  switch (action.type) {
    case ADD_TO_CART:
      if (
        !state.cartItems.find((item: Item) => item.id === action.payload.id)
      ) {
        state.cartItems.push({
          ...action.payload,
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
          state.cartItems.filter((item: Item) => item.id !== action.payload.id)
        ),
        cartItems: [
          ...state.cartItems.filter(
            (item: Item) => item.id !== action.payload.id
          ),
        ],
      };

    case INCREASE:
      state.cartItems[
        state.cartItems.findIndex((item: Item) => item.id === action.payload.id)
      ].quantity++;
      return {
        ...state,
        ...sumItems(state.cartItems),
        cartItems: [...state.cartItems],
      };

    case DECREASE:
      state.cartItems[
        state.cartItems.findIndex((item: Item) => item.id === action.payload.id)
      ].quantity--;
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
        cartItems: [],
        ...sumItems([]),
      };

    default:
      return state;
  }
}
