// pages/DeleteProfitModal.jsx
import React, { useEffect, useState } from "react";
import { X, Trash2, AlertTriangle } from "lucide-react";

export default function DeleteProfitModal({ record, onClose, onConfirm }) {
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleConfirm = async () => {
    setDeleting(true);
    try {
      await onConfirm();
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="pl-modal-overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="pl-modal pl-modal-sm">
        <div className="pl-modal-header">
          <h2>Delete Entry</h2>
          <button className="pl-modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="pl-modal-body">
          <div className="pl-delete-icon-wrap">
            <AlertTriangle size={26} />
          </div>
          <p className="pl-delete-text">
            Are you sure you want to delete{" "}
            <strong>{record.displayId || `PL-${String(record.id).padStart(3, "0")}`}</strong> for{" "}
            <strong>{record.deviceName}</strong> ({record.customerName})? This action cannot be undone.
          </p>
        </div>

        <div className="pl-modal-footer">
          <button type="button" className="pl-btn pl-btn-outline" onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="pl-btn pl-btn-danger" onClick={handleConfirm} disabled={deleting}>
            <Trash2 size={16} /> {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
