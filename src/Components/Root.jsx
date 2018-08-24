import React, { Component } from "react";

import { SemanticToastContainer } from "react-semantic-toasts";
import Routing from "./Routing";

import "semantic-ui-css/semantic.min.css";
import "react-virtualized/styles.css";

export class Root extends Component {
  render() {
    return (
      <div>
        <Routing />
        <SemanticToastContainer position="bottom-right" />
      </div>
    );
  }
}

export default Root;
