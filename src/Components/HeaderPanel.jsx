import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Menu, Button } from "semantic-ui-react";
import { signOutUser } from "../Ducks/auth/signOut";

const HeaderPanel = ({ signOutUser }) => {
  return (
    <Menu attached="top">
      <Menu.Menu position="right">
        <Menu.Item>
          <Button primary onClick={signOutUser}>
            Sign Out
          </Button>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

HeaderPanel.propTypes = {
  signOutUser: PropTypes.func.isRequired
};

export default connect(
  null,
  { signOutUser }
)(HeaderPanel);
