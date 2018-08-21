import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Form, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";

import SimpleField from "../../Common/Form/Fields/SimpleField";
import { signInUser } from "../../Ducks/auth/signIn";

const validate = values => {
  const errors = {};

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

const SignInForm = ({
  handleSubmit,
  signInUser,
  isLoading,
  formErrors,
  submitFailed
}) => (
  <Fragment>
    <Form
      onSubmit={handleSubmit(value => signInUser(value))}
      loading={isLoading}
    >
      <Form.Field>
        <SimpleField
          name="email"
          type="email"
          label="Your Email"
          placeholder="Email"
          formErrors={formErrors}
          submitFailed={submitFailed}
        />
      </Form.Field>
      <Form.Field>
        <SimpleField
          name="password"
          type="password"
          label="Your Password"
          placeholder="Password"
          formErrors={formErrors}
          submitFailed={submitFailed}
        />
      </Form.Field>
      <Button type="submit">Submit</Button>
    </Form>
  </Fragment>
);

SignInForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  signInUser: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired
};

export const formName = "SignInForm";
export default connect(
  state => ({
    isLoading: state.Auth.signIn.get("isLoading"),
    formErrors: state.form[formName] && state.form[formName].syncErrors
  }),
  { signInUser }
)(
  reduxForm({
    form: formName,
    validate
  })(SignInForm)
);
