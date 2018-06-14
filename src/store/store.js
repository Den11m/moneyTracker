import {createStore, applyMiddleware} from 'redux';
import reducers from '../reducers/index';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

const middleware = [thunk];

const enchancer = composeWithDevTools(applyMiddleware(...middleware));

export default function configureStore(persistedState = {}) {
    return createStore(reducers, persistedState, enchancer);
}
