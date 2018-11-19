import isEmpty from '../validation/is-empty';

import {
  GET_CURRENT_USER,
  UPDATE_CURRENT_USER,
  REQUEST_LOAN
} from '../actions/types';

const initialState = {
  profile: {},
  loanData: {}
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
    case REQUEST_LOAN:
      return {
        ...state,
        loanData: action.payload
      };
    default:
      return state;
  }
}
