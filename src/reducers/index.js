import { combineReducers } from 'redux';
import objectAssign from 'object-assign';
import uniqWith from 'lodash.uniqwith';

import * as actions from '../actions/actionTypes';
import initialState from './initialState';
import {sortTracks} from '../logic/logic';

function userData(state = {}, action) {
  switch (action.type) {

    case actions.RECEIVE_INITIAL_DATA:
      return objectAssign({}, state, {
        tracks: action.tracks
      });

    case actions.RECEIVE_USER_DATA:

      let userTracks = action.tracks.filter(track => track.origin != null)
        .map(track => track.origin)
        .filter(track => track.kind == 'track')
        .filter(track => track.playback_count != null || track.playback_count != undefined)
        .filter(track => track.likes_count != null || track.likes_count != undefined);
      let uniqueUserTracks = sortTracks(action.path, uniqWith(userTracks, (a, b) => a.id === b.id ));

      return objectAssign({}, state, {
        tracks: uniqueUserTracks,
        future_href: action.future_href,
        next_href: action.next_href
      });

    case actions.RECEIVE_MORE_DATA:

      let tracks = state.tracks.concat(action.tracks.filter(track => track.origin != null)
        .map(track => track.origin)
        .filter(track => track.kind == 'track')
        .filter(track => track.playback_count != null || track.playback_count != undefined)
        .filter(track => track.likes_count != null || track.likes_count != undefined));
      let uniqueTracks = sortTracks(action.path, uniqWith(tracks, (a, b) => a.id === b.id ));

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

function playerState(state = {}, action) {
  switch (action.type) {

    case actions.STREAM_TRACK:
      return objectAssign({}, state, {
        track_data: action.trackData,
        is_streaming: action.is_streaming
      })

    case actions.PLAY_TRACK:
      return objectAssign({}, state, {
        is_playing: action.is_playing,
        track_id: action.track_id
      });

    case actions.RESUME_TRACK:
      return objectAssign({}, state, {
        is_playing: action.is_playing
      });

    case actions.PAUSE_TRACK:
      return objectAssign({}, state, {
        is_playing: action.is_playing
      });

    case actions.UPDATE_TRACK_POSITION:
      return objectAssign({}, state, {
        track_position: action.track_position
      });

    default:
      return state
  }
}

const rootReducer = combineReducers({
  userData,
  appState,
  playerState
});

export default rootReducer;
