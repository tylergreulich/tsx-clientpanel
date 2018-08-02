import { ADD_CLIENT, GET_CLIENTS } from '../actions/actionTypes';

const initialState = {
  clients: {}
};

const clientReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CLIENTS:
      return {
        ...state,
        clients: action.payload
      };

    case ADD_CLIENT:
      return {
        ...state,
        clients: [...state.clients, action.payload]
      };

    default:
      return state;
  }
};

export default clientReducer;
