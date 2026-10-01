import React from 'react';
import { X } from 'lucide-react';

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, item, isDeleting = false }) => {
  if (!isOpen || !item) return null;

  return (
    <div className="modal-overlay" onClick={onClose} id="delete-modal-overlay">
      <div 
        className="modal-dialog" 
        onClick={(e) => e.stopPropagation()} 
        role="alertdialog" 
        aria-modal="true"
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-desc"
      >
        <div className="modal-header">
          <h2 className="modal-title" id="delete-dialog-title">
            Delete item
          </h2>
          <button 
            type="button" 
            className="modal-close" 
            onClick={onClose}
            aria-label="Close dialog"
            id="btn-close-delete-modal"
          >
            <X size={16} />
          </button>
        </div>

        <div className="modal-body" id="delete-dialog-desc">
          <p style={{ fontSize: '0.9375rem', color: 'var(--text-main)', marginBottom: '0.75rem' }}>
            Are you sure you want to delete <strong>{item.name}</strong>?
          </p>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
            This action cannot be undone and will permanently remove this {item.type.toLowerCase()} from the database.
          </p>
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="btn-secondary"
            onClick={onClose}
            disabled={isDeleting}
            id="btn-cancel-delete"
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn-danger"
            onClick={onConfirm}
            disabled={isDeleting}
            id="btn-confirm-delete"
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
