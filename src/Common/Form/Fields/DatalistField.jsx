import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Form } from "semantic-ui-react";
import { Field } from "redux-form";
import styled from "styled-components";

export const DatalistField = ({
  name,
  placeholder,
  label,
  submitFailed,
  formErrors,
  options
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
      error={submitFailed && formErrors && formErrors[name] ? true : false}
      list={name}
      placeholder={placeholder}
      component={Form.Input}
    />
    <datalist id={name}>
      {options && options.map(option => <option key={option} value={option} />)}
    </datalist>
  </Fragment>
);

DatalistField.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  submitFailed: PropTypes.bool.isRequired,
  formErrors: PropTypes.object,
  options: PropTypes.array
};

const ErrorText = styled.span`
  color: rgb(224, 180, 180);
`;

export default DatalistField;
