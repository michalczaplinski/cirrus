import { combineReducers } from 'redux';
import objectAssign from 'object-assign';
import uniqWith from 'lodash.uniqwith';

import * as actions from '../actions/actionTypes';
import initialState from './initialState';
import {bestTrackSort} from '../logic/logic';

function userData(state = {}, action) {
  switch (action.type) {

    case actions.RECEIVE_INITIAL_DATA:
      return objectAssign({}, state, {
        tracks: action.tracks
      });

    case actions.RECEIVE_USER_DATA:

      let userTracks = action.tracks.map(track => track.origin)
        .filter(track => track.kind == 'track')
        .filter(track => track.playback_count != null || track.playback_count != undefined)
        .filter(track => track.likes_count != null || track.likes_count != undefined);
      let uniqueUserTracks = uniqWith(userTracks, (a, b) => a.id === b.id ).sort(bestTrackSort);

      return objectAssign({}, state, {
        tracks: uniqueUserTracks,
        future_href: action.future_href,
        next_href: action.next_href
      });

    case actions.RECEIVE_MORE_DATA:

      let tracks = state.tracks.concat(action.tracks.map(track => track.origin)
        .filter(track => track.kind == 'track')
        .filter(track => track.playback_count != null || track.playback_count != undefined)
        .filter(track => track.likes_count != null || track.likes_count != undefined));
      let uniqueTracks = uniqWith(tracks, (a, b) => a.id === b.id ).sort(bestTrackSort);

      return objectAssign({}, state, {
        tracks: uniqueTracks,
        future_href: action.future_href,
        next_href: action.next_href
      });

    default:
      return state;
  }
}

function appState(state = {}, action) {
  switch (action.type) {

    case actions.REQUEST_DATA:
      return objectAssign({}, state, {
        is_loading: true
      });

    case actions.RECEIVE_INITIAL_DATA:
    case actions.RECEIVE_USER_DATA:
    case actions.RECEIVE_MORE_DATA:
      return objectAssign({}, state, { is_loading: false });

    case actions.RECEIVE_CONNECTION:
      return objectAssign({}, state, {
        is_connected: action.is_connected,
        oauth_token: action.oauth_token
      });
    case actions.REMOVE_CONNECTION:
      return objectAssign({}, state, {
        is_connected: action.is_connected,
        oauth_token: undefined
      });

    default:
      return state;
  }
}

const rootReducer = combineReducers({
  userData,
  appState
});

export default rootReducer;
