import {
  ADD_CLIENT,
  GET_CLIENTS,
  DELETE_CLIENT,
  GET_CLIENT,
  SET_CLIENT_LOADING,
  CLIENT_WAS_EDITED,
  RESET_CLIENT_WAS_EDITED
} from '../actions/actionTypes';

const initialState = {
  clients: [],
  client: {},
  loading: false,
  isUpdated: false
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

    case GET_CLIENT:
      return {
        ...state,
        client: action.payload,
        loading: false
      };

    case SET_CLIENT_LOADING:
      return {
        ...state,
        loading: true
      };

    case CLIENT_WAS_EDITED:
      return {
        ...state,
        isUpdated: true
      };

    case RESET_CLIENT_WAS_EDITED:
      return {
        ...state,
        isUpdated: false
      };

    // case DELETE_CLIENT:
    //   return {
    //     ...state,
    //     clients: {
    //       ...state.clients,
    //       clients: {
    //         ...state.clients.clients,
    //         clients: state.clients.clients.client.filter(
    //           client => client.client._id !== action.payload
    //         )
    //       }
    //     }
    //   };

    default:
      return state;
  }
};

export default clientReducer;
