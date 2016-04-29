import React, {PropTypes} from 'react';

const TopBar = ({ appState, readyChangeSwitch }) => {
  return (
    <div>
      <p> Hello, Michal !</p>
      <p>The app state is {appState.ready}</p>
      <button onClick={readyChangeSwitch}>change button</button>
    </div>
  );
};

export default TopBar


