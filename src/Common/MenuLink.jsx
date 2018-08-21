import React from "react";
import PropTypes from "prop-types";
import { Menu, Icon } from "semantic-ui-react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const MenuLink = ({ path, pagePath, iconName, children }) => (
  <Menu.Item name={path} active={path === pagePath}>
    <StyledLink to={path}>
      <Icon name={iconName} />
      {children}
    </StyledLink>
  </Menu.Item>
);

const StyledLink = styled(Link)`
  color: inherit;
  font-size: 16px;

  &:hover {
    color: inherit;
  }
`;

MenuLink.propTypes = {
  path: PropTypes.string.isRequired,
  pagePath: PropTypes.string.isRequired,
  iconName: PropTypes.string.isRequired
};

export default MenuLink;
