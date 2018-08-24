import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Segment, Button, Icon, Header, Confirm } from "semantic-ui-react";
import { DragSource } from "react-dnd";

import EqulizerIcon from "./EqulizerIcon";

class Song extends Component {
  static propTypes = {
    song: PropTypes.object.isRequired,
    deleteSong: PropTypes.func.isRequired,
    connectDragSource: PropTypes.func.isRequired
  };

  _songRef = React.createRef();

  state = {
    isPlaying: false,
    isAlertOpen: false
  };

  componentDidMount() {
    console.log("songRef :", this._songRef);
  }

  _showAlert = () => this.setState({ isAlertOpen: true });
  _hideAlert = () => this.setState({ isAlertOpen: false });
  _deleteSong = () => {
    this.setState({ isAlertOpen: false });
    this.props.deleteSong(this.props.song.songID);
    console.log(this.props.song.songID, " - deleted (netipa)");
  };

  // Events
  _handleOnPlay = () => this.setState({ isPlaying: true });
  _handleOnPause = () => this.setState({ isPlaying: false });

  // Controls
  _play = () => this._songRef.current.play();
  _pause = () => this._songRef.current.pause();
  _replay = () => (this._songRef.current.currentTime = 0);
  _stop = () => {
    this._songRef.current.pause();
    this._songRef.current.currentTime = 0;
  };

  render() {
    const { isPlaying, isAlertOpen } = this.state;
    const { song, connectDragSource } = this.props;

    return connectDragSource(
      <div style={{ paddingTop: "15px", ...this.props.style }}>
        <Confirm
          open={isAlertOpen}
          content={`Do you want delete "${song.songName}" song?`}
          onCancel={this._hideAlert}
          onConfirm={this._deleteSong}
        />

        <StyledSegment>
          <audio
            ref={this._songRef}
            style={{ display: "none" }}
            src={song.songURL}
            onPlay={this._handleOnPlay}
            onPause={this._handleOnPause}
            controls
          />
          <InfoBoxWrap>
            {isPlaying ? <EqulizerIcon /> : <Icon name="music" />}
          </InfoBoxWrap>
          <BodyWrap>
            <StyledHeader as="h3">{song.songName}</StyledHeader>
            <Button.Group icon>
              <Button onClick={this._play}>
                <Icon name="play" />
              </Button>
              <Button onClick={this._pause}>
                <Icon name="pause" />
              </Button>
              <Button onClick={this._stop}>
                <Icon name="stop" />
              </Button>
              <Button onClick={this._replay}>
                <Icon name="retweet" />
              </Button>
              <Button color="red" onClick={this._showAlert}>
                <Icon name="trash alternate outline" />
              </Button>
            </Button.Group>
          </BodyWrap>
        </StyledSegment>
      </div>
    );
  }
}

const StyledSegment = styled(Segment)`
  cursor: grab;
  display: flex;
  width: fit-content;
  margin: 0 !important;
  min-height: 100px;
`;

const BodyWrap = styled.div`
  max-width: 192px;
`;

const InfoBoxWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-right: 15px;
  width: 51px;

  > i {
    display: flex !important;
    justify-content: center;
    align-items: center;
    font-size: 40px !important;
  }
`;

const StyledHeader = styled(Header)`
  white-space: nowrap;
  overflow: hidden;
  width: 100%;
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
    connectDragSource: connect.dragSource()
  })
)(Song);
