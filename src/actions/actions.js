import * as types from './actionTypes';
import SC from 'soundcloud';

export function requestedData() {
  return {
    type: types.REQUEST_DATA,
    is_loading: true
  };
}

export function fetchInitialData(path) {
  return (dispatch) => {

    dispatch(requestedData());

    SC.get('/tracks', {'limit': 20})
      .then(json => dispatch(receiveInitialData(json)));
    // todo add error handling

  };
}

export function fetchUserData(path) {
  return (dispatch) => {

    dispatch(requestedData());

    SC.get('/me/activities/tracks', {limit: 50})
      .then(json => dispatch(receiveUserData(json.collection)));
    //todo add error handling
  };
}

export function fetchMoreData(path) {
  return (dispatch, getState) => {

    // the SoundCloud API returns the URL to the next datablock
    // since we are using the JS SDK, we just need the cursor attribute from the URL.
    let cursor = getState().userData.next_href.split('cursor=')[1];

    dispatch(requestedData());

    SC.get('/me/activities/tracks', {limit: 50, cursor: cursor})
      .then(json => dispatch(receiveMoreData(json.collection)));
    //todo: add error handling here
  }
}

export function receiveInitialData(json) {
  return (dispatch) => {
    dispatch({
      type: types.RECEIVE_INITIAL_DATA,
      tracks: json,
      is_loading: false,
      receivedAt: Date.now()
    });
  };
}

export function receiveUserData(json) {
  return {
    type: types.RECEIVE_USER_DATA,
    tracks: json,
    future_href: json.future_href,
    next_href: json.next_href,
    is_loading: false,
    received_at: Date.now()
  };
}


export function receiveMoreData(json) {
  return {
    type: types.RECEIVE_MORE_DATA,
    tracks: json,
    future_href: json.future_href,
    next_href: json.next_href,
    is_loading: false,
    received_at: Date.now()
  }
}


export function scConnect() {
  return (dispatch) =>  {

    let connection = SC.connect();

    return connection.then(data => {
      dispatch({
        type: types.RECEIVE_CONNECTION,
        oauth_token: data.oauth_token,
        is_connected: true,
        itemsToStore: ['oauth_token', 'is_connected']});
      // todo move the localStoreage payloads into their own actions
      dispatch(fetchUserData());
    });
    //todo error handling
  };
}

export function scDisconnect() {
  return {
    type: types.REMOVE_CONNECTION,
    is_connected: false,
    // todo move the localStoreage payloads into their own actions
    itemsToRemove: ['oauth_token'],
    itemsToStore: ['is_connected']}
}
