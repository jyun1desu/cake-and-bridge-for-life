import { createStore, applyMiddleware } from "redux";
import reducers from "./redux/reducers";
import thunkMiddleware from 'redux-thunk-fsa';

const middleware = [thunkMiddleware];

if (process.env.NODE_ENV !== 'production') {
    const logger = require('redux-logger');
    middleware.push(logger);
}

const store = createStore(
    reducers,
    null,
    applyMiddleware(...middleware)
);

export default store;