import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/actions';
import TopBar from '../components/TopBar';

class MainPage extends Component {

  render() {
    return (
      <TopBar
        appState={this.props.appState}
        readyChangeSwitch={this.props.actions.changeReady}
      />
    );
  }
}

MainPage.propTypes = {
  appState: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    appState: state.ReadyState
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
