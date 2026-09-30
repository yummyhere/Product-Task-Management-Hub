const mongoose = require('mongoose');

const validProductStatuses = ['Available', 'Out of Stock', 'Discontinued'];
const validTaskStatuses = ['Pending', 'In Progress', 'Completed'];
const validPriorities = ['Low', 'Medium', 'High'];
const validTypes = ['Product', 'Task'];

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [1, 'Name cannot be empty'],
      maxlength: [120, 'Name cannot exceed 120 characters']
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      minlength: [1, 'Description cannot be empty'],
      maxlength: [2000, 'Description cannot exceed 2000 characters']
    },
    type: {
      type: String,
      required: [true, 'Type is required'],
      enum: {
        values: validTypes,
        message: '{VALUE} is not a valid type. Allowed values: Product, Task'
      }
    },
    status: {
      type: String,
      required: [true, 'Status is required'],
      validate: {
        validator: function (value) {
          if (this.type === 'Product') {
            return validProductStatuses.includes(value);
          }
          if (this.type === 'Task') {
            return validTaskStatuses.includes(value);
          }
          // If type not set yet, check if valid for either
          return [...validProductStatuses, ...validTaskStatuses].includes(value);
        },
        message: function (props) {
          const itemType = this.type || 'Item';
          const allowed = itemType === 'Product' 
            ? validProductStatuses.join(', ') 
            : validTaskStatuses.join(', ');
          return `'${props.value}' is not a valid status for type '${itemType}'. Allowed values: ${allowed}`;
        }
      }
    },
    priority: {
      type: String,
      required: [true, 'Priority is required'],
      enum: {
        values: validPriorities,
        message: '{VALUE} is not a valid priority. Allowed values: Low, Medium, High'
      }
    },
    price: {
      type: Number,
      default: null,
      validate: {
        validator: function (value) {
          if (value === null || value === undefined) return true;
          return value >= 0;
        },
        message: 'Price cannot be negative'
      }
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Helpful constants exposed on model
itemSchema.statics.VALID_TYPES = validTypes;
itemSchema.statics.VALID_PRODUCT_STATUSES = validProductStatuses;
itemSchema.statics.VALID_TASK_STATUSES = validTaskStatuses;
itemSchema.statics.VALID_PRIORITIES = validPriorities;

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
