import React from 'react';

import './Summary.css';

const Summary = props => {
  return (
    <div className="summary">
      <h1>{props.name}</h1>
      <p>
        Website: <span className="summary__output">{props.website}</span>
      </p>
      <p>
        Email: <span className="summary__output">{props.email}</span>
      </p>
      
    </div>
  );
};

export default Summary;
