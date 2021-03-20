import { createStore, applyMiddleware } from "redux";
import reducer from "./reducers";
import thunkMiddleware from 'redux-thunk-fsa';

const middleware = [thunkMiddleware];

if (process.env.NODE_ENV !== 'production') {
    const logger = require('redux-logger');
    middleware.push(logger);
}

const store = createStore(
    reducer,
    null,
    applyMiddleware(...middleware)
);

export default store;