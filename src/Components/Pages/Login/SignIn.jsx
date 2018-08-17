import React from "react";
import PropTypes from "prop-types";
import { Form, Button } from "semantic-ui-react";
import { Field } from "redux-form";
import { connect } from "react-redux";
import { signInUser } from "../../../Ducks/auth/signIn";

const SignIn = ({ handleSubmit, signInUser }) => {
  const handleSuccessSubmit = value => {
    console.log("Sign In value :", value);

    signInUser(value);
  };

  return (
    <div>
      <Form onSubmit={handleSubmit(handleSuccessSubmit)}>
        <Form.Field>
          <label>Your Email</label>
          <Field
            name="email"
            type="email"
            component="input"
            placeholder="Email"
          />
        </Form.Field>
        <Form.Field>
          <label>Your Password</label>
          <Field
            name="password"
            type="password"
            component="input"
            placeholder="Password"
          />
        </Form.Field>
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
};

SignIn.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

export default connect(
  null,
  { signInUser }
)(SignIn);
