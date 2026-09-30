import React from 'react';
import StatsCards from '../components/StatsCards';
import SearchFilterBar from '../components/SearchFilterBar';
import ItemList from '../components/ItemList';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';

const Dashboard = ({
  items,
  statsItems,
  loading,
  error,
  search,
  onSearchChange,
  typeFilter,
  onTypeChange,
  statusFilter,
  onStatusChange,
  priorityFilter,
  onPriorityChange,
  onResetFilters,
  onOpenCreate,
  onEditItem,
  onDeleteItem,
  deletingId,
  onRetry
}) => {
  const isFiltered = Boolean(search || typeFilter !== 'All' || statusFilter !== 'All' || priorityFilter !== 'All');

  return (
    <div className="dashboard-page">
      {/* Dynamic Statistics Cards */}
      <StatsCards items={statsItems.length > 0 ? statsItems : items} />

      {/* Search, Filter controls, and Create Item CTA */}
      <SearchFilterBar
        search={search}
        onSearchChange={onSearchChange}
        typeFilter={typeFilter}
        onTypeChange={onTypeChange}
        statusFilter={statusFilter}
        onStatusChange={onStatusChange}
        priorityFilter={priorityFilter}
        onPriorityChange={onPriorityChange}
        onResetFilters={onResetFilters}
        onOpenCreateModal={onOpenCreate}
      />

      {/* Backend connection or query error message */}
      {error && !loading && (
        <ErrorMessage message={error} onRetry={onRetry} />
      )}

      {/* Loading feedback */}
      {loading && (
        <LoadingSpinner message="Fetching items from MongoDB..." />
      )}

      {/* Loaded items or empty state */}
      {!loading && !error && (
        <>
          {items.length > 0 ? (
            <ItemList
              items={items}
              onEdit={onEditItem}
              onDelete={onDeleteItem}
              deletingId={deletingId}
            />
          ) : (
            <EmptyState
              isFiltered={isFiltered}
              onOpenCreate={onOpenCreate}
              onResetFilters={onResetFilters}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
