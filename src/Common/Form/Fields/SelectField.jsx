import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Form } from "semantic-ui-react";
import { Field } from "redux-form";
import styled from "styled-components";

export const SelectField = ({
  name,
  placeholder,
  label,
  submitFailed,
  formErrors,
  options,
  setFieldValue
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
      component={({ input }) => (
        <StyledSelect
          error={submitFailed && formErrors && formErrors[name] ? true : false}
          placeholder={placeholder}
          {...input}
          options={options}
          onChange={(e, { value }) => setFieldValue(input.name, value)}
        />
      )}
    />
  </Fragment>
);

SelectField.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  submitFailed: PropTypes.bool.isRequired,
  formErrors: PropTypes.object
};

const StyledSelect = styled(Form.Select)`
  > div {
    width: 100%;
  }
`;

const ErrorText = styled.span`
  color: rgb(224, 180, 180);
`;

export default SelectField;
