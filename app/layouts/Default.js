import * as React from "react";

import {withRouter} from 'react-router';

@withRouter
export default class Layout extends React.Component {
  render() {
    return (
      <div className="container">
        {this.props.children}
      </div>
    );
  }
}
