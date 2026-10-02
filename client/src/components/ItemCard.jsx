import React from 'react';
import { Edit2, Trash2, ImageOff } from 'lucide-react';
import { formatDate, formatPrice, getStatusBadgeStyle, getPriorityBadgeStyle } from '../utils/formatters';

const ItemCard = ({ item, onEdit, onDelete, isDeleting }) => {
  const isProduct = item.type === 'Product';
  const formattedPrice = formatPrice(item.price);

  return (
    <article className="item-card" id={`item-card-${item._id}`}>
      {/* Product Image */}
      {isProduct && (
        <div className="card-image-wrapper">
          {item.image ? (
            <img 
              src={item.image} 
              alt={item.name} 
              className="card-image"
              loading="lazy"
              decoding="async"
              width="400"
              height="200"
            />
          ) : (
            <div className="card-image-placeholder">
              <ImageOff size={20} />
            </div>
          )}
        </div>
      )}

      <div className="card-body">
        <div className="card-top">
          <span className={`type-pill ${isProduct ? 'product' : 'task'}`}>
            {item.type}
          </span>

          <span className={`priority-badge ${getPriorityBadgeStyle(item.priority)}`}>
            {item.priority}
          </span>
        </div>

        <h3 className="card-title">{item.name}</h3>
        <p className="card-description" title={item.description}>
          {item.description}
        </p>

        <div className="card-meta-row">
          <span className={`badge ${getStatusBadgeStyle(item.status)}`}>
            {item.status}
          </span>

          {isProduct && formattedPrice && (
            <span className="price-tag" title="Price">
              {formattedPrice}
            </span>
          )}
        </div>
      </div>

      <div className="card-footer">
        <span className="card-date">
          {formatDate(item.createdAt)}
        </span>

        <div className="card-actions">
          <button
            type="button"
            className="btn-icon edit"
            onClick={() => onEdit(item)}
            title="Edit item"
            id={`btn-edit-${item._id}`}
          >
            <Edit2 size={14} />
          </button>

          <button
            type="button"
            className="btn-icon delete"
            onClick={() => onDelete(item)}
            disabled={isDeleting}
            title="Delete item"
            id={`btn-delete-${item._id}`}
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </article>
  );
};

export default ItemCard;
