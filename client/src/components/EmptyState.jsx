import React from 'react';
import { PackageOpen, Plus, RotateCcw } from 'lucide-react';

const EmptyState = ({ isFiltered = false, onOpenCreate, onResetFilters }) => {
  return (
    <div className="empty-state" id="empty-state-view">
      <div className="empty-icon">
        <PackageOpen size={32} />
      </div>

      <h3 className="empty-title">
        {isFiltered ? 'No matching items found' : 'No items found'}
      </h3>

      <p className="empty-description">
        {isFiltered
          ? 'No products or tasks match your current search criteria or active filters. Try adjusting your filters or resetting them.'
          : 'Create your first product or task to get started with your management hub.'}
      </p>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem' }}>
        {isFiltered && onResetFilters && (
          <button
            type="button"
            className="btn-secondary"
            onClick={onResetFilters}
            id="empty-reset-btn"
          >
            <RotateCcw size={16} />
            <span>Reset Filters</span>
          </button>
        )}

        <button
          type="button"
          className="btn-primary"
          onClick={onOpenCreate}
          id="empty-create-btn"
        >
          <Plus size={16} />
          <span>Create Item</span>
        </button>
      </div>
    </div>
  );
};

export default EmptyState;
