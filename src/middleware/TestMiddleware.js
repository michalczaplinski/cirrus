export default function testMiddleware({ dispatch, getState }) {
  return next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState);
    }
    console.log('action dispatched', JSON.stringify(action));

    return next(action);
  };
}
