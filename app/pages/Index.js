import * as React from "react";
import {autobind} from "core-decorators";

import {withRouter} from 'react-router';

import {Button, Card, CardBlock} from "reactstrap";

@withRouter
@autobind
class IndexPage extends React.Component {
    render() {
        return (
            <section className="container">
                <h1>Webpack bundles:</h1>
                <Card>
                    <CardBlock>
                        Hello
                    </CardBlock>
                </Card>
            </section>
        );
    }
}

export {IndexPage as default};
