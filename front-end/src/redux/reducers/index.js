import { combineReducers } from 'redux';
import user from './user';
import products from './products';
import adm from './adm';
import orders from './orders';

const rootReducer = combineReducers({
  user,
  adm,
  products,
  orders,
});

export default rootReducer;
