import React, { Component, PropTypes } from 'react';
import { IndexLink, Link } from 'react-router'

const TopBar = ({isConnected, scConnect, scDisconnect}) => {

  let logoStyle = {maxHeight: 50};

  let connectButtonImagePath = isConnected ? '../media/btn-disconnect.png' : '../media/btn-connect.png';
  let connectButtonAction =  isConnected ? scDisconnect : scConnect;
  let connectButtonLink = isConnected ? '/' : '/hot';

  let tabs =  [
                <Link to="/hot" activeClassName="is-active" className="header-tab" key="hot">
                  Hot
                </Link>,
                <Link to="/top" activeClassName="is-active" className="header-tab" key="top">
                  Top
                </Link>,
                <Link to="/recent" activeClassName="is-active" className="header-tab" key="recent">
                  Recent
                </Link>
              ];

  return (
    <header className="header">
      <div className="container">
        <div className="header-left">
          <IndexLink to="/" className="header-item" >
            <img src="../media/musicumulus-logo.svg" alt="Logo" height="60" width="60" style={logoStyle}></img>
          </IndexLink>
        {isConnected ? tabs : ''}
        </div>

        <span className="header-toggle">
          <span></span>
          <span></span>
          <span></span>
        </span>

        <div className="header-right header-menu">
          <span className="header-item">
            <Link to={connectButtonLink}>
              <img src={connectButtonImagePath} onClick={connectButtonAction} alt=""/>
            </Link>
          </span>
        </div>
      </div>
    </header>
  );
};
export default TopBar;
