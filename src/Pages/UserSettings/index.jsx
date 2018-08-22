import React from "react";
import { Icon, Tab } from "semantic-ui-react";
import styled from "styled-components";

import MetaForm from "./MetaForm";
import EmailForm from "./EmailForm";
import PasswordForm from "./PasswordForm";

export const UserSettings = () => {
  const tabs = [
    {
      menuItem: "Name & Avatar",
      render: () => (
        <Tab.Pane attached={false}>
          <MetaForm />
        </Tab.Pane>
      )
    },
    {
      menuItem: "Email",
      render: () => (
        <Tab.Pane attached={false}>
          <EmailForm />
        </Tab.Pane>
      )
    },
    {
      menuItem: "Password",
      render: () => (
        <Tab.Pane attached={false}>
          <PasswordForm />
        </Tab.Pane>
      )
    }
  ];

  return (
    <div>
      <UserSettingsHeader>
        <Icon name="cog" /> Set up your account
      </UserSettingsHeader>
      <FormsWrap>
        <Tab panes={tabs} />
      </FormsWrap>
    </div>
  );
};

const UserSettingsHeader = styled.h1`
  text-align: center;
  margin-bottom: 50px;
`;

const FormsWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-bottom: 50px;
  width: 500px;
  margin: 0 auto;
`;

export default UserSettings;
