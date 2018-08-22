import React from "react";
import PropTypes from "prop-types";
import { Form, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { reduxForm, change } from "redux-form";

import { updateUserData } from "../../Ducks/user";
import FileField from "../../Common/Form/Fields/FileField/index";
import SimpleField from "../../Common/Form/Fields/SimpleField";

const validate = values => {
  const errors = {};

  if (values.name) {
    if (values.name.length < 3) {
      errors.name = "Name must be 3 characters or more";
    }
  }

  if (values.avatar) {
    if (
      values.avatar[0].type !== "audio/mp3" ||
      !/^.+\.(png|svg|jpe?g)$/i.test(values.avatar[0].name)
    ) {
      errors.song = "Song has invalid type or name";
    }
  }

  return errors;
};

const MetaForm = ({
  submitFailed,
  formErrors,
  setFieldValue,
  handleSubmit,
  updateUserData,
  hasValue,
  isLoading
}) => (
  <Form
    onSubmit={handleSubmit(values => updateUserData(values))}
    loading={isLoading}
  >
    <Form.Field>
      <SimpleField
        name="name"
        label="Enter your new name"
        type="text"
        placeholder="Enter your new name"
        submitFailed={submitFailed}
        formErrors={formErrors}
      />
    </Form.Field>

    <Form.Field>
      <FileField
        name="avatar"
        type="file"
        icon="file image outline"
        title="Drop your avatar image here"
        subtitle="Or click here to select local avatar image"
        submitFailed={submitFailed}
        formErrors={formErrors}
        setFieldValue={setFieldValue}
      />
    </Form.Field>

    <Button type="submit" disabled={!hasValue}>
      Submit
    </Button>
  </Form>
);

MetaForm.propTypes = {
  submitFailed: PropTypes.bool.isRequired,
  formErrors: PropTypes.object,
  setFieldValue: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  updateUserData: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  hasValue: PropTypes.bool
};

export const formName = "UserMetaForm";
export default connect(
  state => ({
    isLoading: state.User.get("isLoading"),
    formErrors: state.form[formName] && state.form[formName].syncErrors,
    hasValue: state.form[formName] && state.form[formName].values ? true : false
  }),
  dispatch => ({
    setFieldValue(field, value) {
      dispatch(change(formName, field, value));
    },
    updateUserData(data) {
      dispatch(updateUserData(data));
    }
  })
)(
  reduxForm({
    form: formName,
    validate
  })(MetaForm)
);
