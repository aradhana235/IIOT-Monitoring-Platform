// pages/ProfitLossList.jsx
import React, { useEffect, useMemo, useState, useCallback } from "react";
import {
  TrendingUp,
  IndianRupee,
  AlertTriangle,
  CheckCircle2,
  Search,
  RefreshCw,
  Plus,
  FileSpreadsheet,
  FileText,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

import ProfitLossAPI from "../api/profitLossApi";
import { exportProfitLossToExcel, exportProfitLossToPDF } from "../utils/profitLossExport";

import AddProfitLoss from "./AddProfitLoss";
import EditProfitLoss from "./EditProfitLoss";
import ViewProfitLoss from "./ViewProfitLoss";
import DeleteProfitModal from "./DeleteProfitModal";

import "../styles/ProfitLoss.css";

const USE_DEMO_DATA = true;

const DEMO_RECORDS = [
  {
    id: 1,
    displayId: "PL-001",
    date: "2026-07-10",
    deviceName: "SteamTrap-001",
    customerName: "BridgeStone",
    diameter: 6,
    pressure: 7,
    hoursPerDay: 24,
    costPerKg: 2.5,
    recoveryPercent: 40,
    steamLossKgHr: 0.302,
    lossAmount: 18.14,
    savings: 7.26,
    status: "Loss",
  },
  {
    id: 2,
    displayId: "PL-002",
    date: "2026-07-11",
    deviceName: "SteamTrap-005",
    customerName: "CEAT",
    diameter: 4,
    pressure: 6,
    hoursPerDay: 24,
    costPerKg: 2.5,
    recoveryPercent: 65,
    steamLossKgHr: 0.115,
    lossAmount: 6.92,
    savings: 4.5,
    status: "Marginal",
  },
  {
    id: 3,
    displayId: "PL-003",
    date: "2026-07-12",
    deviceName: "SteamTrap-010",
    customerName: "MRF",
    diameter: 3,
    pressure: 5,
    hoursPerDay: 20,
    costPerKg: 2.3,
    recoveryPercent: 90,
    steamLossKgHr: 0.054,
    lossAmount: 2.48,
    savings: 2.24,
    status: "Profit",
  },
  {
    id: 4,
    displayId: "PL-004",
    date: "2026-07-12",
    deviceName: "SteamTrap-018",
    customerName: "Apollo",
    diameter: 8,
    pressure: 8,
    hoursPerDay: 24,
    costPerKg: 2.6,
    recoveryPercent: 25,
    steamLossKgHr: 0.614,
    lossAmount: 38.3,
    savings: 9.58,
    status: "Loss",
  },
  {
    id: 5,
    displayId: "PL-005",
    date: "2026-07-13",
    deviceName: "SteamTrap-020",
    customerName: "JK Tyre",
    diameter: 5,
    pressure: 6,
    hoursPerDay: 24,
    costPerKg: 2.5,
    recoveryPercent: 75,
    steamLossKgHr: 0.18,
    lossAmount: 10.8,
    savings: 8.1,
    status: "Profit",
  },
  {
    id: 6,
    displayId: "PL-006",
    date: "2026-07-13",
    deviceName: "SteamTrap-014",
    customerName: "Alkem",
    diameter: 6,
    pressure: 7,
    hoursPerDay: 22,
    costPerKg: 2.4,
    recoveryPercent: 50,
    steamLossKgHr: 0.302,
    lossAmount: 15.94,
    savings: 7.97,
    status: "Marginal",
  },
  {
    id: 7,
    displayId: "PL-007",
    date: "2026-07-13",
    deviceName: "SteamTrap-022",
    customerName: "GSP Crop",
    diameter: 4,
    pressure: 5,
    hoursPerDay: 24,
    costPerKg: 2.5,
    recoveryPercent: 30,
    steamLossKgHr: 0.096,
    lossAmount: 5.76,
    savings: 1.73,
    status: "Loss",
  },
];

export default function ProfitLossList() {
  const [records, setRecords] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isDemo, setIsDemo] = useState(false);

  const [search, setSearch] = useState("");
  const [customerFilter, setCustomerFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const [modal, setModal] = useState({ type: null, record: null });

  // Normalizes whatever the backend returns (plain array, Spring Boot
  // Page object { content: [...] }, or { data: [...] } wrapper) into
  // a plain array, so downstream .filter/.map never crash.
  const normalizeList = (payload) => {
    if (Array.isArray(payload)) return payload;
    if (Array.isArray(payload?.content)) return payload.content;
    if (Array.isArray(payload?.data)) return payload.data;
    return null;
  };

  const fetchRecords = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await ProfitLossAPI.getAll();
      const list = normalizeList(res.data);

      if (list && list.length > 0) {
        setRecords(list);
        setIsDemo(false);
      } else if (USE_DEMO_DATA) {
        setRecords(DEMO_RECORDS);
        setIsDemo(true);
      } else {
        setRecords(list || []);
        setIsDemo(false);
      }
    } catch (err) {
      if (USE_DEMO_DATA) {
        setRecords(DEMO_RECORDS);
        setIsDemo(true);
      } else {
        setRecords([]);
        setError(
          "Unable to load Profit & Loss records — check that the backend endpoint /api/profit-loss is running."
        );
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchCustomers = useCallback(async () => {
    try {
      const res = await ProfitLossAPI.getCustomers();
      const list = normalizeList(res.data);
      setCustomers(list || []);
    } catch (err) {
      // Non-fatal; filter dropdown falls back to distinct list from records
    }
  }, []);

  useEffect(() => {
    fetchRecords();
    fetchCustomers();
  }, [fetchRecords, fetchCustomers]);

  const customerOptions = useMemo(() => {
    if (customers.length) return customers;
    if (!Array.isArray(records)) return [];
    return [...new Set(records.map((r) => r.customerName))].filter(Boolean);
  }, [customers, records]);

  const filtered = useMemo(() => {
    if (!Array.isArray(records)) return [];
    return records.filter((r) => {
      const matchesSearch =
        !search ||
        r.deviceName?.toLowerCase().includes(search.toLowerCase()) ||
        r.customerName?.toLowerCase().includes(search.toLowerCase()) ||
        `${r.id}`.includes(search);
      const matchesCustomer = customerFilter === "All" || r.customerName === customerFilter;
      const matchesStatus = statusFilter === "All" || r.status === statusFilter;
      return matchesSearch && matchesCustomer && matchesStatus;
    });
  }, [records, search, customerFilter, statusFilter]);

  const kpis = useMemo(() => {
    const totalRecords = filtered.length;
    const totalLoss = filtered.reduce((sum, r) => sum + (Number(r.lossAmount) || 0), 0);
    const totalSavings = filtered.reduce((sum, r) => sum + (Number(r.savings) || 0), 0);
    const netProfit = totalSavings - totalLoss;
    return { totalRecords, totalLoss, totalSavings, netProfit };
  }, [filtered]);

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

  const handleDeleteConfirmed = async (id) => {
    if (isDemo) {
      // No backend yet — just remove locally so the flow can be reviewed.
      setRecords((prev) => prev.filter((r) => r.id !== id));
      setModal({ type: null, record: null });
      return;
    }
    try {
      await ProfitLossAPI.remove(id);
      setRecords((prev) => prev.filter((r) => r.id !== id));
    } finally {
      setModal({ type: null, record: null });
    }
  };

  return (
    <div className="pl-page">
      {/* Header */}
      <div className="pl-header">
        <div>
          <div className="pl-header-title-group">
            <TrendingUp size={28} />
            <h1>Profit &amp; Loss</h1>
          </div>
          <p>Steam Trap Loss &amp; Recovery Tracking</p>
        </div>

        <div className="pl-header-actions">
          <button className="pl-btn pl-btn-outline" onClick={fetchRecords}>
            <RefreshCw size={16} /> Refresh
          </button>
          <button
            className="pl-btn pl-btn-success"
            onClick={() => exportProfitLossToExcel(filtered)}
            disabled={!filtered.length}
          >
            <FileSpreadsheet size={16} /> Export Excel
          </button>
          <button
            className="pl-btn pl-btn-outline"
            onClick={() => exportProfitLossToPDF(filtered)}
            disabled={!filtered.length}
          >
            <FileText size={16} /> Export PDF
          </button>
          <button
            className="pl-btn pl-btn-primary"
            onClick={() => setModal({ type: "add", record: null })}
          >
            <Plus size={16} /> Add Entry
          </button>
        </div>
      </div>

      {isDemo && (
        <div
          style={{
            background: "#fef3c7",
            color: "#92400e",
            borderRadius: 8,
            padding: "8px 14px",
            fontSize: 13,
            marginBottom: 16,
            fontWeight: 600,
          }}
        >
          ⚠ Showing demo data — backend endpoint /api/profit-loss isn't returning live records yet.
        </div>
      )}

      {/* KPI cards */}
      <div className="pl-kpi-grid">
        <div className="pl-kpi-card">
          <div className="pl-kpi-icon">
            <TrendingUp size={22} />
          </div>
          <div>
            <div className="pl-kpi-value">{kpis.totalRecords}</div>
            <div className="pl-kpi-label">Total Records</div>
          </div>
        </div>

        <div className="pl-kpi-card pl-kpi-danger">
          <div className="pl-kpi-icon">
            <AlertTriangle size={22} />
          </div>
          <div>
            <div className="pl-kpi-value">{formatINR(kpis.totalLoss)}</div>
            <div className="pl-kpi-label">Total Loss</div>
          </div>
        </div>

        <div className="pl-kpi-card pl-kpi-success">
          <div className="pl-kpi-icon">
            <CheckCircle2 size={22} />
          </div>
          <div>
            <div className="pl-kpi-value">{formatINR(kpis.totalSavings)}</div>
            <div className="pl-kpi-label">Total Savings</div>
          </div>
        </div>

        <div className={`pl-kpi-card ${kpis.netProfit >= 0 ? "pl-kpi-success" : "pl-kpi-danger"}`}>
          <div className="pl-kpi-icon">
            <IndianRupee size={22} />
          </div>
          <div>
            <div className="pl-kpi-value">{formatINR(kpis.netProfit)}</div>
            <div className="pl-kpi-label">Net Profit / Loss</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="pl-filter-bar">
        <div className="pl-search-wrap">
          <Search size={16} />
          <input
            className="pl-input"
            placeholder="Search by device, customer, or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          className="pl-select"
          value={customerFilter}
          onChange={(e) => setCustomerFilter(e.target.value)}
        >
          <option value="All">All Customers</option>
          {customerOptions.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          className="pl-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Profit">Profit</option>
          <option value="Marginal">Marginal</option>
          <option value="Loss">Loss</option>
        </select>

        <button className="pl-btn pl-btn-primary" onClick={fetchRecords}>
          <Search size={16} /> Search
        </button>
      </div>

      {/* Table */}
      <div className="pl-table-card">
        {loading ? (
          <div className="pl-loading-state">Loading Profit &amp; Loss records...</div>
        ) : error ? (
          <div className="pl-empty-state">{error}</div>
        ) : filtered.length === 0 ? (
          <div className="pl-empty-state">No records found for the selected filters.</div>
        ) : (
          <table className="pl-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Device</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Steam Loss (kg/hr)</th>
                <th>Loss Amount</th>
                <th>Savings</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id}>
                  <td className="pl-mono">{r.displayId || `PL-${String(r.id).padStart(3, "0")}`}</td>
                  <td>{r.deviceName}</td>
                  <td>{r.customerName}</td>
                  <td>{r.date}</td>
                  <td className="pl-mono">{r.steamLossKgHr}</td>
                  <td className="pl-mono">{formatINR(r.lossAmount)}</td>
                  <td className="pl-mono">{formatINR(r.savings)}</td>
                  <td>
                    <span className={statusBadgeClass(r.status)}>{r.status}</span>
                  </td>
                  <td>
                    <div className="pl-action-group">
                      <button
                        className="pl-icon-btn view"
                        title="View"
                        onClick={() => setModal({ type: "view", record: r })}
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        className="pl-icon-btn edit"
                        title="Edit"
                        onClick={() => setModal({ type: "edit", record: r })}
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        className="pl-icon-btn delete"
                        title="Delete"
                        onClick={() => setModal({ type: "delete", record: r })}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modals */}
      {modal.type === "add" && (
        <AddProfitLoss
          onClose={() => setModal({ type: null, record: null })}
          onSaved={(newRec) => {
            setRecords((prev) => [newRec, ...prev]);
            setModal({ type: null, record: null });
          }}
        />
      )}

      {modal.type === "edit" && modal.record && (
        <EditProfitLoss
          record={modal.record}
          onClose={() => setModal({ type: null, record: null })}
          onSaved={(updated) => {
            setRecords((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
            setModal({ type: null, record: null });
          }}
        />
      )}

      {modal.type === "view" && modal.record && (
        <ViewProfitLoss record={modal.record} onClose={() => setModal({ type: null, record: null })} />
      )}

      {modal.type === "delete" && modal.record && (
        <DeleteProfitModal
          record={modal.record}
          onClose={() => setModal({ type: null, record: null })}
          onConfirm={() => handleDeleteConfirmed(modal.record.id)}
        />
      )}
    </div>
  );
}
