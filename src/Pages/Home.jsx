import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";
import { Dimmer, Loader, Icon, Message, Input } from "semantic-ui-react";

import { deleteSong } from "../Ducks/music/songs";
import Song from "../Common/Song";

export class HomePage extends Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    deleteSong: PropTypes.func.isRequired,
    songs: PropTypes.array
  };

  state = { songs: this.props.songs || [] };

  _timeOutId;

  _handleFilterInput = e => {
    const value = e.target.value;

    if (this._timeOutId) clearTimeout(this._timeOutId);

    this._timeOutId = setTimeout(() => {
      this.setState({
        songs: this.props.songs.filter(song =>
          new RegExp(value, "i").test(song.songName)
        )
      });
    }, 200);
  };

  componentWillReceiveProps({ songs }) {
    if (songs) {
      this.setState({ songs });
    }
  }

  render() {
    const { deleteSong, isLoading } = this.props;
    const { songs } = this.state;

    return (
      <PageWrap>
        <Dimmer active={isLoading} inverted>
          <Loader />
        </Dimmer>

        <PageHeader>
          <Icon name="home" />
          Hi, it's all your songs
        </PageHeader>

        <InputWrap>
          <Input icon placeholder="Search...">
            <input onInput={this._handleFilterInput} />
            <Icon name="search" />
          </Input>
        </InputWrap>

        {songs &&
          !isLoading &&
          songs.length < 1 && (
            <StyledWarningMessage
              warning
              icon="meh outline"
              header="Nothing was found"
            />
          )}

        {songs ? (
          <SongsWrap>
            {songs &&
              songs.map(song => (
                <Song key={song.songID} song={song} deleteSong={deleteSong} />
              ))}
          </SongsWrap>
        ) : (
          !isLoading && (
            <StyledWarningMessage
              warning
              icon="meh outline"
              header="You don't have music, please upload some songs"
            />
          )
        )}
      </PageWrap>
    );
  }
}

const InputWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 25px;

  input {
    width: 400px !important;
  }
`;

const PageHeader = styled.h1`
  width: 100%;
  text-align: center;
  margin-bottom: 25px;
`;

const SongsWrap = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const PageWrap = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-bottom: 50px;
`;

const StyledWarningMessage = styled(Message)`
  width: fit-content !important;
`;

export default connect(
  state => ({
    isLoading:
      state.Music.songs.get("isLoading") ||
      state.Music.playlist.get("isLoading"),
    songs:
      state.Music.songs.get("songs") && state.Music.songs.get("songs").toArray()
  }),
  { deleteSong }
)(HomePage);
