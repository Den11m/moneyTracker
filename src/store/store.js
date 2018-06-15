import {createStore, applyMiddleware} from 'redux';
import reducers from '../reducers/index';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {createBrowserHistory} from 'history';
import {connectRouter} from 'connected-react-router';

export const history = createBrowserHistory();

const middleware = [thunk];

const enchancer = composeWithDevTools(applyMiddleware(...middleware));


export default function configureStore(persistedState = {}) {
    return createStore(
        connectRouter(history)(reducers),
        persistedState, enchancer
    );
}
