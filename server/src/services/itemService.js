const Item = require('../models/Item');

/**
 * Service handling business and data access logic for Items
 */
class ItemService {
  /**
   * Retrieve items matching optional query filters
   * @param {Object} filters - Query parameters (type, status, priority, search)
   * @returns {Promise<Array>} List of items
   */
  async getAllItems(filters = {}) {
    const query = {};

    if (filters.type && filters.type !== 'All') {
      query.type = filters.type;
    }

    if (filters.status && filters.status !== 'All') {
      query.status = filters.status;
    }

    if (filters.priority && filters.priority !== 'All') {
      query.priority = filters.priority;
    }

    if (filters.search && filters.search.trim()) {
      const searchRegex = new RegExp(filters.search.trim(), 'i');
      query.$or = [
        { name: searchRegex },
        { description: searchRegex }
      ];
    }

    // Return newest items first
    return await Item.find(query).sort({ createdAt: -1 });
  }

  /**
   * Find an item by its MongoDB ID
   * @param {string} id - Item ID
   * @returns {Promise<Object|null>} Item or null
   */
  async getItemById(id) {
    return await Item.findById(id);
  }

  /**
   * Create a new item
   * @param {Object} itemData - Item attributes
   * @returns {Promise<Object>} Created item document
   */
  async createItem(itemData) {
    // If type is Task and price is not provided or empty string, set null
    const cleanedData = { ...itemData };
    if (cleanedData.price === '' || cleanedData.price === undefined) {
      cleanedData.price = null;
    } else if (cleanedData.price !== null) {
      cleanedData.price = Number(cleanedData.price);
    }

    const item = new Item(cleanedData);
    return await item.save();
  }

  /**
   * Update an existing item
   * @param {string} id - Item ID
   * @param {Object} updateData - Updated attributes
   * @returns {Promise<Object|null>} Updated item or null
   */
  async updateItem(id, updateData) {
    const cleanedData = { ...updateData };
    if (cleanedData.price === '' || cleanedData.price === undefined) {
      cleanedData.price = null;
    } else if (cleanedData.price !== null) {
      cleanedData.price = Number(cleanedData.price);
    }

    // Validate type and status compatibility when updating
    const existing = await Item.findById(id);
    if (!existing) {
      return null;
    }

    const targetType = cleanedData.type || existing.type;
    const targetStatus = cleanedData.status || existing.status;

    if (targetType === 'Product' && !Item.VALID_PRODUCT_STATUSES.includes(targetStatus)) {
      const error = new Error(`'${targetStatus}' is not a valid status for Product. Allowed: ${Item.VALID_PRODUCT_STATUSES.join(', ')}`);
      error.name = 'ValidationError';
      throw error;
    }

    if (targetType === 'Task' && !Item.VALID_TASK_STATUSES.includes(targetStatus)) {
      const error = new Error(`'${targetStatus}' is not a valid status for Task. Allowed: ${Item.VALID_TASK_STATUSES.join(', ')}`);
      error.name = 'ValidationError';
      throw error;
    }

    return await Item.findByIdAndUpdate(id, cleanedData, {
      new: true,
      runValidators: true
    });
  }

  /**
   * Delete an item by ID
   * @param {string} id - Item ID
   * @returns {Promise<Object|null>} Deleted item or null
   */
  async deleteItem(id) {
    return await Item.findByIdAndDelete(id);
  }
}

module.exports = new ItemService();
