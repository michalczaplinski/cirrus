import React, {PropTypes, Component} from 'react';
import SC from 'soundcloud';

class Player extends Component {

  constructor(props) {
    super(props);
    this.startStreaming = this.startStreaming.bind(this);
    this.pause = this.pause.bind(this);
    this.resume = this.resume.bind(this);
    this.PlayButton = this.PlayButton.bind(this);
    this.player = {};
  }

  componentWillReceiveProps(nextProps) {
    let current = this.props.playerState.track_data;
    let next = nextProps.playerState.track_data;

    if (current != next) {
      this.startStreaming(nextProps.playerState.track_data);
    }
  }

  startStreaming(trackData) {
    SC.stream(`/tracks/${trackData.id}`).then(SCplayer => {
      this.player = SCplayer;
      SCplayer.play();
      this.props.playTrack(trackData.id);
    })
  }

  pause() {
    this.player.pause();
    this.props.pauseTrack();
  }

  resume() {
    this.player.play();
    this.props.resumeTrack();
  }

  PlayButton() {
    let handleClick = this.props.playerState.is_playing ? this.pause : this.resume;
    let icon = this.props.playerState.is_playing ? 'fa fa-pause' : 'fa fa-play';
    return  <a className="player--item" onClick={handleClick}>
              <i className={icon}></i>
            </a>
  }

  render() {
    return (
    <div className="player">
      <a className="player--item">
        <img src={ this.props.playerState.track_data.artwork_url ||
                   'http://placehold.it/64x64'} alt="Track Image" height="40" width="40"/>
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
