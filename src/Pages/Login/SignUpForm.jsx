import React from "react";
import PropTypes from "prop-types";
import { Form, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";

import SimpleField from "../../Common/Form/Fields/SimpleField";
import { signUpUser } from "../../Ducks/auth/signUp";

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

const SignUpForm = ({
  handleSubmit,
  signUpUser,
  isLoading,
  formErrors,
  submitFailed
}) => (
  <div>
    <Form
      onSubmit={handleSubmit(value => signUpUser(value))}
      loading={isLoading}
    >
      <Form.Field>
        <SimpleField
          name="name"
          type="text"
          label="Your Name"
          placeholder="Name"
          formErrors={formErrors}
          submitFailed={submitFailed}
        />
      </Form.Field>

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
  </div>
);

SignUpForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  signUpUser: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired
};

export const formName = "SignUpForm";
export default connect(
  state => ({
    isLoading: state.Auth.signUp.get("isLoading"),
    formErrors: state.form[formName] && state.form[formName].syncErrors
  }),
  { signUpUser }
)(
  reduxForm({
    form: formName,
    validate
  })(SignUpForm)
);
