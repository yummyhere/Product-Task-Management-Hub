import React from 'react';
import { AlertOctagon, RefreshCw } from 'lucide-react';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="error-banner" role="alert" id="error-message-banner">
      <div className="error-content">
        <AlertOctagon size={28} className="error-icon" />
        <div>
          <h4 className="error-title">Unable to complete request</h4>
          <p className="error-desc">
            {message || 'Unable to connect to the backend server. Please check your connection and ensure the server is running.'}
          </p>
        </div>
      </div>

      {onRetry && (
        <button
          type="button"
          className="btn-secondary"
          onClick={onRetry}
          id="btn-retry-request"
        >
          <RefreshCw size={15} />
          <span>Try Again</span>
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
