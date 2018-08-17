import React, { Component } from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const ProtectedRoute = ({ isLogged, component: PageComponent, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isLogged ? <PageComponent {...props} /> : <Redirect to="/login" />
    }
  />
);

ProtectedRoute.propTypes = {
  isLogged: PropTypes.bool.isRequired
};

export default connect(state => ({
  isLogged: state.User.get("isLogged")
}))(ProtectedRoute);
