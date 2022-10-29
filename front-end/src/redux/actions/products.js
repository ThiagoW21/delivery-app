import { SET_PRODUCTS, SET_TOTAL_PRICE, RM_TOTAL_PRICE } from './actionTypes';

export const productsData = (data) => ({
  type: SET_PRODUCTS,
  data,
});

export const totalPrice = () => ({
  type: SET_TOTAL_PRICE,
  price,
});

export const removeTotalPrice = () => ({
  type: RM_TOTAL_PRICE,
  price,
});
