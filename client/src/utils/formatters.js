export const VALID_TYPES = ['Product', 'Task'];
export const PRODUCT_STATUSES = ['Available', 'Out of Stock', 'Discontinued'];
export const TASK_STATUSES = ['Pending', 'In Progress', 'Completed'];
export const PRIORITIES = ['Low', 'Medium', 'High'];

/**
 * Format ISO date string into readable user-friendly format
 */
export const formatDate = (dateString) => {
  if (!dateString) return '—';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

/**
 * Format currency price
 */
export const formatPrice = (price) => {
  if (price === null || price === undefined || price === '') return null;
  const num = Number(price);
  if (isNaN(num)) return null;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(num);
};

/**
 * Helper to get CSS color classes for status badges
 */
export const getStatusBadgeStyle = (status) => {
  switch (status) {
    case 'Available':
      return 'badge-success';
    case 'Out of Stock':
      return 'badge-warning';
    case 'Discontinued':
      return 'badge-neutral';
    case 'Completed':
      return 'badge-success';
    case 'In Progress':
      return 'badge-primary';
    case 'Pending':
      return 'badge-warning';
    default:
      return 'badge-neutral';
  }
};

/**
 * Helper to get CSS color classes for priority badges
 */
export const getPriorityBadgeStyle = (priority) => {
  switch (priority) {
    case 'High':
      return 'priority-high';
    case 'Medium':
      return 'priority-medium';
    case 'Low':
      return 'priority-low';
    default:
      return '';
  }
};
