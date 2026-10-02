import { useState, useEffect, useCallback, useRef } from 'react';
import itemApi from '../services/itemApi';

/**
 * Custom hook to manage Items state, filtering, and API CRUD operations
 */
export const useItems = () => {
  const [items, setItems] = useState([]);
  const [allItemsForStats, setAllItemsForStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [backendConnected, setBackendConnected] = useState(true);

  // Filters
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');

  const isInitialMount = useRef(true);

  // Fetch items from the backend API
  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await itemApi.getItems({
        type: typeFilter,
        status: statusFilter,
        priority: priorityFilter,
        search: search
      });

      if (res && res.success) {
        setItems(res.data);
        setBackendConnected(true);
      } else {
        throw new Error(res.message || 'Failed to fetch items');
      }

      // Maintain accurate global stats even when filters are active
      if (search || typeFilter !== 'All' || statusFilter !== 'All' || priorityFilter !== 'All') {
        const statsRes = await itemApi.getItems();
        if (statsRes && statsRes.success) {
          setAllItemsForStats(statsRes.data);
        }
      } else {
        setAllItemsForStats(res.data);
      }
    } catch (err) {
      console.error('API Error in useItems:', err);
      setBackendConnected(false);
      const msg = err.response?.data?.message || err.message || 'Unable to connect to the backend server.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [typeFilter, statusFilter, priorityFilter, search]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      fetchItems();
      return;
    }

    const timer = setTimeout(() => {
      fetchItems();
    }, 200);
    return () => clearTimeout(timer);
  }, [fetchItems]);

  const resetFilters = () => {
    setSearch('');
    setTypeFilter('All');
    setStatusFilter('All');
    setPriorityFilter('All');
  };

  const createItem = async (data) => {
    const res = await itemApi.createItem(data);
    await fetchItems();
    return res;
  };

  const updateItem = async (id, data) => {
    const res = await itemApi.updateItem(id, data);
    await fetchItems();
    return res;
  };

  const deleteItem = async (id) => {
    const res = await itemApi.deleteItem(id);
    await fetchItems();
    return res;
  };

  return {
    items,
    allItemsForStats,
    loading,
    error,
    backendConnected,
    search,
    setSearch,
    typeFilter,
    setTypeFilter,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    resetFilters,
    fetchItems,
    createItem,
    updateItem,
    deleteItem
  };
};

export default useItems;
