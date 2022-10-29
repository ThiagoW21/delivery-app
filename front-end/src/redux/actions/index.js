import axios from 'axios';
import { LOGIN, UPDATE_TABLE } from './actionTypes';

export const userLogin = (email) => ({
  type: LOGIN,
  email,
});

export const updateTable = (users) => ({
  type: UPDATE_TABLE,
  users,
});

export function fetchUsers() {
  return async (dispatch) => {
    const result = await axios.get('http://localhost:3001/user');
    if (!result) dispatch(updateTable([]));
    if (result?.data) dispatch(updateTable(result.data));
  };
}
