// pages/EditProfitLoss.jsx
import React, { useEffect, useState } from "react";
import { X, Save } from "lucide-react";

import ProfitLossAPI from "../api/profitLossApi";
import { calcSteamLossKgHr, calcLossAmount, calcSavings } from "../utils/steamLossFormula";

export default function EditProfitLoss({ record, onClose, onSaved }) {
  const [form, setForm] = useState({
    date: record.date || "",
    deviceName: record.deviceName || "",
    customerName: record.customerName || "",
    diameter: record.diameter ?? "",
    pressure: record.pressure ?? "",
    hoursPerDay: record.hoursPerDay ?? 24,
    costPerKg: record.costPerKg ?? 2.5,
    recoveryPercent: record.recoveryPercent ?? 0,
  });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [apiError, setApiError] = useState("");

  const steamLossKgHr = calcSteamLossKgHr(form.diameter, form.pressure);
  const lossAmount = calcLossAmount(steamLossKgHr, form.hoursPerDay, form.costPerKg);
  const savings = calcSavings(lossAmount, form.recoveryPercent);
  const netStatus = savings >= lossAmount ? "Profit" : savings > 0 ? "Marginal" : "Loss";

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!form.deviceName.trim()) next.deviceName = "Device is required";
    if (!form.customerName.trim()) next.customerName = "Customer is required";
    if (!form.date) next.date = "Date is required";
    if (!form.diameter || Number(form.diameter) <= 0) next.diameter = "Enter a valid diameter (mm)";
    if (!form.pressure || Number(form.pressure) <= 0) next.pressure = "Enter a valid pressure";
    if (!form.costPerKg || Number(form.costPerKg) <= 0) next.costPerKg = "Enter a valid cost/kg";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      ...form,
      diameter: Number(form.diameter),
      pressure: Number(form.pressure),
      hoursPerDay: Number(form.hoursPerDay),
      costPerKg: Number(form.costPerKg),
      recoveryPercent: Number(form.recoveryPercent),
      steamLossKgHr,
      lossAmount,
      savings,
      status: netStatus,
    };

    setSaving(true);
    setApiError("");
    try {
      const res = await ProfitLossAPI.update(record.id, payload);
      onSaved(res.data);
    } catch (err) {
      setApiError("Could not update this entry. Please check the backend and try again.");
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="pl-modal-overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="pl-modal">
        <div className="pl-modal-header">
          <h2>Edit Entry — {record.displayId || `PL-${String(record.id).padStart(3, "0")}`}</h2>
          <button className="pl-modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="pl-modal-body">
            {apiError && <div className="pl-field-error" style={{ marginBottom: 12 }}>{apiError}</div>}

            <div className="pl-form-grid">
              <div className="pl-field">
                <label>Date</label>
                <input type="date" value={form.date} onChange={handleChange("date")} />
                {errors.date && <div className="pl-field-error">{errors.date}</div>}
              </div>

              <div className="pl-field">
                <label>Customer</label>
                <input value={form.customerName} onChange={handleChange("customerName")} />
                {errors.customerName && <div className="pl-field-error">{errors.customerName}</div>}
              </div>

              <div className="pl-field pl-full">
                <label>Device / Steam Trap</label>
                <input value={form.deviceName} onChange={handleChange("deviceName")} />
                {errors.deviceName && <div className="pl-field-error">{errors.deviceName}</div>}
              </div>

              <div className="pl-field">
                <label>Orifice Diameter (mm) — d</label>
                <input type="number" step="0.1" value={form.diameter} onChange={handleChange("diameter")} />
                {errors.diameter && <div className="pl-field-error">{errors.diameter}</div>}
              </div>

              <div className="pl-field">
                <label>Steam Pressure (kg/cm²) — P</label>
                <input type="number" step="0.1" value={form.pressure} onChange={handleChange("pressure")} />
                {errors.pressure && <div className="pl-field-error">{errors.pressure}</div>}
              </div>

              <div className="pl-field">
                <label>Operating Hours / Day</label>
                <input type="number" value={form.hoursPerDay} onChange={handleChange("hoursPerDay")} />
              </div>

              <div className="pl-field">
                <label>Steam Cost (₹ / kg)</label>
                <input
                  type="number"
                  step="0.01"
                  value={form.costPerKg}
                  onChange={handleChange("costPerKg")}
                />
                {errors.costPerKg && <div className="pl-field-error">{errors.costPerKg}</div>}
              </div>

              <div className="pl-field">
                <label>Expected Recovery (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={form.recoveryPercent}
                  onChange={handleChange("recoveryPercent")}
                />
              </div>

              <div className="pl-field">
                <label>Steam Loss (kg/hr) — Auto</label>
                <input readOnly value={steamLossKgHr} />
              </div>

              <div className="pl-field pl-full">
                <div className="pl-formula-note">
                  Formula: 0.0012 × d² × P = 0.0012 × {form.diameter || 0}² × {form.pressure || 0} ={" "}
                  <strong>{steamLossKgHr} kg/hr</strong>
                  <br />
                  Loss Amount: <strong>₹{lossAmount}</strong> &nbsp;|&nbsp; Savings:{" "}
                  <strong>₹{savings}</strong> &nbsp;→&nbsp; Status: <strong>{netStatus}</strong>
                </div>
              </div>
            </div>
          </div>

          <div className="pl-modal-footer">
            <button type="button" className="pl-btn pl-btn-outline" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="pl-btn pl-btn-primary" disabled={saving}>
              <Save size={16} /> {saving ? "Updating..." : "Update Entry"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
