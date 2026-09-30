const mongoose = require('mongoose');
const itemService = require('../services/itemService');

/**
 * Controller handling HTTP requests and responses for Items
 */
class ItemController {
  /**
   * Helper to validate MongoDB ObjectId
   */
  isValidObjectId(id) {
    return mongoose.Types.ObjectId.isValid(id) && (String(new mongoose.Types.ObjectId(id)) === id);
  }

  /**
   * @route GET /api/items
   * @desc Retrieve all items with optional query filters
   */
  getItems = async (req, res, next) => {
    try {
      const filters = {
        type: req.query.type,
        status: req.query.status,
        priority: req.query.priority,
        search: req.query.search
      };

      const items = await itemService.getAllItems(filters);

      return res.status(200).json({
        success: true,
        count: items.length,
        data: items
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * @route GET /api/items/:id
   * @desc Retrieve an item by ID
   */
  getItemById = async (req, res, next) => {
    try {
      const { id } = req.params;

      if (!this.isValidObjectId(id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid item ID format'
        });
      }

      const item = await itemService.getItemById(id);

      if (!item) {
        return res.status(404).json({
          success: false,
          message: 'Item not found'
        });
      }

      return res.status(200).json({
        success: true,
        data: item
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * @route POST /api/items
   * @desc Create a new item
   */
  createItem = async (req, res, next) => {
    try {
      const { name, description, type, status, priority, price } = req.body;

      // Validate required fields explicitly
      const missingFields = [];
      if (!name || !name.trim()) missingFields.push('name');
      if (!description || !description.trim()) missingFields.push('description');
      if (!type) missingFields.push('type');
      if (!status) missingFields.push('status');
      if (!priority) missingFields.push('priority');

      if (missingFields.length > 0) {
        return res.status(400).json({
          success: false,
          message: `Missing required fields: ${missingFields.join(', ')}`
        });
      }

      // Check price if provided
      if (price !== undefined && price !== null && price !== '') {
        const numPrice = Number(price);
        if (isNaN(numPrice) || numPrice < 0) {
          return res.status(400).json({
            success: false,
            message: 'Price must be a non-negative number'
          });
        }
      }

      const newItem = await itemService.createItem({
        name,
        description,
        type,
        status,
        priority,
        price
      });

      return res.status(201).json({
        success: true,
        message: 'Item created successfully',
        data: newItem
      });
    } catch (error) {
      // Handle mongoose validation error cleanly
      if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map(err => err.message);
        return res.status(400).json({
          success: false,
          message: messages.join('; ')
        });
      }
      next(error);
    }
  };

  /**
   * @route PUT /api/items/:id
   * @desc Update an existing item
   */
  updateItem = async (req, res, next) => {
    try {
      const { id } = req.params;

      if (!this.isValidObjectId(id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid item ID format'
        });
      }

      const { name, description, type, status, priority, price } = req.body;

      // Validate non-empty fields if provided
      if (name !== undefined && !name.trim()) {
        return res.status(400).json({
          success: false,
          message: 'Name cannot be empty'
        });
      }

      if (description !== undefined && !description.trim()) {
        return res.status(400).json({
          success: false,
          message: 'Description cannot be empty'
        });
      }

      if (price !== undefined && price !== null && price !== '') {
        const numPrice = Number(price);
        if (isNaN(numPrice) || numPrice < 0) {
          return res.status(400).json({
            success: false,
            message: 'Price must be a non-negative number'
          });
        }
      }

      const updatedItem = await itemService.updateItem(id, req.body);

      if (!updatedItem) {
        return res.status(404).json({
          success: false,
          message: 'Item not found'
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Item updated successfully',
        data: updatedItem
      });
    } catch (error) {
      if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors || {}).map(err => err.message);
        return res.status(400).json({
          success: false,
          message: messages.length > 0 ? messages.join('; ') : error.message
        });
      }
      next(error);
    }
  };

  /**
   * @route DELETE /api/items/:id
   * @desc Delete an item by ID
   */
  deleteItem = async (req, res, next) => {
    try {
      const { id } = req.params;

      if (!this.isValidObjectId(id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid item ID format'
        });
      }

      const deletedItem = await itemService.deleteItem(id);

      if (!deletedItem) {
        return res.status(404).json({
          success: false,
          message: 'Item not found'
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Item deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new ItemController();
