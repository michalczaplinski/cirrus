import React, { Component, PropTypes } from 'react';
import { IndexLink, Link } from 'react-router'

const TopBar = ({isConnected, scConnect, scDisconnect}) => {

  let logoStyle = {maxHeight: 50};

  let connectButtonPath = isConnected ? '../media/btn-disconnect.png' : '../media/btn-connect.png';
  let scButtonAction =  isConnected ? scDisconnect : scConnect;

  return (
    <header className="header">
      <div className="container">
        <div className="header-left">
          <IndexLink to="/" className="header-item" >
            <img src="../media/musicumulus-logo.svg" alt="Logo" height="60" width="60" style={logoStyle}></img>
          </IndexLink>
          <Link to="/hot" activeClassName="is-active" className="header-tab">
            Hot
          </Link>
          <Link to="/top" activeClassName="is-active" className="header-tab">
            Top
          </Link>
          <Link to="/recent" activeClassName="is-active" className="header-tab">
            Recent
          </Link>
        </div>

        <span className="header-toggle">
          <span></span>
          <span></span>
          <span></span>
        </span>

        <div className="header-right header-menu">
          <span className="header-item">
            <Link to="/hot">
              {/* TODO: need  */}
              <img src={connectButtonPath} onClick={scButtonAction} alt=""/>
            </Link>
          </span>
        </div>
      </div>
    </header>
  );
};
export default TopBar;
