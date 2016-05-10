import * as types from './actionTypes';
import SC from 'soundcloud';
import URI from 'urijs';


export function requestedData() {
  return {
    type: types.REQUESTED_DATA,
    is_loading: true
  };
}

export function receiveInitialData(json) {
  return {
    type: types.RECEIVE_INITIAL_DATA,
    tracks: json,
    is_loading: false,
    receivedAt: Date.now()
  };
}

export function receiveUserData(json) {
  return {
    type: types.RECEIVE_USER_DATA,
    tracks: json.collection,
    future_href: json.future_href,
    next_href: json.next_href,
    is_loading: false,
    received_at: Date.now()
  };
}

export function fetchInitialData() {
  return (dispatch, getState) => {

    dispatch(requestedData());

    SC.get('/tracks', {'limit': 20})
      .then(json => dispatch(receiveInitialData(json)));
    // todo add error handling

  };
}

export function fetchUserData() {
  return (dispatch, getState) => {

    dispatch(requestedData());

    SC.get('/me/activities/tracks', {limit: 50})
      .then(json => dispatch(receiveUserData(json)));
    //todo add error handling
  };
}

export function scConnect() {
  return (dispatch, getState) =>  {

    let connection = SC.connect();

    return connection.then(data => {
      dispatch({
        type: types.RECEIVE_CONNECTION,
        oauth_token: data.oauth_token,
        is_connected: true,
        // todo move the localStoreage payloads into their own actions
        itemsToStore: ['oauth_token', 'is_connected']});
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

export function fetchMoreData() {
  return (dispatch, getState) => {

    let cursor = getState().userData.next_href.split('cursor=')[1];

    dispatch(requestedData());

    SC.get('/me/activities/tracks', {limit: 50, cursor: cursor})
      .then(json => dispatch(receiveMoreData(json)));
      //todo: add error handling here
  }
}

export function receiveMoreData(json) {
  return {
    type: types.RECEIVE_MORE_DATA,
    tracks: json.collection,
    future_href: json.future_href,
    next_href: json.next_href,
    is_loading: false,
    received_at: Date.now()
  }
}
