import React from "react";
import PropTypes from "prop-types";
import { Form, Button } from "semantic-ui-react";
import { Field } from "redux-form";
import { connect } from "react-redux";
import { signUpUser } from "../../../Ducks/auth/signUp";

const SignUp = ({ handleSubmit, signUpUser }) => {
  const handleSuccessSubmit = value => {
    console.log("Sign Up value :", value);

    signUpUser(value);
  };

  return (
    <div>
      <Form onSubmit={handleSubmit(handleSuccessSubmit)}>
        <Form.Field>
          <label>Your Name</label>
          <Field name="name" type="text" component="input" placeholder="Name" />
        </Form.Field>
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

SignUp.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

export default connect(
  null,
  { signUpUser }
)(SignUp);
