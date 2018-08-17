import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Message } from "semantic-ui-react";
import { formName } from "./index";
import styled from "styled-components";
import { Motion, spring } from "react-motion";

const ErrorDisplay = ({ errorsObj, authError, submitFailed }) => {
  let errors = [];

  if (errorsObj.registeredFields && errorsObj.syncErrors) {
    errors = Object.keys(errorsObj.syncErrors)
      .map(key => {
        if (
          errorsObj.registeredFields[key] &&
          errorsObj.registeredFields[key].count > 0
        ) {
          return errorsObj.syncErrors[key];
        } else {
          return null;
        }
      })
      .filter(error => error !== null);
  }

  if (authError) {
    errors.push(authError);
  }

  const style =
    (submitFailed && errors.length > 0) || authError
      ? { scale: spring(1) }
      : { scale: spring(0) };

  return (
    <Motion style={style}>
      {({ scale }) => (
        <FloatMessage
          style={{ transform: `translateX(-50%) scale(${scale})` }}
          error
          header="Please fix these errors:"
          list={errors}
        />
      )}
    </Motion>
  );
};

const FloatMessage = styled(Message)`
  position: absolute !important;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  width: 320px;
`;

ErrorDisplay.propTypes = {
  errorsObj: PropTypes.object,
  authError: PropTypes.string,
  submitFailed: PropTypes.bool.isRequired
};

export default connect(state => ({
  errorsObj: state.form[formName],
  authError: state.Auth.signIn.get("error") || state.Auth.signUp.get("error")
}))(ErrorDisplay);
