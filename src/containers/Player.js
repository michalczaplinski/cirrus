import React, {PropTypes, Component} from 'react';
import SC from 'soundcloud';

class Player extends Component {

  //TODO: add proptypes

  constructor(props) {
    super(props);
    this.startStreaming = this.startStreaming.bind(this);
    this.pause = this.pause.bind(this);
    this.play = this.play.bind(this);
    this.PlayButton = this.PlayButton.bind(this);
    this.SCPlayer = {};
  }

  componentWillReceiveProps(nextProps) {
    let current = this.props.playerState.track_data;
    let next = nextProps.playerState.track_data;

    if (current != next) {
      this.startStreaming(nextProps.playerState.track_data);
    }
  }

  startStreaming(trackData) {
    SC.stream(`/tracks/${trackData.id}`).then(SCPlayer => {
      this.SCPlayer = SCPlayer;
      this.props.streamTrack(trackData);
      SCPlayer.play();
      this.props.playTrack(trackData.id);
    })
  }

  pause() {
    if (this.props.playerState.is_streaming) {
      this.SCPlayer.pause();
      this.props.pauseTrack();
    }
  }

  play() {
    // in case we have a streaming instance of SC player, just resume current song.
    if (this.props.playerState.is_streaming) {
      this.SCPlayer.play();
      this.props.resumeTrack();

    // otherwise, stream the first song on the list.
    } else {
      this.startStreaming(this.props.tracks[0])
    }
  }

  PlayButton() {
    let handleClick = this.props.playerState.is_playing ? this.pause : this.play;
    let icon = this.props.playerState.is_playing ? 'fa fa-pause' : 'fa fa-play';
    return  <a className="player--item" onClick={handleClick}>
              <i className={icon}></i>
            </a>
  }

  render() {

    let trackData = this.props.playerState.track_data;
    let coverImageUrl = trackData.artwork_url || ((trackData.user != undefined ) ?
                                                   trackData.user.avatar_url :
                                                   'http://placehold.it/64x64');

    return (
      <div className="player">
        <a className="player--item">
          <img src={ coverImageUrl } alt="Track Image" height="40" width="40"/>
        </a>

        <a className="player--item">
          <span>
          { this.props.playerState.track_data.title || '' }
          </span>
        </a>

        <a className="player--item">
          <i className="fa fa-step-backward"></i>
        </a>
        {this.PlayButton()}
        <a className="player--item">
          <i className="fa fa-step-forward"></i>
        </a>
        <span className="player--item--range">
          <input type="range"/>
        </span>
        <a className="player--item">
          <i className="fa fa-volume-up"> </i>
        </a>
      </div>
  )}
}

export default Player;