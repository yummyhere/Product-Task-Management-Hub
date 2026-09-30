import axios from 'axios';

// Base API configuration with environment variable support
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
});

// Centralized API utility methods
export const itemApi = {
  /**
   * Fetch all items with optional query parameters
   * @param {Object} params - { type, status, priority, search }
   */
  getItems: async (params = {}) => {
    const cleanParams = {};
    if (params.type && params.type !== 'All') cleanParams.type = params.type;
    if (params.status && params.status !== 'All') cleanParams.status = params.status;
    if (params.priority && params.priority !== 'All') cleanParams.priority = params.priority;
    if (params.search && params.search.trim()) cleanParams.search = params.search.trim();

    const response = await apiClient.get('/items', { params: cleanParams });
    return response.data;
  },

  /**
   * Fetch a single item by ID
   * @param {string} id
   */
  getItem: async (id) => {
    const response = await apiClient.get(`/items/${id}`);
    return response.data;
  },

  /**
   * Create a new item
   * @param {Object} itemData
   */
  createItem: async (itemData) => {
    const response = await apiClient.post('/items', itemData);
    return response.data;
  },

  /**
   * Update an existing item
   * @param {string} id
   * @param {Object} itemData
   */
  updateItem: async (id, itemData) => {
    const response = await apiClient.put(`/items/${id}`, itemData);
    return response.data;
  },

  /**
   * Delete an item by ID
   * @param {string} id
   */
  deleteItem: async (id) => {
    const response = await apiClient.delete(`/items/${id}`);
    return response.data;
  }
};

export default itemApi;
