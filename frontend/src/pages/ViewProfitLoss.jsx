// pages/ViewProfitLoss.jsx
import React, { useEffect } from "react";
import { X, Eye } from "lucide-react";

export default function ViewProfitLoss({ record, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const formatINR = (val) =>
    `₹${Number(val || 0).toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;

  const statusBadgeClass = (status) => {
    switch (status) {
      case "Profit":
        return "pl-badge pl-badge-profit";
      case "Loss":
        return "pl-badge pl-badge-loss";
      case "Marginal":
        return "pl-badge pl-badge-medium";
      default:
        return "pl-badge pl-badge-neutral";
    }
  };

  return (
    <div className="pl-modal-overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="pl-modal">
        <div className="pl-modal-header">
          <h2>
            <Eye size={18} style={{ marginRight: 8, verticalAlign: "-3px" }} />
            {record.displayId || `PL-${String(record.id).padStart(3, "0")}`}
          </h2>
          <button className="pl-modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="pl-modal-body">
          <div className="pl-view-grid">
            <div className="pl-view-item">
              <div className="label">Date</div>
              <div className="value">{record.date}</div>
            </div>
            <div className="pl-view-item">
              <div className="label">Status</div>
              <div className="value">
                <span className={statusBadgeClass(record.status)}>{record.status}</span>
              </div>
            </div>

            <div className="pl-view-item">
              <div className="label">Device / Steam Trap</div>
              <div className="value">{record.deviceName}</div>
            </div>
            <div className="pl-view-item">
              <div className="label">Customer</div>
              <div className="value">{record.customerName}</div>
            </div>

            <div className="pl-view-item">
              <div className="label">Orifice Diameter (d)</div>
              <div className="value pl-mono">{record.diameter} mm</div>
            </div>
            <div className="pl-view-item">
              <div className="label">Steam Pressure (P)</div>
              <div className="value pl-mono">{record.pressure} kg/cm²</div>
            </div>

            <div className="pl-view-item">
              <div className="label">Steam Loss</div>
              <div className="value pl-mono">{record.steamLossKgHr} kg/hr</div>
            </div>
            <div className="pl-view-item">
              <div className="label">Operating Hours / Day</div>
              <div className="value pl-mono">{record.hoursPerDay}</div>
            </div>

            <div className="pl-view-item">
              <div className="label">Steam Cost</div>
              <div className="value pl-mono">₹{record.costPerKg} / kg</div>
            </div>
            <div className="pl-view-item">
              <div className="label">Recovery Assumed</div>
              <div className="value pl-mono">{record.recoveryPercent}%</div>
            </div>

            <div className="pl-view-item">
              <div className="label">Loss Amount</div>
              <div className="value pl-mono">{formatINR(record.lossAmount)}</div>
            </div>
            <div className="pl-view-item">
              <div className="label">Savings</div>
              <div className="value pl-mono">{formatINR(record.savings)}</div>
            </div>
          </div>

          <div className="pl-formula-note" style={{ marginTop: 20 }}>
            Steam Loss = 0.0012 × d² × P = 0.0012 × {record.diameter}² × {record.pressure} ={" "}
            <strong>{record.steamLossKgHr} kg/hr</strong>
          </div>
        </div>

        <div className="pl-modal-footer">
          <button className="pl-btn pl-btn-primary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
