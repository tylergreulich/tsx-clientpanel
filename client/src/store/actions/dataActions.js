import { GET_DATA } from './actionTypes';
import axios from 'axios';

export const getData = () => dispatch => {
  axios
    .get('/api/clients')
    .then(res => dispatch({ type: GET_DATA, payload: res.data }))
    .catch(err => console.log(err));
};
