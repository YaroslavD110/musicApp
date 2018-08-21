import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { UICover } from "../Components/UICover";

const ProtectedRoute = ({ isLogged, component: PageComponent, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isLogged ? (
        <UICover>
          <PageComponent {...props} />
        </UICover>
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

ProtectedRoute.propTypes = {
  isLogged: PropTypes.bool.isRequired
};

export default connect(state => ({
  isLogged: state.User.get("isLogged")
}))(ProtectedRoute);
