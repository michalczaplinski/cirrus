import React, {PropTypes, Component} from 'react';
import moment from 'moment';
import SC from 'soundcloud';

const Track = ({ trackData,  }) => {

  var image = trackData.artwork_url || trackData.user.avatar_url || 'http://placehold.it/64x64';

  var title = trackData.title;
  title.length > 23 ? title = title.slice(0, 23) + '...' : title;

  var username = trackData.user.username;
  username.length > 15 ? username = username.slice(0, 23) + '...' : username;

  var creationDate = moment(trackData.created_at, 'YYYY/MM/DD hh:mm:ss +0000').fromNow();
  //var trackDate = `${creationDate.getDay()}/${creationDate.getMonth()}/${creationDate.getFullYear()}`;

  const playTrack = () => {
    SC.stream(`/tracks/${trackData.id}`)
      .then(player => {
        player.play();
        return player;
      })
    ;


  };

  return (
    <a className="card" style={{backgroundImage: 'url(' + trackData.waveform_url + ')'}}>
      <div className="card-content">
        <div className="media">

          <div className="media-left">
            <figure className="image is-64x64">
              <img src={image} alt="Image"></img>
            </figure>
          </div>

          <div className="media-content">
            <p className="title is-5">{trackData.user.username}</p>
            <p className="subtitle is-6">{title}</p>
          </div>
        </div>

        <div className="content">
          <span>
            <small>{creationDate}</small>
          </span>
          <span>
            <small>plays: {trackData.playback_count}</small>
          </span>
          <span>
            <small>likes: {trackData.likes_count}</small>
          </span>
        </div>
      </div>
    </a>
  );
};

export default Track


