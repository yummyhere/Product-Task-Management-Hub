import React from 'react';
import ItemCard from './ItemCard';

const ItemList = ({ items, onEdit, onDelete, deletingId }) => {
  return (
    <div className="items-grid" id="items-grid-container">
      {items.map((item) => (
        <ItemCard
          key={item._id}
          item={item}
          onEdit={onEdit}
          onDelete={onDelete}
          isDeleting={deletingId === item._id}
        />
      ))}
    </div>
  );
};

export default ItemList;
