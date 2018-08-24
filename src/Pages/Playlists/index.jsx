import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Dimmer, Loader, Icon, Message } from "semantic-ui-react";
import { connect } from "react-redux";

import Playlist from "./Playlist";

export const PlaylistsPage = ({ isLoading, playlists }) => (
  <div>
    <Dimmer active={isLoading} inverted>
      <Loader />
    </Dimmer>

    <PageHeader>
      <Icon name="list" /> Listen music from your playlists
    </PageHeader>

    <PlaylistsWrap>
      {playlists
        ? playlists
            .toArray()
            .map(playlist => (
              <Playlist key={playlist} playlistName={playlist} />
            ))
        : !isLoading && (
            <StyledWarningMessage
              warning
              icon="meh outline"
              header="You don't have music, please upload some songs"
            />
          )}
    </PlaylistsWrap>
  </div>
);

PlaylistsPage.propTypes = {
  isLoading: PropTypes.bool.isRequired
};

const PageHeader = styled.h1`
  width: 100%;
  text-align: center;
  margin-bottom: 25px;
`;

const PlaylistsWrap = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding-bottom: 50px;
`;

const StyledWarningMessage = styled(Message)`
  width: fit-content !important;
`;

export default connect(state => ({
  isLoading:
    state.Music.songs.get("isLoading") || state.Music.playlist.get("isLoading"),
  playlists: state.Music.playlist.get("playlists")
}))(PlaylistsPage);
