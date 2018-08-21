import React, { Component } from "react";
import PropTypes from "prop-types";
import { Icon } from "semantic-ui-react";
import styled from "styled-components";

export class UserSettings extends Component {
  static propTypes = {};

  render() {
    return (
      <div>
        <UserSettingsHeader>
          <Icon name="cog" /> Set up your account
        </UserSettingsHeader>
      </div>
    );
  }
}

const UserSettingsHeader = styled.h1`
  text-align: center;
  margin-bottom: 50px;
`;

export default UserSettings;
