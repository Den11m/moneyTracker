import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {connectRouter} from 'connected-react-router';
import {createBrowserHistory} from 'history';
import reducers from '../reducers/index';

export const history = createBrowserHistory();

const middleware = [thunk];

const enchancer = composeWithDevTools(applyMiddleware(...middleware));


export default function configureStore(persistedState = {}) {
    return createStore(
        connectRouter(history)(reducers),
        persistedState, enchancer
    );
}
