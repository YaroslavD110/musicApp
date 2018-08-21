import React from "react";
import PropTypes from "prop-types";
import { Segment, Icon } from "semantic-ui-react";
import styled from "styled-components";

const customId = Date.now();

const UploadArea = ({
  isOver,
  inputProps,
  submitFailed,
  formErrors,
  connectDropTarget
}) => {
  let hasError = submitFailed && formErrors;

  return connectDropTarget(
    <div style={{ width: "100%" }}>
      <label>
        {hasError && <ErrorText>{formErrors[inputProps.name]}</ErrorText>}
      </label>
      <Input {...inputProps} type="file" id={`file-input-${customId}`} />
      <InputArea htmlFor={`file-input-${customId}`}>
        <StyledSegment
          style={{
            backgroundColor: isOver ? "#ddd" : "inherit",
            borderColor: hasError
              ? "rgb(224, 180, 180)"
              : "rgba(34, 36, 38, 0.15)"
          }}
        >
          <StyledIcon
            style={isOver ? { color: "#fff" } : {}}
            name={isOver ? "cloud download" : "download"}
          />
          <BigText style={isOver ? { color: "#fff" } : {}}>
            Drop your music here
          </BigText>
          <SmallText>Or click here to select local music</SmallText>
        </StyledSegment>
      </InputArea>
    </div>
  );
};
const Input = styled.input`
  display: none;
`;

const InputArea = styled.label`
  cursor: pointer;
  width: 100%;
`;

const StyledSegment = styled(Segment)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px 0 !important;
`;

const StyledIcon = styled(Icon)`
  display: flex !important;
  position: relative;
  color: #ddd;
  font-size: 70px !important;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px !important;
`;

const BigText = styled.span`
  font-size: 35px;
  color: #ddd;
  margin-bottom: 20px;
`;

const SmallText = styled.span`
  font-size: 20px;
  color: #ddd;
`;

const ErrorText = styled.span`
  color: rgb(224, 180, 180);
`;

UploadArea.propTypes = {
  isOver: PropTypes.bool.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  inputProps: PropTypes.object.isRequired,
  submitFailed: PropTypes.bool.isRequired,
  formErrors: PropTypes.object
};

export default UploadArea;
