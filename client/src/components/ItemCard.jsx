import React from 'react';
import { Edit2, Trash2, Calendar, DollarSign, Tag, CheckCircle2 } from 'lucide-react';
import { formatDate, formatPrice, getStatusBadgeStyle, getPriorityBadgeStyle } from '../utils/formatters';

const ItemCard = ({ item, onEdit, onDelete, isDeleting }) => {
  const isProduct = item.type === 'Product';
  const formattedPrice = formatPrice(item.price);

  return (
    <article className="item-card" id={`item-card-${item._id}`}>
      <div>
        <div className="card-top">
          <span className={`type-pill ${isProduct ? 'product' : 'task'}`}>
            <Tag size={12} />
            {item.type}
          </span>

          <span className={`priority-badge ${getPriorityBadgeStyle(item.priority)}`}>
            {item.priority} Priority
          </span>
        </div>

        <h3 className="card-title">{item.name}</h3>
        <p className="card-description" title={item.description}>
          {item.description}
        </p>

        <div className="card-meta-row">
          <span className={`badge ${getStatusBadgeStyle(item.status)}`}>
            <CheckCircle2 size={12} />
            {item.status}
          </span>

          {isProduct && formattedPrice && (
            <span className="price-tag" title="Product Price">
              {formattedPrice}
            </span>
          )}
        </div>
      </div>

      <div className="card-footer">
        <div className="card-date" title={`Created: ${formatDate(item.createdAt)}`}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
            <Calendar size={13} />
            {formatDate(item.createdAt)}
          </span>
        </div>

        <div className="card-actions">
          <button
            type="button"
            className="btn-icon edit"
            onClick={() => onEdit(item)}
            title="Edit item"
            id={`btn-edit-${item._id}`}
          >
            <Edit2 size={15} />
          </button>

          <button
            type="button"
            className="btn-icon delete"
            onClick={() => onDelete(item)}
            disabled={isDeleting}
            title="Delete item"
            id={`btn-delete-${item._id}`}
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>
    </article>
  );
};

export default ItemCard;
