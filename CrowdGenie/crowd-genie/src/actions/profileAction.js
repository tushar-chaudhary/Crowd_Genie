import axios from 'axios';
import jwt_decode from 'jwt-decode';

import {
  GET_CURRENT_USER,
  GET_ERRORS,
  UPDATE_CURRENT_USER,
  REQUEST_LOAN,
  GET_ALL_LOAN_REQUEST,
  SUBMIT_LOAN_REQUEST
} from './types';

export const getUser = () => dispatch => {
  axios
    .get('/api/auth/current')
    .then(res =>
      dispatch({
        type: GET_CURRENT_USER,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const updateUser = userData => dispatch => {
  axios.post('/api/auth/updatecurrent', userData).then(
    axios
      .get('/api/auth/current')
      .then(res =>
        dispatch({
          type: UPDATE_CURRENT_USER,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      )
  );
};

export const forwardRequest = userData => dispatch => {
  axios
    .post('/api/borrower/request_loan', userData)
    .then(res =>
      dispatch({
        type: REQUEST_LOAN,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const getallloanRequest = () => dispatch => {
  axios
    .get('/api/borrower/all')
    .then(res =>
      dispatch({
        type: GET_ALL_LOAN_REQUEST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const submitloanRequest = userData => dispatch => {
  axios
    .post('/api/lender/grant_loan', userData)
    .then(res =>
      dispatch({
        type: SUBMIT_LOAN_REQUEST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
