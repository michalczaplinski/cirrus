import * as types from './actionTypes';
import SC from 'soundcloud';

export function requestInitialData() {
  return {
    type: types.REQUEST_INITIAL_DATA,
    is_loading: true
  };
}

export function receiveInitialData(json) {
  return {
    type: types.RECEIVE_INITIAL_DATA,
    tracks: json,
    is_loading: false
    //receivedAt: Date.now()
  };
}

export function fetchPosts(reddit) {
  return (dispatch, getState) => {

    dispatch(requestInitialData());

    SC.initialize({
      client_id: getState().constants.client_id,
      redirect_uri: getState().constants.redirect_uri
    });

    //var connection = SC.connect();

    return SC.get('/tracks', {'limit': 10})
      .then(json => dispatch(receiveInitialData(json)))
  }
}
