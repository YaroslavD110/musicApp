import React, { Component } from "react";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router-dom";
import ProtectedRoute from "./common/ProtectedRoute";

import LoginPage from "./Pages/Login";
import HomePage from "./Pages/Home";

export class Routing extends Component {
  static propTypes = {};

  render() {
    return (
      <Switch>
        <ProtectedRoute exact path="/" component={HomePage} />
        <Route exact path="/login" component={LoginPage} />
      </Switch>
    );
  }
}

export default Routing;
