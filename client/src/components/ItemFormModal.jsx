import React, { useState, useEffect, useRef } from 'react';
import { X, AlertCircle, ImagePlus, Trash2 } from 'lucide-react';
import {
  VALID_TYPES,
  PRODUCT_STATUSES,
  TASK_STATUSES,
  PRIORITIES
} from '../utils/formatters';

const ItemFormModal = ({ isOpen, onClose, onSubmit, initialItem = null, isSubmitting = false }) => {
  const isEditMode = Boolean(initialItem);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'Product',
    status: 'Available',
    priority: 'Medium',
    price: ''
  });

  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const [imageData, setImageData] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (initialItem) {
      setFormData({
        name: initialItem.name || '',
        description: initialItem.description || '',
        type: initialItem.type || 'Product',
        status: initialItem.status || (initialItem.type === 'Task' ? 'Pending' : 'Available'),
        priority: initialItem.priority || 'Medium',
        price: initialItem.price !== null && initialItem.price !== undefined ? initialItem.price : ''
      });
      setImagePreview(initialItem.image || null);
      setImageData(initialItem.image || null);
    } else {
      setFormData({
        name: '',
        description: '',
        type: 'Product',
        status: 'Available',
        priority: 'Medium',
        price: ''
      });
      setImagePreview(null);
      setImageData(null);
    }
    setErrors({});
  }, [initialItem, isOpen]);

  if (!isOpen) return null;

  const handleTypeChange = (newType) => {
    let newStatus = formData.status;
    if (newType === 'Product') {
      if (!PRODUCT_STATUSES.includes(newStatus)) {
        newStatus = 'Available';
      }
    } else {
      if (!TASK_STATUSES.includes(newStatus)) {
        newStatus = 'Pending';
      }
      // Clear image when switching to Task
      setImagePreview(null);
      setImageData(null);
    }

    setFormData((prev) => ({
      ...prev,
      type: newType,
      status: newStatus
    }));

    if (errors.type) {
      setErrors((prev) => ({ ...prev, type: null }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrors((prev) => ({ ...prev, image: 'Please select a valid image file' }));
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, image: 'Image must be smaller than 5MB' }));
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setImageData(reader.result);
      setErrors((prev) => ({ ...prev, image: null }));
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setImageData(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name cannot be empty';
    } else if (formData.name.trim().length > 120) {
      newErrors.name = 'Name cannot exceed 120 characters';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description cannot be empty';
    } else if (formData.description.trim().length > 2000) {
      newErrors.description = 'Description cannot exceed 2000 characters';
    }

    if (!formData.type) {
      newErrors.type = 'Type must be selected';
    }

    if (!formData.status) {
      newErrors.status = 'Status must be selected';
    } else {
      if (formData.type === 'Product' && !PRODUCT_STATUSES.includes(formData.status)) {
        newErrors.status = `Status must be one of: ${PRODUCT_STATUSES.join(', ')}`;
      }
      if (formData.type === 'Task' && !TASK_STATUSES.includes(formData.status)) {
        newErrors.status = `Status must be one of: ${TASK_STATUSES.join(', ')}`;
      }
    }

    if (!formData.priority) {
      newErrors.priority = 'Priority must be selected';
    }

    if (formData.price !== '' && formData.price !== null && formData.price !== undefined) {
      const num = Number(formData.price);
      if (isNaN(num)) {
        newErrors.price = 'Price must be a valid number';
      } else if (num < 0) {
        newErrors.price = 'Price cannot be negative';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      name: formData.name.trim(),
      description: formData.description.trim(),
      type: formData.type,
      status: formData.status,
      priority: formData.priority,
      price: formData.price !== '' ? Number(formData.price) : null,
      image: formData.type === 'Product' ? (imageData || null) : null
    };

    onSubmit(payload);
  };

  const availableStatuses = formData.type === 'Product' ? PRODUCT_STATUSES : TASK_STATUSES;

  return (
    <div className="modal-overlay" onClick={onClose} id="item-form-modal-overlay">
      <div 
        className="modal-dialog" 
        onClick={(e) => e.stopPropagation()} 
        role="dialog" 
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="modal-header">
          <h2 className="modal-title" id="modal-title">
            {isEditMode ? 'Edit Item' : 'New Item'}
          </h2>
          <button 
            type="button" 
            className="modal-close" 
            onClick={onClose}
            aria-label="Close dialog"
            id="btn-close-modal"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="modal-body">
            {/* Name */}
            <div className="form-group">
              <label htmlFor="field-name" className="form-label">
                Name <span className="required">*</span>
              </label>
              <input
                id="field-name"
                name="name"
                type="text"
                className={`form-input ${errors.name ? 'has-error' : ''}`}
                placeholder="Item name"
                value={formData.name}
                onChange={handleChange}
                autoFocus
              />
              {errors.name && (
                <div className="form-error" id="error-name">
                  <AlertCircle size={13} />
                  <span>{errors.name}</span>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="form-group">
              <label htmlFor="field-description" className="form-label">
                Description <span className="required">*</span>
              </label>
              <textarea
                id="field-description"
                name="description"
                rows="3"
                className={`form-textarea ${errors.description ? 'has-error' : ''}`}
                placeholder="Detailed description..."
                value={formData.description}
                onChange={handleChange}
              />
              {errors.description && (
                <div className="form-error" id="error-description">
                  <AlertCircle size={13} />
                  <span>{errors.description}</span>
                </div>
              )}
            </div>

            {/* Type & Priority Row */}
            <div className="form-row-2">
              <div className="form-group">
                <label htmlFor="field-type" className="form-label">
                  Type <span className="required">*</span>
                </label>
                <select
                  id="field-type"
                  name="type"
                  className={`form-select ${errors.type ? 'has-error' : ''}`}
                  value={formData.type}
                  onChange={(e) => handleTypeChange(e.target.value)}
                >
                  {VALID_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                {errors.type && (
                  <div className="form-error" id="error-type">
                    <AlertCircle size={13} />
                    <span>{errors.type}</span>
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="field-priority" className="form-label">
                  Priority <span className="required">*</span>
                </label>
                <select
                  id="field-priority"
                  name="priority"
                  className={`form-select ${errors.priority ? 'has-error' : ''}`}
                  value={formData.priority}
                  onChange={handleChange}
                >
                  {PRIORITIES.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
                {errors.priority && (
                  <div className="form-error" id="error-priority">
                    <AlertCircle size={13} />
                    <span>{errors.priority}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Image Upload - Products only */}
            {formData.type === 'Product' && (
              <div className="form-group">
                <label className="form-label">Product Image <span className="optional">(Optional)</span></label>
                {imagePreview ? (
                  <div className="image-preview-wrapper">
                    <img src={imagePreview} alt="Product preview" className="image-preview" />
                    <button
                      type="button"
                      className="image-remove-btn"
                      onClick={handleRemoveImage}
                      title="Remove image"
                    >
                      <Trash2 size={13} /> Remove
                    </button>
                  </div>
                ) : (
                  <div
                    className="image-upload-area"
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      const file = e.dataTransfer.files[0];
                      if (file) handleImageChange({ target: { files: [file] } });
                    }}
                  >
                    <ImagePlus size={24} className="upload-icon" />
                    <span className="upload-text">Click or drag & drop an image</span>
                    <span className="upload-subtext">PNG, JPG, WEBP up to 5MB</span>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                  id="field-image"
                />
                {errors.image && (
                  <div className="form-error" id="error-image">
                    <AlertCircle size={13} />
                    <span>{errors.image}</span>
                  </div>
                )}
              </div>
            )}

            {/* Status & Price Row */}
            <div className="form-row-2">
              <div className="form-group">
                <label htmlFor="field-status" className="form-label">
                  Status <span className="required">*</span>
                </label>
                <select
                  id="field-status"
                  name="status"
                  className={`form-select ${errors.status ? 'has-error' : ''}`}
                  value={formData.status}
                  onChange={handleChange}
                >
                  {availableStatuses.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
                {errors.status && (
                  <div className="form-error" id="error-status">
                    <AlertCircle size={13} />
                    <span>{errors.status}</span>
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="field-price" className="form-label">
                  Price ($) <span className="optional">{formData.type === 'Task' ? '(Optional)' : ''}</span>
                </label>
                <input
                  id="field-price"
                  name="price"
                  type="number"
                  step="0.01"
                  min="0"
                  className={`form-input ${errors.price ? 'has-error' : ''}`}
                  placeholder={formData.type === 'Product' ? '0.00' : 'Optional'}
                  value={formData.price}
                  onChange={handleChange}
                />
                {errors.price && (
                  <div className="form-error" id="error-price">
                    <AlertCircle size={13} />
                    <span>{errors.price}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn-secondary"
              onClick={onClose}
              disabled={isSubmitting}
              id="btn-cancel-modal"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={isSubmitting}
              id="btn-submit-item-form"
            >
              {isSubmitting ? 'Saving...' : (isEditMode ? 'Save changes' : 'Create item')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ItemFormModal;
