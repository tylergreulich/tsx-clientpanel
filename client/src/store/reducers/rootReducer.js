import { combineReducers } from 'redux';
import dataReducer from './dataReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import clientReducer from './clientReducer';

export default combineReducers({
  data: dataReducer,
  errors: errorReducer,
  auth: authReducer,
  client: clientReducer
});
