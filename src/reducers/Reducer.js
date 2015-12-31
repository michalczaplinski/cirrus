import { CHANGE_READY } from '../constants/actionTypes';
import objectAssign from 'object-assign';
import initialState from './initialState';

export default function ReadyState(state = initialState, action) {
	switch (action.type) {
		case CHANGE_READY:
      // For this example, just simulating a save by changing date modified.
      // In a real app using Redux, you might use redux-thunk and handle the async call in fuelSavingsActions.js
      let opposite = !state.ready;
			return objectAssign({}, state, { ready: opposite } );

		default:
			return state;
	}
}
