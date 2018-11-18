import isEmpty from '../validation/is-empty';

import { GET_CURRENT_USER, UPDATE_CURRENT_USER } from '../actions/types';

const initialState = {
  isAuthenticated: false,
  profile: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CURRENT_USER:
      return {
        ...state,
        profile: action.payload
      };
    case UPDATE_CURRENT_USER:
      return {
        ...state,
        profile: action.payload
      };
    default:
      return state;
  }
}
