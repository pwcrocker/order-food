import { useContext } from 'react';
import { CartContext } from '../../../../store/CartContextProvider';
import { modifyCart } from '../../../../actions/cart-actions';

export default function CartItem({ item }) {
  const { dispatch } = useContext(CartContext);

  return (
    <li className="cart-item">
      <p>{item.name + ' - ' + item.quantity + ' x ' + item.itemPrice}</p>
      <div className="cart-item-actions">
        <button onClick={() => dispatch(modifyCart(item, -1))}>-</button>
        <p>{item.quantity}</p>
        <button onClick={() => dispatch(modifyCart(item, 1))}>+</button>
      </div>
    </li>
  );
}
