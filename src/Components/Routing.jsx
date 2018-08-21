import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import CustomRoute from "../Common/CustomRoute";

import pagesConfig from "../Pages";
import LoginPage from "../Pages/Login";

export class Routing extends Component {
  render() {
    return (
      <Switch>
        {pagesConfig.map(page => (
          <CustomRoute
            key={page.name}
            exact
            path={page.path}
            component={page.component}
          />
        ))}
        <Route exact path="/login" component={LoginPage} />
      </Switch>
    );
  }
}

export default Routing;
