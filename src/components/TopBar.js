import React, { Component, PropTypes } from 'react';

const TopBar = ({isConnected, scConnect, scDisconnect}) => {

  let logoStyle = {maxHeight: 50};

  let connectButtonPath = isConnected ? '../media/btn-disconnect.png' : '../media/btn-connect.png';
  let scButtonAction =  isConnected ? scDisconnect : scConnect;

  return (
    <header className="header">
      <div className="container">
        <div className="header-left">
          <a className="header-item" href="#">
            <img src="../media/musicumulus-logo.svg" alt="Logo" height="60" width="60" style={logoStyle}></img>
          </a>
          <a className="header-tab" href="#">
            Hot
          </a>
          <a className="header-tab is-active" href="#">
            Best
          </a>
        </div>

        <span className="header-toggle">
          <span></span>
          <span></span>
          <span></span>
        </span>

        <div className="header-right header-menu">
          <span className="header-item">
            <a href="#">
              <img src={connectButtonPath} onClick={scButtonAction} alt=""/>
            </a>
          </span>
        </div>
      </div>
    </header>
  );
};
export default TopBar;
