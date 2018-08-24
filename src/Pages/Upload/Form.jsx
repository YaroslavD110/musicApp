import React from "react";
import PropTypes from "prop-types";
import { reduxForm, change } from "redux-form";
import { Form, Button } from "semantic-ui-react";
import styled from "styled-components";
import { connect } from "react-redux";
import { UploadSong } from "../../Ducks/music/upload";

import FileField from "../../Common/Form/Fields/FileField/index";
import SimpleField from "../../Common/Form/Fields/SimpleField";
import DatalistField from "../../Common/Form/Fields/DatalistField";

const validate = values => {
  const errors = {};

  if (!values.songName) {
    errors.songName = "Name of song is Required";
  } else if (values.songName.length < 3) {
    errors.songName = "Name of song must be 3 characters or more";
  }

  if (!values.playlist) {
    errors.playlist = "Playlist is Required";
  } else if (values.playlist.length < 3) {
    errors.playlist = "Name of playlist must be 3 characters or more";
  }

  if (!values.song) {
    errors.song = "Song is Required";
  } else if (
    values.song[0].type !== "audio/mp3" ||
    !/^.+\.mp3$/i.test(values.song[0].name)
  ) {
    errors.song = "Song has invalid type or name";
  }

  return errors;
};

export const UploadForm = ({
  handleSubmit,
  setFieldValue,
  formErrors,
  submitFailed,
  submitSucceeded,
  isLoading,
  UploadSong,
  userID,
  reset,
  playlists
}) => {
  const handleSuccessFormSubmit = ({ song, songName, playlist }) =>
    UploadSong({
      userID,
      song: song[0],
      songName,
      playlist
    });

  const options = playlists && playlists.toArray();

  if (submitSucceeded && !isLoading) reset();

  return (
    <FormWrap>
      <Form
        onSubmit={handleSubmit(handleSuccessFormSubmit)}
        loading={isLoading}
      >
        <StyledFieldWrap>
          <SimpleField
            name="songName"
            label="Enter your song name"
            type="text"
            placeholder="Enter your song name"
            submitFailed={submitFailed}
            formErrors={formErrors}
          />
        </StyledFieldWrap>

        <StyledFieldWrap>
          <DatalistField
            name="playlist"
            label="Select or enter playlist for your new song"
            placeholder="Playlist for your new song"
            submitFailed={submitFailed}
            formErrors={formErrors}
            options={options}
          />
        </StyledFieldWrap>

        <StyledFieldWrap>
          <FileField
            name="song"
            type="file"
            icon="file audio outline"
            title="Drop your music here"
            subtitle="Or click here to select local music"
            submitFailed={submitFailed}
            formErrors={formErrors}
            setFieldValue={setFieldValue}
          />
        </StyledFieldWrap>

        <Button type="submit">Upload</Button>
      </Form>
    </FormWrap>
  );
};

const FormWrap = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 50px;
  width: 500px;

  > form {
    width: 100%;
  }
`;

const StyledFieldWrap = styled(Form.Field)`
  margin-bottom: 20px;
  width: 100%;
`;

UploadForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired
};

export const formName = "UploadForm";
export default connect(
  state => ({
    formErrors: state.form[formName] && state.form[formName].syncErrors,
    userID: state.User.get("userID"),
    isLoading: state.Music.upload.get("isLoading"),
    playlists: state.Music.playlist.get("playlists")
  }),
  dispatch => ({
    setFieldValue(field, value) {
      dispatch(change(formName, field, value));
    },
    UploadSong(songObj) {
      dispatch(UploadSong(songObj));
    }
  })
)(
  reduxForm({
    form: formName,
    validate
  })(UploadForm)
);
