function getNewCartItem(item) {
  return {
    id: item.id,
    name: item.name,
    description: item.description,
    img: item.img,
    itemPrice: item.price,
    quantity: 1,
  };
}

function updateCartItemQuantity(prevCart, itemIdx, quantityChange) {
  const newCartState = [...prevCart];
  const itemToUpdate = { ...newCartState[itemIdx] };

  if (quantityChange < 0 && itemToUpdate.quantity + quantityChange <= 0) {
    newCartState.splice(itemIdx, 1);
  } else {
    itemToUpdate.quantity = itemToUpdate.quantity + quantityChange;
    newCartState[itemIdx] = itemToUpdate;
  }

  return newCartState;
}

export default function cartReducer(state, action) {
  switch (action.type) {
    case 'MODIFY_CART':
      const existingItemIdx = state.cartItems.findIndex(
        (iter) => iter.id === action.payload.item.id,
      );

      if (existingItemIdx >= 0) {
        // returns a new cart with updated item included
        return {
          ...state,
          cartItems: updateCartItemQuantity(
            state.cartItems,
            existingItemIdx,
            action.payload.quantity,
          ),
        };
      }
      return {
        ...state,
        cartItems: [...state.cartItems, getNewCartItem(action.payload.item)],
      };
    case 'RESET_CART':
      return { ...state, cartItems: [] };
    default:
      console.log('WARN: unknown state entered');
      return state;
  }
}
