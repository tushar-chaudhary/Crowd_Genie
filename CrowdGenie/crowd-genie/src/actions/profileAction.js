import axios from 'axios';
import jwt_decode from 'jwt-decode';

import { GET_CURRENT_USER } from './types';

export const getUser = userData => dispatch => {
  axios
    .post('/api/profile/', userData)
    .then(res => {})
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
