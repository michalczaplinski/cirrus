import { combineReducers } from 'redux';
import * as actions from '../actions/actionTypes';
import objectAssign from 'object-assign';
import initialState from './initialState';

function initialData(state = initialState.initial_data, action) {
  switch (action.type) {

    case actions.REQUEST_INITIAL_DATA:
      return objectAssign({}, state, {
        is_loading: true
      });

    case actions.RECEIVE_INITIAL_DATA:
      return objectAssign({}, state, {
        is_loading: false,
        tracks: action.tracks
      });

    default:
      return state;
  }
}

function constants(state = initialState, action) {
  return {
    client_id: initialState.client_id,
    redirect_uri: initialState.redirect_uri
  }
}


const rootReducer = combineReducers({
  initialData,
  constants
});

export default rootReducer;
