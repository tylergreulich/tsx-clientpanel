import {
  ADD_CLIENT,
  GET_CLIENTS,
  GET_CLIENT,
  DELETE_CLIENT,
  EDIT_CLIENT,
  GET_ERRORS,
  CLEAR_ERRORS,
  SET_CLIENT_LOADING
} from './actionTypes';
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

export const getClient = clientId => dispatch => {
  dispatch(setClientLoading());
  axios
    .get(`/api/clients/${clientId}`)
    .then(res => dispatch({ type: GET_CLIENT, payload: res.data }))
    .catch(err => dispatch({ type: GET_CLIENT, payload: null }));
};

export const deleteClient = (clientId, history) => dispatch => {
  axios
    .delete(`/api/clients/${clientId}`)
    .then(res => {
      dispatch({
        type: DELETE_CLIENT,
        payload: clientId
      });
      history.push('/');
    })
    .catch(err => dispatch({ type: DELETE_CLIENT, payload: null }));
};

export const editClient = (clientId, clientData, history) => dispatch => {
  axios
    .put(`/api/clients/${clientId}/`, clientData)
    .then(res => {
      dispatch(clearErrors());
      history.push(`/client/${clientId}`);
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};

export const setClientLoading = () => {
  return {
    type: SET_CLIENT_LOADING
  };
};
