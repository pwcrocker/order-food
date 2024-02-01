import { useContext, useRef } from 'react';
import logo from '../assets/logo.jpg';
import { CartContext } from '../store/CartContextProvider';
import CartModal from './CartModal';

function getCartItemCount(cartItems) {
  return cartItems.reduce(
    (totalItemCount, curItem) => totalItemCount + curItem.quantity,
    0,
  );
}

export default function Header() {
  const { cartItems } = useContext(CartContext);
  const cartModal = useRef();

  function handleCartClick() {
    cartModal.current.open();
  }

  return (
    <>
      <CartModal ref={cartModal} />
      <header id="main-header">
        <div id="title">
          <img src={logo} alt="want some seed oils bruh?" />
          <h1 id="title">Blubhub</h1>
        </div>
        <button className="text-button" onClick={handleCartClick}>
          {'Cart (' + getCartItemCount(cartItems) + ')'}
        </button>
      </header>
    </>
  );
}
