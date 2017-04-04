import * as React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {AppContainer} from 'react-hot-loader';

import createHistory from "history/createBrowserHistory";
const history = createHistory();

const root = document.getElementById('root');

const render = (Component, props = {}) => {
    ReactDOM.render(
        <AppContainer>
            <Component {...props}/>
        </AppContainer>,
        root
    );
}

render(App, { history });

// Hot Module Replacement API
if (module.hot) {
    module.hot.accept('./App', () => {
        render(App, { history });
    });
}