import { ADD_CLIENT, GET_CLIENTS, GET_ERRORS } from './actionTypes';
import axios from 'axios';

export const addClient = clientData => dispatch => {
  axios
    .post('/api/clients/', clientData)
    .then(res => dispatch({ type: ADD_CLIENT, payload: res.data }))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

export const getClients = userId => dispatch => {
  axios
    .get(`/api/users/${userId}/clients`)
    .then(res => dispatch({ type: GET_CLIENTS, payload: res.data }))
    .catch(err => dispatch({ type: GET_CLIENTS, payload: {} }));
};
