import React, { Component } from "react";

import Routing from "./Routing";

import "semantic-ui-css/semantic.min.css";

export class Root extends Component {
  render() {
    return (
      <div>
        <Routing />
      </div>
    );
  }
}

export default Root;
