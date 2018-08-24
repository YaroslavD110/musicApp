import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { DragSource } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";

import Song from "./Song";

export class DraggableSong extends PureComponent {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectPreview: PropTypes.func.isRequired,
    song: PropTypes.object.isRequired,
    deleteSong: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.connectPreview(getEmptyImage());
  }

  render() {
    const { connectDragSource, style, song, deleteSong } = this.props;

    return connectDragSource(
      <div>
        <GrabCursor>
          <Song style={style} song={song} deleteSong={deleteSong} />
        </GrabCursor>
      </div>
    );
  }
}

const GrabCursor = styled.div`
  cursor: grab;
`;

export default DragSource(
  "song",
  {
    beginDrag(props) {
      return {
        ...props.song
      };
    }
  },
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectPreview: connect.dragPreview()
  })
)(DraggableSong);
