const INITIAL_STATE = { products: [], totalPrice: 0.00 };

const productData = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'SET_PRODUCTS':
    return {
      ...state,
      products: action.data,
    };
  case 'SET_TOTAL_PRICE':
    return {
      ...state,
      totalPrice: state.totalPrice + action.price,
    };
  case 'RM_TOTAL_PRICE':
    return {
      ...state,
      totalPrice: state.totalPrice - action.price,
    };
  case 'UPDATE_TOTAL_PRICE':
    return {
      ...state,
      totalPrice: action.totalPrice,
    };
  default:
    return state;
  }
};

export default productData;
