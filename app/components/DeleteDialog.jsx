import React from 'react';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { formatExpressionAsString } from "../utils/formatExpression";
import { syncWithGoogleSheets } from "../utils/googleSheets";

export function DeleteDialog({ visible, onHide, onDelete, selectedItem, history }) {
  const handleDelete = async (item) => {
    if (item) {
      await onDelete(item);
      // Sync the updated history with Google Sheets
      await syncWithGoogleSheets(history?.filter(h => h !== item));
    }
    onHide();
  };

  return (
    <ConfirmDialog
      visible={visible}
      onHide={onHide}
      header="Xác nhận xóa"
      message={selectedItem ? <><p>Bạn có chắc chắn muốn xóa phép tính này không?</p><p className="mt-2 font-bold">{formatExpressionAsString(selectedItem.expression)} = {selectedItem.result}</p></> : ''}
      icon="pi pi-exclamation-triangle"
      defaultFocus="accept"
      accept={() => handleDelete(selectedItem)}
      reject={onHide}
    >
    </ConfirmDialog>
  );
} 