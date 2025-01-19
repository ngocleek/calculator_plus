import { useState } from 'react';

export function useDeleteHandler() {
  const [pressTimer, setPressTimer] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleTouchStart = (item) => {
    const timer = setTimeout(() => {
      setSelectedItem(item);
      setShowDeleteDialog(true);
    }, 800); // 800ms hold time
    setPressTimer(timer);
  };

  const handleTouchEnd = () => {
    if (pressTimer) {
      clearTimeout(pressTimer);
      setPressTimer(null);
    }
  };

  const handleDelete = (onDelete) => {
    if (selectedItem) {
      onDelete(selectedItem);
      setSelectedItem(null);
    }
    setShowDeleteDialog(false);
  };

  return {
    selectedItem,
    showDeleteDialog,
    setShowDeleteDialog,
    handleTouchStart,
    handleTouchEnd,
    handleDelete
  };
} 