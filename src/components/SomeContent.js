import React, {PropTypes} from 'react';

const SomeContent = ({ trackData }) => {

  var image = trackData.artwork_url || 'http://placehold.it/64x64';

  var title = trackData.title;
  title.length > 23 ? title = title.slice(0, 23) + '...' : title;

  var username = trackData.user.username;
  username.length > 15 ? username = username.slice(0, 23) + '...' : username;

  return (
      <div className="card" style={{display: 'inline-block'}}>
        <div className="card-content">
          <div className="media">
            <div className="media-left">
              <figure className="image is-32x32">
                <img src={image} alt="Image"></img>
              </figure>
            </div>
            <div className="media-content">
              <p className="title is-5">{username}</p>
              <p className="subtitle is-6">{title}</p>
            </div>
          </div>

          <div className="content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Phasellus nec iaculis mauris. <a href="#">@bulmaio</a>.
            <a href="#">#css</a> <a href="#">#responsive</a>
            <br/>
              <small>11:09 PM - 1 Jan 2016</small>
          </div>
        </div>
      </div>
  );
};

export default SomeContent


