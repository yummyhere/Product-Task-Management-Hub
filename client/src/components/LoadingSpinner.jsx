import React from 'react';

const LoadingSpinner = ({ message = 'Loading items...' }) => {
  return (
    <div className="spinner-container" id="loading-spinner-state">
      <div className="spinner" />
      <p className="spinner-text">{message}</p>
    </div>
  );
};

export default LoadingSpinner;
