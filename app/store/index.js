import AppReducer from "./reducers";

import {applyMiddleware, createStore, compose} from "redux";

import {persistStore, autoRehydrate} from 'redux-persist'

import thunk from "redux-thunk";
import promise from "redux-promise-middleware";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store = createStore(
    AppReducer,
    composeEnhancers(applyMiddleware(promise(), thunk), autoRehydrate())
);

if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
        store.replaceReducer(AppReducer);
    });
}

persistStore(store, { whitelist: ['workflow'] });

export default store;