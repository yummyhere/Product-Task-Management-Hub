import React from 'react';
import { Search, RotateCcw, Filter, Plus } from 'lucide-react';
import { PRODUCT_STATUSES, TASK_STATUSES, PRIORITIES } from '../utils/formatters';

const SearchFilterBar = ({
  search,
  onSearchChange,
  typeFilter,
  onTypeChange,
  statusFilter,
  onStatusChange,
  priorityFilter,
  onPriorityChange,
  onResetFilters,
  onOpenCreateModal
}) => {
  // Determine relevant status options based on type filter
  let availableStatuses = [];
  if (typeFilter === 'Product') {
    availableStatuses = PRODUCT_STATUSES;
  } else if (typeFilter === 'Task') {
    availableStatuses = TASK_STATUSES;
  } else {
    // Combine unique statuses
    availableStatuses = Array.from(new Set([...PRODUCT_STATUSES, ...TASK_STATUSES]));
  }

  const hasActiveFilters = search || typeFilter !== 'All' || statusFilter !== 'All' || priorityFilter !== 'All';

  return (
    <div className="controls-container">
      <div className="controls-header">
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input
            id="search-input"
            type="text"
            className="search-input"
            placeholder="Search products and tasks by name or description..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <button 
          type="button" 
          className="btn-primary" 
          onClick={onOpenCreateModal}
          id="action-create-btn"
        >
          <Plus size={18} />
          <span>Create Item</span>
        </button>
      </div>

      <div className="filters-row">
        <div className="filter-group">
          <label htmlFor="filter-type" className="filter-label">
            Type:
          </label>
          <select
            id="filter-type"
            className="filter-select"
            value={typeFilter}
            onChange={(e) => {
              onTypeChange(e.target.value);
              // Reset status if not valid for new type
              onStatusChange('All');
            }}
          >
            <option value="All">All Types</option>
            <option value="Product">Product</option>
            <option value="Task">Task</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="filter-status" className="filter-label">
            Status:
          </label>
          <select
            id="filter-status"
            className="filter-select"
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value)}
          >
            <option value="All">All Statuses</option>
            {availableStatuses.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="filter-priority" className="filter-label">
            Priority:
          </label>
          <select
            id="filter-priority"
            className="filter-select"
            value={priorityFilter}
            onChange={(e) => onPriorityChange(e.target.value)}
          >
            <option value="All">All Priorities</option>
            {PRIORITIES.map((pr) => (
              <option key={pr} value={pr}>
                {pr}
              </option>
            ))}
          </select>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            className="btn-reset"
            onClick={onResetFilters}
            title="Clear all search and filter conditions"
            id="btn-reset-filters"
          >
            <RotateCcw size={14} />
            <span>Reset Filters</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchFilterBar;
