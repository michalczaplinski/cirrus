import React, {PropTypes, Component} from 'react';
import SC from 'soundcloud';

class Player extends Component {

  constructor(props) {
    super(props);
    this.state = {player: {}, track_data: {}}
    this.startStreaming = this.startStreaming.bind(this);
    this.playButton = this.playButton.bind(this);
    this.pause = this.pause.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let current = this.props.playerState.is_streaming;
    let next = nextProps.playerState.is_streaming;

    if (current != next && next == true) {
      this.startStreaming(nextProps.playerState.track_data);
    }
  }

  startStreaming(trackData) {
    return SC.stream(`/tracks/${trackData.id}`).then(p => {
      p.play();
      this.props.playTrack(trackData.id);
      this.setState({ player: p })
    });
  }

  playButton() {
    let icon = this.props.playerState.is_streaming ? 'fa fa-pause' : 'fa fa-play'
    return <i className={icon}></i>
  }

  pause() {
    this.state.player.pause();
    this.actions.pauseTrack();
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
      <a className="player--item" onClick={this.pause}>
        {this.playButton()}
      </a>
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
