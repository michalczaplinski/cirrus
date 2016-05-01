import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/actions';
import SomeContent from '../components/SomeContent';

class MainPage extends Component {

  componentDidMount() {
    this.props.actions.fetchPosts();
  }

  render() {
    var loader = '';
    if (this.props.initialData.is_loading) {
      loader = 'LOADING DATA';
    }

    return (
      <div> {loader}
        <SomeContent
          initialData={this.props.initialData}
        />
      </div>
    );
  }
}

MainPage.propTypes = {
  initialData: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const { initialData } = state;
  return {
    initialData: initialData
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
