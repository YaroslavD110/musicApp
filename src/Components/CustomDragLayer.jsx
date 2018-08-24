import React, { Component } from "react";
import PropTypes from "prop-types";
import { DragLayer } from "react-dnd";
import styled from "styled-components";

import Song from "../Common/Song";

export class CustomDragLayer extends Component {
  static propTypes = {
    isDragging: PropTypes.bool.isRequired,
    item: PropTypes.object,
    itemType: PropTypes.string,
    offset: PropTypes.object
  };

  lastUpdate = +new Date();
  updateTimer = null;

  _getDragItem = () => {
    const { offset, item, itemType } = this.props;

    if (!offset || itemType !== "song") return null;

    let transform = `translate(${offset.x}px, ${offset.y + 100}px)`;

    return (
      <ItemWrap style={{ transform, WebkitTransform: transform }}>
        <Song song={item} />
      </ItemWrap>
    );
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (+new Date() - this.lastUpdate > 16) {
      this.lastUpdate = +new Date();
      clearTimeout(this.updateTimer);
      return true;
    } else {
      this.updateTimer = setTimeout(() => {
        this.forceUpdate();
      }, 100);
    }
    return false;
  }

  render() {
    const { isDragging } = this.props;

    if (!isDragging) return null;
    return <Layer>{this._getDragItem()}</Layer>;
  }
}

const Layer = styled.div`
  position: fixed;
  z-index: 999999;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  pointer-events: none;
`;

const ItemWrap = styled.div`
  cursor: move;
  z-index: 1000000;
  opacity: 0.8;
`;

export default DragLayer(monitor => ({
  item: monitor.getItem(),
  itemType: monitor.getItemType(),
  isDragging: monitor.isDragging(),
  offset: monitor.getSourceClientOffset()
}))(CustomDragLayer);
