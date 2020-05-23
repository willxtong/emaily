import { FETCH_SURVEYS } from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_SURVEYS:
      return action.data;
    default:
      return state;
  }
};
