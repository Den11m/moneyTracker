import {combineReducers} from 'redux';
import test from './testReducers';
import period from './periodReducer';
import spent from './reducerCategory';

const reducers = combineReducers({
    test,
    period,
    spent,
});


export default reducers;