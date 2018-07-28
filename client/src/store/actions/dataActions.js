import { GET_DATA, GET_ERRORS } from './actionTypes';
import axios from 'axios';

export const getData = () => dispatch => {
  axios
    .get('http://localhost:5000/api/users/test')
    .then(res => dispatch({ type: GET_DATA, payload: res.data }))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};
