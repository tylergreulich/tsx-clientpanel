import { GET_DATA } from '../actions/actionTypes';

const initialState = {
  data: {}
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DATA:
      return {
        ...state,
        data: action.payload
      };

    default:
      return state;
  }
};

export default dataReducer;
