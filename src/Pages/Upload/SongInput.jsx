import React from "react";
import PropTypes from "prop-types";
import { DropTarget } from "react-dnd";
import { NativeTypes } from "react-dnd-html5-backend";

import SongPreview from "./SongPreview";
import UploadArea from "./UploadArea";

export const SongInput = ({
  input: { value, ...inputProps },
  connectDropTarget,
  isOver,
  setFieldValue,
  error
}) => {
  if (value) {
    return <SongPreview setFieldValue={setFieldValue} song={value[0]} />;
  }

  return (
    <UploadArea
      connectDropTarget={connectDropTarget}
      inputProps={inputProps}
      isOver={isOver}
      error={error}
    />
  );
};

SongInput.propTypes = {
  isOver: PropTypes.bool.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  input: PropTypes.object.isRequired
};

export default DropTarget(
  NativeTypes.FILE,
  {
    drop: (props, monitor) =>
      props.setFieldValue(props.input.name, monitor.getItem().files)
  },
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver() && monitor.canDrop()
  })
)(SongInput);
