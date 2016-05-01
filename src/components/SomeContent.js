import React, {PropTypes} from 'react';

const SomeContent = ({ ready, initialData }) => {

  return (
    <div>
      {JSON.stringify(initialData)}
    </div>
  );
};

export default SomeContent


