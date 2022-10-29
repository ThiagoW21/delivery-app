import { SET_ORDERS } from '../actions/actionTypes';

const INITIAL_STATE = { orders: [] };

const orders = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_ORDERS:
    return {
      ...state,
      orders: action.data,
    };
  default:
    return state;
  }
};

export default orders;
