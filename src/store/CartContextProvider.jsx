import { createContext, useReducer } from 'react';
import cartReducer from '../reducers/cart-reducer';

export const CartContext = createContext({
  state: {
    cartItems: [],
  },
  dispatch: () => {},
});

export default function CartContextProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { cartItems: [] });

  const ctxValue = {
    state,
    dispatch,
  };

  return (
    <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
  );
}
