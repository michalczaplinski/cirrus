import * as types from '../constants/actionTypes';

export function getData(settings) {
	return { type: types.GET_DATA, settings };
}

export function changeReady(settings) {
	return { type: types.CHANGE_READY, settings };
}
