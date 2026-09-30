import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import ItemFormModal from './components/ItemFormModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import Toast from './components/Toast';
import useItems from './hooks/useItems';

function App() {
  const {
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
  } = useItems();

  // Modal & Mutation state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Toast feedback state
  const [toast, setToast] = useState({ message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const hideToast = () => {
    setToast({ message: '', type: 'success' });
  };

  // Open modal in Create mode
  const handleOpenCreate = () => {
    setEditingItem(null);
    setIsFormOpen(true);
  };

  // Open modal in Edit mode
  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setIsFormOpen(true);
  };

  // Close form modal
  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingItem(null);
  };

  // Handle Form Submission (Create or Edit)
  const handleFormSubmit = async (formData) => {
    try {
      setIsSubmitting(true);
      if (editingItem) {
        // Update existing item via PUT /api/items/:id
        const res = await updateItem(editingItem._id, formData);
        if (res.success) {
          showToast('Item updated successfully', 'success');
          handleCloseForm();
        } else {
          throw new Error(res.message || 'Failed to update item');
        }
      } else {
        // Create new item via POST /api/items
        const res = await createItem(formData);
        if (res.success) {
          showToast('Item created successfully', 'success');
          handleCloseForm();
        } else {
          throw new Error(res.message || 'Failed to create item');
        }
      }
    } catch (err) {
      console.error('Save failed:', err);
      const msg = err.response?.data?.message || err.message || 'Operation failed. Please try again.';
      showToast(msg, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Open Delete confirmation dialog
  const handleOpenDelete = (item) => {
    setItemToDelete(item);
    setIsDeleteOpen(true);
  };

  // Close Delete dialog
  const handleCloseDelete = () => {
    setIsDeleteOpen(false);
    setItemToDelete(null);
  };

  // Confirm Deletion via DELETE /api/items/:id
  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;

    try {
      setIsDeleting(true);
      const res = await deleteItem(itemToDelete._id);
      if (res.success) {
        showToast('Item deleted successfully', 'success');
        handleCloseDelete();
      } else {
        throw new Error(res.message || 'Failed to delete item');
      }
    } catch (err) {
      console.error('Delete failed:', err);
      const msg = err.response?.data?.message || err.message || 'Failed to delete item.';
      showToast(msg, 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="app-container">
      <Navbar onOpenCreateModal={handleOpenCreate} isConnected={backendConnected} />

      <main className="main-content">
        <Dashboard
          items={items}
          statsItems={allItemsForStats}
          loading={loading}
          error={error}
          search={search}
          onSearchChange={setSearch}
          typeFilter={typeFilter}
          onTypeChange={setTypeFilter}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          priorityFilter={priorityFilter}
          onPriorityChange={setPriorityFilter}
          onResetFilters={resetFilters}
          onOpenCreate={handleOpenCreate}
          onEditItem={handleOpenEdit}
          onDeleteItem={handleOpenDelete}
          deletingId={isDeleting && itemToDelete ? itemToDelete._id : null}
          onRetry={fetchItems}
        />
      </main>

      {/* Item Creation / Edit Modal */}
      <ItemFormModal
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleFormSubmit}
        initialItem={editingItem}
        isSubmitting={isSubmitting}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        onClose={handleCloseDelete}
        onConfirm={handleConfirmDelete}
        item={itemToDelete}
        isDeleting={isDeleting}
      />

      {/* Toast Notification Container */}
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={hideToast}
      />
    </div>
  );
}

export default App;
