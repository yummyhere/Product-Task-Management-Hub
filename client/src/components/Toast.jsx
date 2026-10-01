import React, { useEffect } from 'react';
import { Check, AlertCircle, X } from 'lucide-react';

const Toast = ({ message, type = 'success', onClose, duration = 4000 }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  return (
    <div className="toast-container" id="toast-notification-container">
      <div className={`toast ${type}`} role="status" aria-live="polite">
        {type === 'success' ? (
          <Check size={16} style={{ flexShrink: 0 }} />
        ) : (
          <AlertCircle size={16} style={{ flexShrink: 0 }} />
        )}
        <span>{message}</span>
        <button
          type="button"
          className="toast-close"
          onClick={onClose}
          aria-label="Dismiss notification"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
};

export default Toast;
