import {
    SET_ERROR,
   } from '../../actions/errorActions';

const initialState = {
    error: {},
};
  
const errorReducer = (state = JSON.parse(JSON.stringify(initialState)), action) => {
    switch (action.type) {
        case SET_ERROR:
            return { 
              ...state, 
              error: action.error,
            };

        default:
            return state;
    }
}

export default errorReducer;