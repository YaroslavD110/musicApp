import React from "react";
import PropTypes from "prop-types";
import { Form, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";

import { updateUserData } from "../../Ducks/user";
import SimpleField from "../../Common/Form/Fields/SimpleField";

const validate = values => {
  const errors = {};

  if (!values.oldPassword) {
    errors.oldPassword = "Old password is Required";
  } else if (values.oldPassword.length < 6) {
    errors.oldPassword = "Old password must be 6 characters or more";
  }

  if (!values.newPassword) {
    errors.newPassword = "New password is Required";
  } else if (values.oldPassword.length < 6) {
    errors.newPassword = "New password must be 6 characters or more";
  }

  if (!values.testPassword) {
    errors.testPassword = "Confirming password is Required";
  } else if (values.testPassword !== values.oldPassword) {
    errors.testPassword = "Passwords must be the same";
  }

  return errors;
};

const PasswordForm = ({
  submitFailed,
  formErrors,
  handleSubmit,
  updateUserData,
  hasValue,
  isLoading
}) => (
  <Form
    onSubmit={handleSubmit(values => updateUserData(values))}
    loading={isLoading}
  >
    <Form.Field>
      <SimpleField
        name="oldPassword"
        label="Enter your old password"
        type="password"
        placeholder="Enter your old password"
        submitFailed={submitFailed}
        formErrors={formErrors}
      />
    </Form.Field>

    <Form.Field>
      <SimpleField
        name="newPassword"
        label="Enter your new password"
        type="password"
        placeholder="Enter your new password"
        submitFailed={submitFailed}
        formErrors={formErrors}
      />
    </Form.Field>

    <Form.Field>
      <SimpleField
        name="testPassword"
        label="Enter your new password again"
        type="password"
        placeholder="Enter your new password again"
        submitFailed={submitFailed}
        formErrors={formErrors}
      />
    </Form.Field>

    <Button type="submit" disabled={!hasValue}>
      Submit
    </Button>
  </Form>
);

PasswordForm.propTypes = {
  submitFailed: PropTypes.bool.isRequired,
  formErrors: PropTypes.object,
  handleSubmit: PropTypes.func.isRequired,
  updateUserData: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  hasValue: PropTypes.bool
};

export const formName = "UserPasswordForm";
export default connect(
  state => ({
    isLoading: state.User.get("isLoading"),
    formErrors: state.form[formName] && state.form[formName].syncErrors,
    hasValue: state.form[formName] && state.form[formName].values ? true : false
  }),
  { updateUserData }
)(
  reduxForm({
    form: formName,
    validate
  })(PasswordForm)
);
