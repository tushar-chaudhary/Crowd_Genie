import isEmpty from '../validation/is-empty';

import {
  GET_CURRENT_USER,
  UPDATE_CURRENT_USER,
  REQUEST_LOAN,
  GET_ALL_LOAN_REQUEST,
  SUBMIT_LOAN_REQUEST
} from '../actions/types';

const initialState = {
  profile: {},
  loanData: {},
  allActiveloan: {},
  grantedLoan: {}
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
    case GET_ALL_LOAN_REQUEST:
      return {
        ...state,
        allActiveloan: action.payload
      };
    case SUBMIT_LOAN_REQUEST:
      return {
        ...state,
        grantedLoan: action.payload
      };
    default:
      return state;
  }
}
