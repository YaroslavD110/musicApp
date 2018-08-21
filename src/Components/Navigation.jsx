import React, { Component } from "react";
import PropTypes from "prop-types";
import { Menu } from "semantic-ui-react";
import styled from "styled-components";
import { connect } from "react-redux";

import pagesConfig from "../Pages";
import UserPanel from "./UserPanel";
import MenuLink from "../Common/MenuLink";

class Navigation extends Component {
  static propTypes = {
    pagePath: PropTypes.string.isRequired
  };

  render() {
    const { pagePath } = this.props;

    return (
      <StyledMenu pointing secondary vertical>
        <UserPanel />
        {pagesConfig.map(page => (
          <MenuLink
            key={page.name}
            path={page.path}
            pagePath={pagePath}
            iconName={page.iconName}
          >
            {page.name}
          </MenuLink>
        ))}
      </StyledMenu>
    );
  }
}

const StyledMenu = styled(Menu)`
  height: 100%;
  width: 150px;
`;

export default connect(state => ({
  pagePath: state.Router.location.pathname
}))(Navigation);
