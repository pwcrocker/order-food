import { useRef } from 'react';
import Header from './components/layout/Header';
import Menu from './components/layout/main/Menu';
import Modal from './components/modal/Modal';
import Cart from './components/modal/content/cart/Cart';
import Checkout from './components/modal/content/Checkout';
import OrderTracker from './components/modal/content/OrderTracker';
import CartContextProvider from './store/CartContextProvider';

function App() {
  const cartModal = useRef();
  const checkoutModal = useRef();
  const orderTrackerModal = useRef();

  function handleCartOpen() {
    cartModal.current.open();
  }

  function handleCartClose() {
    cartModal.current.close();
  }

  function handleProceedToCheckout() {
    checkoutModal.current.open();
    cartModal.current.close();
  }

  function handleCheckoutClose() {
    checkoutModal.current.close();
  }

  function handleSubmitOrder() {
    orderTrackerModal.current.open();
    checkoutModal.current.close();
  }

  function handleOrderTrackClose() {
    orderTrackerModal.current.close();
  }

  function handleOrderTrackFinish() {
    orderTrackerModal.current.close();
  }

  return (
    <>
      <CartContextProvider>
        <Modal
          ref={cartModal}
          className="modal cart"
          modalContent={Cart}
          onClose={handleCartClose}
          onNext={handleProceedToCheckout}
        />
        <Modal
          ref={checkoutModal}
          className="modal"
          modalContent={Checkout}
          onClose={handleCheckoutClose}
          onNext={handleSubmitOrder}
        />
        <Modal
          ref={orderTrackerModal}
          className="modal"
          modalContent={OrderTracker}
          onClose={handleOrderTrackClose}
          onNext={handleOrderTrackFinish}
        />
        <Header onCartClick={handleCartOpen} />
        {/* <button onClick={handleProgressBarOpen}>open progress</button> */}
        <Menu />
      </CartContextProvider>
    </>
  );
}

export default App;
