import React, {PropTypes} from 'react';

const Track = ({ trackData }) => {

  var image = trackData.artwork_url || trackData.user.avatar_url || 'http://placehold.it/64x64';

  var title = trackData.title;
  title.length > 23 ? title = title.slice(0, 23) + '...' : title;

  var username = trackData.user.username;
  username.length > 15 ? username = username.slice(0, 23) + '...' : username;

  return (
      <div className="card" style={{backgroundImage: 'url(' + trackData.waveform_url + ')'}}>
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
            <button > listen</button>
          </div>

          <div className="content">
            <a href="#">
              <span class="icon is-small">
                <i class="fa fa-heart"></i>{trackData.likes_count}
              </span>
            </a>
              <small>{trackData.created_at}</small>
          </div>
        </div>
      </div>
  );
};

export default Track


