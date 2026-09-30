import React from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';

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
          <h2 className="modal-title" id="delete-dialog-title" style={{ color: '#fb7185' }}>
            <AlertTriangle size={20} />
            Confirm Deletion
          </h2>
          <button 
            type="button" 
            className="modal-close" 
            onClick={onClose}
            aria-label="Close dialog"
            id="btn-close-delete-modal"
          >
            <X size={18} />
          </button>
        </div>

        <div className="modal-body" id="delete-dialog-desc">
          <p style={{ fontSize: '1rem', color: '#f3f4f6', marginBottom: '0.75rem' }}>
            Are you sure you want to delete this item?
          </p>
          
          <div style={{
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '0.85rem 1rem',
            marginBottom: '0.75rem'
          }}>
            <p style={{ fontWeight: 600, color: '#f9fafb' }}>{item.name}</p>
            <p style={{ fontSize: '0.8125rem', color: '#9ca3af', marginTop: '0.2rem' }}>
              Type: {item.type} • Status: {item.status}
            </p>
          </div>

          <p style={{ fontSize: '0.875rem', color: '#fda4af' }}>
            This action cannot be undone.
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
            {isDeleting ? (
              <>
                <span className="spinner" style={{ width: '16px', height: '16px', borderWidth: '2px' }} />
                <span>Deleting...</span>
              </>
            ) : (
              <>
                <Trash2 size={16} />
                <span>Delete</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
