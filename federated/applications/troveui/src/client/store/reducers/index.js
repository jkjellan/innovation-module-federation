import { combineReducers } from 'redux';
import offersReducer from './offersReducer';
import appReducer from './appReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  offers: offersReducer,
  app: appReducer,
  error: errorReducer,
});
