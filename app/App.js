import * as React from "react";
import {Provider} from "react-redux";

import {Router, Route} from "react-router";
import {autobind} from "core-decorators";

import "bootstrap/dist/css/bootstrap.css";

import store from "./store";

import Layout from "./layouts/Default";

import IndexPage from "./pages/Index";

@autobind
class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Router history={this.props.history}>
                    <Layout>
                        <Route path="/" exact
                               render={(props) => <IndexPage {...props} />}/>
                    </Layout>
                </Router>
            </Provider>
        );
    }
}
export default App;
