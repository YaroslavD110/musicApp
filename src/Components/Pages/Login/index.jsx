import React, { Component } from "react";
import PropTypes from "prop-types";
import { Tab, Loader, Dimmer } from "semantic-ui-react";
import styled from "styled-components";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";

import ErrorDisplay from "./ErrorDisplay";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const validate = values => {
  const errors = {};

  if (!values.name) {
    errors.name = "Name is Required";
  } else if (values.name.length < 3) {
    errors.name = "Name must be 3 characters or more";
  }

  if (!values.email) {
    errors.email = "Email is Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Password is Required";
  } else if (values.password.length < 6) {
    errors.password = "Password must be 6 characters or more";
  }

  return errors;
};

export class LoginPage extends Component {
  static propTypes = {
    showLoader: PropTypes.bool.isRequired
  };

  render() {
    const { handleSubmit, submitFailed, showLoader } = this.props;

    const panes = [
      {
        menuItem: "Sign In",
        render: () => <SignIn handleSubmit={handleSubmit} />
      },
      {
        menuItem: "Sign Up",
        render: () => <SignUp handleSubmit={handleSubmit} />
      }
    ];

    return (
      <LoginWrapper>
        <ErrorDisplay submitFailed={submitFailed} />
        <Tab
          style={{ width: "320px" }}
          menu={{ secondary: true, pointing: true }}
          panes={panes}
        />
        {showLoader && (
          <LoaderWrapper>
            <Dimmer active>
              <Loader size="large" />
            </Dimmer>
          </LoaderWrapper>
        )}
      </LoginWrapper>
    );
  }
}

const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 200px;
  width: 100%;
`;

const LoaderWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999999;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

export const formName = "loginForm";

export default connect(state => ({
  showLoader:
    state.Auth.signIn.get("isLoading") || state.Auth.signUp.get("isLoading")
}))(
  reduxForm({
    form: formName,
    validate,
    destroyOnUnmount: false
  })(LoginPage)
);
