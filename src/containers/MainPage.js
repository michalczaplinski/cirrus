import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import isEmpty from 'lodash.isempty';

import * as actions from '../actions/actions';
import SomeContent from '../components/SomeContent';
import TopBar from '../components/TopBar';

class MainPage extends Component {

  componentDidMount() {
    this.props.actions.fetchInitialData();
  }

  makeContent() {

    let data;
    if (isEmpty(this.props.userData)) {
      data = this.props.initialData.map(trackData => trackData)
    } else {
      data = this.props.userData.collection.map(trackData => trackData.origin)
    }

    return (
      <div className="container">
        <div className="container is-fluid">
          {data.map(track => <SomeContent trackData={track}/>)}
        </div>
      </div>
    )
  }

  render() {

    var output = <div>
      <TopBar scConnect={this.props.actions.scConnect} scDisconnect={this.props.actions.scDisconnect}/>
      {this.makeContent()}
    </div>;

    if (this.props.appState.is_loading) {
      output = <div>LOADING DATA</div>;
    }

    return (
      <div>
        {output}
      </div>
    );
  }
}

MainPage.propTypes = {
  initialData: PropTypes.array.isRequired,
  userData: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const { initialData, userData, appState } = state;
  return {
    initialData,
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
