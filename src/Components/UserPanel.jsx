import React, { Component } from "react";
import PropTypes from "prop-types";
import { Image, Divider, Header, Icon, Transition } from "semantic-ui-react";
import styled from "styled-components";
import { connect } from "react-redux";
import userIcon from "../images/user-icon.png";
import { Link } from "react-router-dom";

export class UserPanel extends Component {
  state = { showAddIcon: false };

  handleMouseEnter = () => this.setState({ showAddIcon: true });
  handleMouseLeave = () => this.setState({ showAddIcon: false });

  render() {
    const { showAddIcon } = this.state;
    const { userPhoto, userName } = this.props;

    return (
      <UserPanelWrap>
        <ImageWrap
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        >
          <Image src={userPhoto || userIcon} size="tiny" circular />
          <Transition visible={showAddIcon} animation="scale" duration={300}>
            <IconWrap>
              <Link to="/settings">
                <Icon name="cog" />
              </Link>
            </IconWrap>
          </Transition>
        </ImageWrap>
        <StyledHeader as="h4">{userName}</StyledHeader>
        <StyledDivider />
      </UserPanelWrap>
    );
  }
}

const UserPanelWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 15px;
`;

const StyledHeader = styled(Header)`
  margin-top: 10px !important;
`;

const StyledDivider = styled(Divider)`
  margin: 0;
  width: 100%;
`;

const ImageWrap = styled.div`
  position: relative;
  overflow: hidden;
`;

const IconWrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  border-radius: 500rem;
  background-color: rgba(0, 0, 0, 0.5);

  > a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    font-size: 27px !important;
    color: #fff;

    > i {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &:hover {
      color: #fff;
    }
  }
`;

UserPanel.propTypes = {
  userPhoto: PropTypes.string,
  userName: PropTypes.string
};

export default connect(state => ({
  userPhoto: state.User.get("userPhoto"),
  userName: state.User.get("userName")
}))(UserPanel);
