import React from "react";
import PropTypes from "prop-types";
import { Form, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";

import { updateUserData } from "../../Ducks/user";
import SimpleField from "../../Common/Form/Fields/SimpleField";

const validate = values => {
  const errors = {};

  if (!values.email) {
    errors.emeil = "Email is Required";
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

const EmailForm = ({
  submitFailed,
  formErrors,
  handleSubmit,
  updateUserData,
  isLoading,
  hasValue
}) => (
  <Form
    onSubmit={handleSubmit(values => updateUserData(values))}
    loading={isLoading}
  >
    <Form.Field>
      <SimpleField
        name="email"
        label="Enter your new email"
        type="email"
        placeholder="Enter your new email"
        submitFailed={submitFailed}
        formErrors={formErrors}
      />
    </Form.Field>

    <Form.Field>
      <SimpleField
        name="password"
        label="Enter your password"
        type="password"
        placeholder="Enter your password"
        submitFailed={submitFailed}
        formErrors={formErrors}
      />
    </Form.Field>

    <Button type="submit" disabled={!hasValue}>
      Submit
    </Button>
  </Form>
);

EmailForm.propTypes = {
  submitFailed: PropTypes.bool.isRequired,
  formErrors: PropTypes.object,
  handleSubmit: PropTypes.func.isRequired,
  updateUserData: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  hasValue: PropTypes.bool
};

export const formName = "UserEmailForm";
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
  })(EmailForm)
);
