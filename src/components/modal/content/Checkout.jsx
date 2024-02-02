import { useContext } from 'react';
import InputGroup from '../../layout/InputGroup';
import { CartContext } from '../../../store/CartContextProvider';
import getTotalPriceInCart from '../../../util/cart';
import { resetCart } from '../../../actions/cart-actions';
import HOSTNAME from '../../../config/env';

export default function Checkout({ handleModalClose, handleNextAction }) {
  const { state, dispatch } = useContext(CartContext);

  async function sendOrder(postData) {
    const res = await fetch(`http://${HOSTNAME}:3000/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });
    if (!res.ok) {
      throw Error("Couldn't fetch data");
    }
    dispatch(resetCart());
    handleNextAction();
  }

  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());
    const reqBody = {
      order: {
        customer: data,
        items: state.cartItems,
      },
    };
    sendOrder(reqBody)
      .then(() => event.target.reset())
      .catch((err) => {
        console.log('ERROR: failed to post order to server - ' + err);
        event.target.reset();
      });
  }

  return (
    <>
      <h2>Checkout</h2>
      <p>Total Amount: {getTotalPriceInCart(state.cartItems)}</p>
      <form className="control" onSubmit={handleSubmit}>
        <InputGroup id="name" name="name" label="Full Name" required />
        <InputGroup
          id="email"
          name="email"
          type="email"
          label="Email"
          required
        />
        <InputGroup id="street" name="street" label="Street" required />
        <div className="control-row">
          <InputGroup
            id="postal-code"
            name="postal-code"
            label="Zipcode"
            required
          />
          <InputGroup id="city" name="city" label="City" required />
        </div>
        <div className="modal-actions">
          <button className="text-button" onClick={handleModalClose}>
            Close
          </button>
          <button className="button" type="submit">
            Submit Order
          </button>
        </div>
      </form>
    </>
  );
}
