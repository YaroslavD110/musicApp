import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { signOutUser } from "../../Ducks/auth/signOut";

export class HomePage extends Component {
  static propTypes = {};

  render() {
    return (
      <div>
        <h1>Hi, it's homepage</h1>
        <button onClick={this.props.signOutUser}>Log Out</button>
      </div>
    );
  }
}

export default connect(
  null,
  { signOutUser }
)(HomePage);
