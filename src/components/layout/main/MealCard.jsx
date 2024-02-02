import { useContext } from 'react';
import { CartContext } from '../../../store/CartContextProvider';
import currencyFormatter from '../../../util/formatter';
import { modifyCart } from '../../../actions/cart-actions';
import HOSTNAME from '../../../config/env';

export default function MealCard({ item }) {
  const { id, name, description, price, image } = item;
  const { dispatch } = useContext(CartContext);

  return (
    <article key={id + 'Article'} className="meal-item">
      <img src={`http://${HOSTNAME}:3000/${image}`} alt="" />
      <h3>{name}</h3>
      <p className="meal-item-price">{currencyFormatter(price)}</p>
      <p className="meal-item-description">{description}</p>
      <button
        className="meal-item-actions button"
        onClick={() => dispatch(modifyCart(item, 1))}
      >
        Add to Cart
      </button>
    </article>
  );
}
