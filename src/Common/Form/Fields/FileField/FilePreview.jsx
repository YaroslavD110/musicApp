import React, { Component } from "react";
import PropTypes from "prop-types";
import { Segment, Icon, Divider } from "semantic-ui-react";
import styled from "styled-components";

export const SongPreview = ({ song, icon, setFieldValue, fieldName }) => (
  <SongPreviewWrap>
    <MainIconWrap>
      <Icon name={icon} />
    </MainIconWrap>
    <Divider vertical />
    <SongPreviewHeader>{song.name}</SongPreviewHeader>
    <CloseBtn onClick={() => setFieldValue(fieldName, null)}>
      <Icon name="window close outline" />
    </CloseBtn>
  </SongPreviewWrap>
);

const SongPreviewWrap = styled(Segment)`
  display: flex;
  position: relative;
  margin: 0 90px 0 0 !important;
`;

const SongPreviewHeader = styled.h1`
  position: absolute;
  top: 50%;
  left: calc(50% + 20px);
  transform: translate(-50%, -50%);
  margin: 0 !important;
  max-width: 255px;
  overflow: hidden;
  white-space: nowrap;
`;

const MainIconWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  > i {
    display: flex !important;
    justify-content: center;
    align-items: center;
    font-size: 65px !important;
  }
`;

const CloseBtn = styled.div`
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;

  > i {
    font-size: 20px !important;
  }
`;

SongPreview.propTypes = {
  setFieldValue: PropTypes.func.isRequired,
  song: PropTypes.object.isRequired,
  icon: PropTypes.string.isRequired,
  fieldName: PropTypes.string.isRequired
};

export default SongPreview;
