import React from "react";
import PropTypes from "prop-types";
import { DropTarget } from "react-dnd";
import { NativeTypes } from "react-dnd-html5-backend";
import { Field } from "redux-form";

import FilePreview from "./FilePreview";
import UploadArea from "./UploadArea";

export const FileField = ({
  connectDropTarget,
  isOver,
  setFieldValue,
  icon,
  name,
  type,
  submitFailed,
  formErrors,
  title,
  subtitle
}) => (
  <Field
    name={name}
    type={type}
    component={({ input: { value, ...inputProps } }) => {
      if (value) {
        return (
          <FilePreview
            icon={icon}
            fieldName={inputProps.name}
            setFieldValue={setFieldValue}
            song={value[0]}
          />
        );
      }

      return (
        <UploadArea
          connectDropTarget={connectDropTarget}
          inputProps={inputProps}
          isOver={isOver}
          submitFailed={submitFailed}
          formErrors={formErrors}
          title={title}
          subtitle={subtitle}
        />
      );
    }}
  />
);

FileField.propTypes = {
  isOver: PropTypes.bool.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  submitFailed: PropTypes.bool.isRequired,
  formErrors: PropTypes.object
};

export default DropTarget(
  NativeTypes.FILE,
  {
    drop(props, monitor) {
      return props.setFieldValue(props.name, monitor.getItem().files);
    }
  },
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver() && monitor.canDrop()
  })
)(FileField);
