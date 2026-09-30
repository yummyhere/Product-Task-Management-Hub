import React from 'react';
import { Package, CheckSquare, Clock, Box } from 'lucide-react';

const StatsCards = ({ items = [] }) => {
  const totalCount = items.length;
  const productsCount = items.filter(item => item.type === 'Product').length;
  const tasksCount = items.filter(item => item.type === 'Task').length;
  const activeTasksCount = items.filter(
    item => item.type === 'Task' && (item.status === 'Pending' || item.status === 'In Progress')
  ).length;

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-icon total">
          <Box size={24} />
        </div>
        <div className="stat-info">
          <span className="stat-label">Total Items</span>
          <span className="stat-value">{totalCount}</span>
          <span className="stat-subtext">All database records</span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon products">
          <Package size={24} />
        </div>
        <div className="stat-info">
          <span className="stat-label">Products</span>
          <span className="stat-value">{productsCount}</span>
          <span className="stat-subtext">Catalog inventory</span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon tasks">
          <CheckSquare size={24} />
        </div>
        <div className="stat-info">
          <span className="stat-label">Tasks</span>
          <span className="stat-value">{tasksCount}</span>
          <span className="stat-subtext">Project workflow items</span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon active">
          <Clock size={24} />
        </div>
        <div className="stat-info">
          <span className="stat-label">Active Tasks</span>
          <span className="stat-value">{activeTasksCount}</span>
          <span className="stat-subtext">Pending &amp; In Progress</span>
        </div>
      </div>
    </div>
  );
};

export default StatsCards;
