import axios from 'axios';
import jwt_decode from 'jwt-decode';

import { GET_CURRENT_USER, GET_ERRORS, UPDATE_CURRENT_USER } from './types';

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
