import React from "react";
import PropTypes from "prop-types";
import { Icon, Dimmer, Loader } from "semantic-ui-react";
import styled from "styled-components";
import { connect } from "react-redux";

import Form from "./Form";

export const UploadPage = ({ isLoading }) => (
  <UploadPageWrap>
    {isLoading && (
      <Dimmer active inverted>
        <Loader>Loading</Loader>
      </Dimmer>
    )}

    <UploadPageHeader>
      <Icon name="upload" /> Upload new music
    </UploadPageHeader>
    <Form />
  </UploadPageWrap>
);

const UploadPageHeader = styled.h1`
  text-align: center;
  margin-bottom: 50px;
`;

const UploadPageWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

UploadPage.propTypes = {
  isLoading: PropTypes.bool.isRequired
};

export default connect(state => ({
  isLoading: state.Music.playlist.get("isLoading")
}))(UploadPage);
