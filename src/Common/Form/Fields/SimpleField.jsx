import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Form } from "semantic-ui-react";
import { Field } from "redux-form";
import styled from "styled-components";

export const SimpleField = ({
  name,
  placeholder,
  label,
  submitFailed,
  formErrors,
  type
}) => (
  <Fragment>
    <label>
      {label}
      {submitFailed &&
        formErrors && (
          <ErrorText>{formErrors[name] && ` | ${formErrors[name]}`}</ErrorText>
        )}
    </label>
    <Field
      name={name}
      type={type}
      placeholder={placeholder}
      error={submitFailed && formErrors && formErrors[name] ? true : false}
      component={Form.Input}
    />
  </Fragment>
);

SimpleField.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  submitFailed: PropTypes.bool.isRequired,
  formErrors: PropTypes.object
};

const ErrorText = styled.span`
  color: rgb(224, 180, 180);
`;

export default SimpleField;
