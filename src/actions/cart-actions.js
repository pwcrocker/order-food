export function modifyCart(item, quantity) {
  return {
    type: 'MODIFY_CART',
    payload: {
      quantity: quantity,
      item: item,
    },
  };
}

export function resetCart() {
  return {
    type: 'RESET_CART',
  };
}
