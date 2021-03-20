import { createStore, applyMiddleware } from "redux";
import reducers from "../redux/reducers";
import thunkMiddleware from 'redux-thunk-fsa';
import logger from 'redux-logger';

const middleware = [thunkMiddleware];

if (process.env.NODE_ENV !== 'production') {
    middleware.push(logger);
}

const store = createStore(
    reducers,
    {},
    applyMiddleware(...middleware)
);

export default store;