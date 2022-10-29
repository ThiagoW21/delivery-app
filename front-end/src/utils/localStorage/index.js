export const getCart = () => JSON.parse(localStorage.getItem('cart')) || [];

export const findProductInStorage = (productId) => {
  const cart = getCart();

  return cart.find(({ id }) => id === productId);
};

export const removeProductCart = (id) => {
  const cart = getCart();

  const newCart = cart.filter((product) => Number(product.id) !== Number(id));

  localStorage.setItem('cart', JSON.stringify(newCart));

  return newCart;
};

export const updateProductQuantity = (product, quantity) => {
  if (!quantity) {
    return removeProductCart(product.id);
  }

  const cart = removeProductCart(product.id);

  const newCart = [...cart, { ...product, quantity }];

  localStorage.setItem('cart', JSON.stringify(newCart));
};

export const calcTotalPrice = () => {
  const cart = getCart();

  return cart.reduce((acc, { price, quantity }) => (price * quantity) + acc, 0);
};

export const clearCart = () => {
  localStorage.setItem('cart', JSON.stringify([]));
};
