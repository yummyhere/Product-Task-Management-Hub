import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

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
          <CheckCircle2 size={18} style={{ flexShrink: 0 }} />
        ) : (
          <AlertCircle size={18} style={{ flexShrink: 0 }} />
        )}
        <span>{message}</span>
        <button
          type="button"
          className="toast-close"
          onClick={onClose}
          aria-label="Dismiss notification"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default Toast;
