import { useContext } from 'react';
import logo from '../../assets/logo.jpg';
import { CartContext } from '../../store/CartContextProvider';

function getCartItemCount(cartItems) {
  return cartItems.reduce(
    (totalItemCount, curItem) => totalItemCount + curItem.quantity,
    0,
  );
}

export default function Header({ onCartClick }) {
  const { state } = useContext(CartContext);

  return (
    <header id="main-header">
      <div id="title">
        <img src={logo} alt="want some seed oils bruh?" />
        <h1 id="title">Blubhub</h1>
      </div>
      <button
        className="text-button"
        onClick={state.cartItems?.length > 0 ? onCartClick : null}
      >
        {'Cart (' + getCartItemCount(state.cartItems) + ')'}
      </button>
    </header>
  );
}
