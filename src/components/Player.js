import React, {PropTypes, Component} from 'react';

const Player = ({trackData}) => {

  return (
    <div className="player">
      <a className="player--item">
        <img src="http://placehold.it/64x64" alt="Track Image" height="40" width="40"/>
      </a>

      <a className="player--item">
        <span>

        </span>
      </a>

      <a className="player--item">
        <i className="fa fa-step-backward"></i>
      </a>
      <a className="player--item">
        <i className="fa fa-play"></i>
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
  );
};

export default Player;
