
//Taleh Muzaffarov
import { combineReducers } from 'redux';
import TestReducer from './TestReducer';
import ActiveReducer from './ActiveReducer'
export default combineReducers({
    test: TestReducer,
    active: ActiveReducer
});
