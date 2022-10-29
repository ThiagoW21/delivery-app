import { UPDATE_TABLE } from '../actions/actionTypes';

const INITIAL_STATE = { users: [] };

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case UPDATE_TABLE:
    return {
      ...state,
      users: [...action.users],
    };
  default:
    return state;
  }
};

export default user;
