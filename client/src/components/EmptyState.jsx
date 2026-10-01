import React from 'react';
import { Inbox, Plus } from 'lucide-react';

const EmptyState = ({ isFiltered = false, onOpenCreate, onResetFilters }) => {
  return (
    <div className="empty-state" id="empty-state-view">
      <div className="empty-icon">
        <Inbox size={24} />
      </div>

      <h3 className="empty-title">
        {isFiltered ? 'No matching items' : 'No items yet'}
      </h3>

      <p className="empty-description">
        {isFiltered
          ? 'No items match your active search or filter criteria. Try clearing filters or searching for something else.'
          : 'Get started by creating your first product or task.'}
      </p>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.65rem' }}>
        {isFiltered && onResetFilters && (
          <button
            type="button"
            className="btn-secondary"
            onClick={onResetFilters}
            id="empty-reset-btn"
          >
            Clear filters
          </button>
        )}

        <button
          type="button"
          className="btn-primary"
          onClick={onOpenCreate}
          id="empty-create-btn"
        >
          <Plus size={15} />
          <span>New Item</span>
        </button>
      </div>
    </div>
  );
};

export default EmptyState;
