import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import isEmpty from 'lodash.isempty';
import Waypoint from 'react-waypoint';
import SC from 'soundcloud';

import * as actions from '../actions/actions';
import Track from '../components/Track';
import TopBar from '../components/TopBar';
import Spinner from '../components/Spinner';

class MainPage extends Component {

  componentDidMount() {
    // todo move the "isConnected" flag inside the store
    if (!this.props.appState.is_connected) {
      this.props.actions.fetchInitialData();
    } else {
      this.props.actions.fetchUserData();
    }
  }

  componentWillReceiveProps(nextProps) {
    let current = this.props.appState.is_connected;
    let next = nextProps.appState.is_connected;

    // if the component loses the connection, fetch the initial data again.
    if (current != next && next == false) {
      this.props.actions.fetchInitialData();
    }
  }

  makeContent() {
    let data = this.props.userData.tracks || [];
    return (
      <div>
        <div className="my-container">
          {data.map(track => <Track trackData={track}/>)}
        </div>
      </div>
    )
  }

  renderLoading() {
    if (this.props.appState.is_loading) {
      return <Spinner/>;
    } else if (this.props.appState.is_connected) {
      return <Waypoint onEnter={this.props.actions.fetchMoreData}/>;
    } else {
      return '';
    }
  }

  render() {
    return (
      <div>
        <TopBar isConnected={this.props.appState.is_connected}
                scConnect={this.props.actions.scConnect}
                scDisconnect={this.props.actions.scDisconnect}/>
        {this.makeContent()}
        {this.renderLoading()}
      </div>
    );
  }
}

MainPage.propTypes = {
  userData: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const { userData, appState } = state;
  return {
    userData,
    appState
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPage);
