/* eslint-disable react/prop-types */
import { createContext, useReducer } from 'react';

export const Store = createContext();
import Cookies from 'js-cookie';

const initialState = {
  cart: Cookies.get('cart')
  ? JSON.parse(Cookies.get('cart'))
  : { cartItems: [] },
};

function reducer(state, action) {
  switch (action.type) {
    case 'CART_ADD_ITEM': {
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item.id === newItem.id
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item.name === existItem.name ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
        Cookies.set('cart', JSON.stringify({ ...state.cart, cartItems }));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case 'CART_REMOVE_ITEM': {
      const cartItems = state.cart.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
      console.log(action.payload.id)
      Cookies.set('cart', JSON.stringify({ ...state.cart, cartItems }));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    default:
      return state;
  case 'CART_CLEAR_ITEMS': {
    Cookies.set(
      'cart',
      JSON.stringify({
        ...state.cart,
        cartItems: [],
      })
    );
  }
      return { ...state, cart: { ...state.cart, cartItems: [] } };
  
  }
}

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{children}</Store.Provider>;
}