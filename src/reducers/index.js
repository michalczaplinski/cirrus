import { combineReducers } from 'redux';
import objectAssign from 'object-assign';

import * as actions from '../actions/actionTypes';
import initialState from './initialState';

function initialData(state = initialState.initial_data, action) {
  switch (action.type) {

    case actions.RECEIVE_INITIAL_DATA:
      return action.tracks;

    default:
      return state;
  }
}

function userData(state = {}, action) {
  switch (action.type) {

    case actions.RECEIVE_USER_DATA:
      return objectAssign({}, state, {
        collection: action.userData,
        future_href: action.future_href,
        next_href: action.next_href
      });

    default:
      return state;
  }
}

function appState(state = {}, action) {
  switch (action.type) {

    case actions.REQUEST_INITIAL_DATA:
    case actions.REQUEST_USER_DATA:
      return objectAssign({}, state, { is_loading: true });

    case actions.RECEIVE_INITIAL_DATA:
    case actions.RECEIVE_USER_DATA:
      return objectAssign({}, state, { is_loading: false });

    case actions.RECEIVE_CONNECTION:
      return objectAssign({}, state, {
        is_connected: true,
        connection: action.connection
      });

    default:
      return state;
  }
}

const rootReducer = combineReducers({
  initialData,
  userData,
  appState
});

export default rootReducer;
