import React, { PureComponent } from "react";
import styled from "styled-components";

import HeaderPanel from "./HeaderPanel";
import Navigation from "./Navigation";
import CustomDragLayer from "./CustomDragLayer";

export class UICover extends PureComponent {
  render() {
    return (
      <PageWrap>
        <HeaderPanel />
        <MiddleContentWrap>
          <Navigation />
          <MainContentWrap>{this.props.children}</MainContentWrap>
        </MiddleContentWrap>
        <CustomDragLayer />
      </PageWrap>
    );
  }
}

const MiddleContentWrap = styled.div`
  display: flex;
  height: 100%;
`;

const MainContentWrap = styled.div`
  position: relative;
  padding: 25px;
  width: 100%;
  overflow: auto;
`;

const PageWrap = styled.div`
  height: 100vh;
  overflow: hidden;
`;

export default UICover;
