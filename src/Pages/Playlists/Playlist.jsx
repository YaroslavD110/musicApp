import React, { Component } from "react";
import PropTypes from "prop-types";
import { List } from "react-virtualized";
import { Segment, Header, Divider, Transition } from "semantic-ui-react";
import styled from "styled-components";
import { connect } from "react-redux";
import { DropTarget } from "react-dnd";

import { deleteSong, updateSong } from "../../Ducks/music/songs";
import DraggableSong from "../../Common/DraggableSong";

class Playlist extends Component {
  static propTypes = {
    playlistName: PropTypes.string.isRequired,
    deleteSong: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    songs: PropTypes.array,
    isOver: PropTypes.bool.isRequired
  };

  state = {
    songs: this.props.songs || []
  };

  _rowRenderer = ({ index, key, style }) => (
    <DraggableSong
      song={this.state.songs[index]}
      deleteSong={this.props.deleteSong}
      style={style}
      key={key}
    />
  );

  _filterSongs = songs =>
    songs.filter(song => song.songPlaylist === this.props.playlistName);

  componentWillReceiveProps(newProps) {
    if (newProps.songs) {
      this.setState({
        songs: this._filterSongs(newProps.songs)
      });
    }
  }

  componentWillMount() {
    if (this.state.songs) {
      this.setState({
        songs: this._filterSongs(this.state.songs)
      });
    }
  }

  render() {
    const { playlistName, connectDropTarget, isOver } = this.props;
    const { songs } = this.state;

    if (songs.length < 1) return null;

    return connectDropTarget(
      <div>
        <PlaylistWrap>
          <Transition visible={isOver} animation="scale" duration={500}>
            <PlaylistCover>
              <Header as="h2">
                {`Do you want add this song to "${playlistName}" playlist`}
              </Header>
            </PlaylistCover>
          </Transition>

          <PlaylistHeader>
            <Header as="h2">{playlistName}</Header>
            <Divider />
          </PlaylistHeader>

          <div>
            <StyledList
              height={songs.length < 5 ? songs.length * 115 : 443}
              width={290}
              rowHeight={115}
              rowCount={songs.length}
              rowRenderer={this._rowRenderer}
            />
          </div>
        </PlaylistWrap>
      </div>
    );
  }
}

const StyledList = styled(List)`
  outline: none;

  > div {
    margin-top: -15px;
  }
`;

const PlaylistCover = styled.div`
  position: absolute;
  z-index: 9999;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: #bcbec0;

  > h2 {
    position: absolute;
    z-index: 10000;
    top: 50%;
    left: 50%;
    width: 80%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: #fff !important;
  }
`;

const PlaylistHeader = styled.div`
  margin-bottom: 5px;
  width: 100%;
  text-align: center;
`;

const PlaylistWrap = styled(Segment)`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: fit-content;
  margin: 0 0 30px !important;
`;

export default connect(
  state => ({
    songs:
      state.Music.songs.get("songs") && state.Music.songs.get("songs").toArray()
  }),
  { deleteSong, updateSong }
)(
  DropTarget(
    "song",
    {
      drop(props, monitor) {
        const song = monitor.getItem();
        if (props.playlistName !== song.songPlaylist) {
          props.updateSong({
            ...song,
            songPlaylist: props.playlistName
          });
        }
      }
    },
    (connect, monitor) => ({
      connectDropTarget: connect.dropTarget(),
      isOver: monitor.isOver() && monitor.canDrop()
    })
  )(Playlist)
);
