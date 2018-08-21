import React from "react";
import { Tab } from "semantic-ui-react";
import styled from "styled-components";

import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

export const LoginPage = () => {
  const panes = [
    {
      menuItem: "Sign In",
      render: () => <SignInForm />
    },
    {
      menuItem: "Sign Up",
      render: () => <SignUpForm />
    }
  ];

  return (
    <LoginWrapper>
      <Tab
        style={{ width: "320px" }}
        menu={{ secondary: true, pointing: true }}
        panes={panes}
      />
    </LoginWrapper>
  );
};

const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 200px;
  width: 100%;
`;

export default LoginPage;
