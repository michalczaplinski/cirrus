import * as types from './actionTypes';
import SC from 'soundcloud';

export function requestInitialData() {
  return {
    type: types.REQUEST_INITIAL_DATA,
    is_loading: true
  };
}

export function requestUserData() {
  return {
    type: types.REQUEST_USER_DATA,
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
    userData: json.collection,
    future_href: json.future_href,
    next_href: json.next_href,
    is_loading: false,
    receivedAt: Date.now()
  };
}

export function fetchInitialData() {
  return (dispatch, getState) => {

    dispatch(requestInitialData());

    SC.get('/tracks', {'limit': 20})
      .then(json => dispatch(receiveInitialData(json)));
    // todo add error handling

  };
}

export function fetchUserData(connection) {
  return (dispatch, getState) => {

    dispatch(requestUserData());

    SC.get('/me/activities/', {limit: 20})
      .then(json => dispatch(receiveUserData(json)));
    //todo add error handling
  };
}

export function scConnect() {
  return (dispatch, getState) =>  {

    let connection = SC.connect();

    return connection.then(data => {
      dispatch({type: types.RECEIVE_CONNECTION, connection: data});
      dispatch(fetchUserData());
    });
    //todo error handling
  };
}
