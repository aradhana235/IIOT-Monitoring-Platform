// pages/Telemetry.jsx
import React, { useEffect, useMemo, useState, useCallback, useRef } from "react";
import {
  Activity,
  Search,
  RefreshCw,
  Thermometer,
  Gauge,
  Wind,
  Wifi,
  WifiOff,
  AlertTriangle,
} from "lucide-react";

import TelemetryAPI from "../api/telemetryApi";
import "../styles/Telemetry.css";

/* ==========================================================================
   TEMPORARY DEMO DATA
   Backend endpoint /api/telemetry/latest is not live yet. This simulates
   device-wise real-time readings (values nudge slightly every few seconds)
   so the UI/UX can be reviewed now. Remove USE_DEMO_DATA once real API
   + WebSocket/polling integration from Aradhana's side is ready.
   ========================================================================== */
const USE_DEMO_DATA = true;
const POLL_INTERVAL_MS = 4000;

const SENSOR_ICONS = {
  Temperature: Thermometer,
  Pressure: Gauge,
  Flow: Wind,
};

function seedDemoReadings() {
  return [
    { id: 1, deviceName: "SteamTrap-001", customerName: "BridgeStone", sensorType: "Temperature", value: 182.4, unit: "°C", status: "Online" },
    { id: 2, deviceName: "SteamTrap-001", customerName: "BridgeStone", sensorType: "Pressure", value: 7.2, unit: "kg/cm²", status: "Online" },
    { id: 3, deviceName: "SteamTrap-005", customerName: "CEAT", sensorType: "Temperature", value: 164.1, unit: "°C", status: "Online" },
    { id: 4, deviceName: "SteamTrap-005", customerName: "CEAT", sensorType: "Flow", value: 12.6, unit: "kg/hr", status: "Warning" },
    { id: 5, deviceName: "SteamTrap-010", customerName: "MRF", sensorType: "Temperature", value: 158.9, unit: "°C", status: "Online" },
    { id: 6, deviceName: "SteamTrap-010", customerName: "MRF", sensorType: "Pressure", value: 5.4, unit: "kg/cm²", status: "Online" },
    { id: 7, deviceName: "SteamTrap-018", customerName: "Apollo", sensorType: "Temperature", value: 0, unit: "°C", status: "Offline" },
    { id: 8, deviceName: "SteamTrap-018", customerName: "Apollo", sensorType: "Pressure", value: 0, unit: "kg/cm²", status: "Offline" },
    { id: 9, deviceName: "SteamTrap-020", customerName: "JK Tyre", sensorType: "Temperature", value: 171.3, unit: "°C", status: "Online" },
    { id: 10, deviceName: "SteamTrap-020", customerName: "JK Tyre", sensorType: "Flow", value: 9.8, unit: "kg/hr", status: "Online" },
    { id: 11, deviceName: "SteamTrap-014", customerName: "Alkem", sensorType: "Pressure", value: 6.9, unit: "kg/cm²", status: "Online" },
    { id: 12, deviceName: "SteamTrap-022", customerName: "GSP Crop", sensorType: "Temperature", value: 149.7, unit: "°C", status: "Warning" },
  ].map((r) => ({ ...r, updatedAt: new Date().toISOString() }));
}

function nudgeReadings(prev) {
  return prev.map((r) => {
    if (r.status === "Offline") return { ...r, updatedAt: new Date().toISOString() };
    const drift = (Math.random() - 0.5) * (r.sensorType === "Temperature" ? 2 : 0.4);
    const newValue = Math.max(0, +(r.value + drift).toFixed(1));
    return { ...r, value: newValue, updatedAt: new Date().toISOString() };
  });
}

export default function Telemetry() {
  const [readings, setReadings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isDemo, setIsDemo] = useState(false);
  const [isLive, setIsLive] = useState(true);

  const [search, setSearch] = useState("");
  const [deviceFilter, setDeviceFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const pollRef = useRef(null);

  const normalizeList = (payload) => {
    if (Array.isArray(payload)) return payload;
    if (Array.isArray(payload?.content)) return payload.content;
    if (Array.isArray(payload?.data)) return payload.data;
    return null;
  };

  const fetchReadings = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await TelemetryAPI.getLatest();
      const list = normalizeList(res.data);

      if (list && list.length > 0) {
        setReadings(list);
        setIsDemo(false);
      } else if (USE_DEMO_DATA) {
        setReadings(seedDemoReadings());
        setIsDemo(true);
      } else {
        setReadings([]);
      }
    } catch (err) {
      if (USE_DEMO_DATA) {
        setReadings(seedDemoReadings());
        setIsDemo(true);
      } else {
        setReadings([]);
        setError("Unable to load telemetry — check that /api/telemetry/latest is running.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReadings();
  }, [fetchReadings]);

  // Live polling: in demo mode we simulate drifting sensor values;
  // once a real backend is connected this simply re-fetches getLatest().
  useEffect(() => {
    if (!isLive) return;

    pollRef.current = setInterval(() => {
      if (isDemo) {
        setReadings((prev) => nudgeReadings(prev));
      } else {
        fetchReadings();
      }
    }, POLL_INTERVAL_MS);

    return () => clearInterval(pollRef.current);
  }, [isLive, isDemo, fetchReadings]);

  const deviceOptions = useMemo(
    () => [...new Set(readings.map((r) => r.deviceName))].filter(Boolean),
    [readings]
  );

  const filtered = useMemo(() => {
    if (!Array.isArray(readings)) return [];
    return readings.filter((r) => {
      const matchesSearch =
        !search ||
        r.deviceName?.toLowerCase().includes(search.toLowerCase()) ||
        r.customerName?.toLowerCase().includes(search.toLowerCase()) ||
        r.sensorType?.toLowerCase().includes(search.toLowerCase());
      const matchesDevice = deviceFilter === "All" || r.deviceName === deviceFilter;
      const matchesStatus = statusFilter === "All" || r.status === statusFilter;
      return matchesSearch && matchesDevice && matchesStatus;
    });
  }, [readings, search, deviceFilter, statusFilter]);

  const kpis = useMemo(() => {
    const onlineCount = readings.filter((r) => r.status === "Online").length;
    const offlineCount = readings.filter((r) => r.status === "Offline").length;
    const warningCount = readings.filter((r) => r.status === "Warning").length;
    const totalSensors = readings.length;
    return { onlineCount, offlineCount, warningCount, totalSensors };
  }, [readings]);

  const statusBadge = (status) => {
    switch (status) {
      case "Online":
        return (
          <span className="tl-badge tl-badge-online">
            <Wifi size={12} /> Online
          </span>
        );
      case "Offline":
        return (
          <span className="tl-badge tl-badge-offline">
            <WifiOff size={12} /> Offline
          </span>
        );
      case "Warning":
        return (
          <span className="tl-badge tl-badge-warning">
            <AlertTriangle size={12} /> Warning
          </span>
        );
      default:
        return <span className="tl-badge">{status}</span>;
    }
  };

  const timeAgo = (iso) => {
    const secs = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
    if (secs < 5) return "just now";
    if (secs < 60) return `${secs}s ago`;
    const mins = Math.floor(secs / 60);
    return `${mins}m ago`;
  };

  return (
    <div className="tl-page">
      <div className="tl-header">
        <div>
          <div className="tl-header-title-group">
            <Activity size={28} />
            <h1>Telemetry</h1>
          </div>
          <p>Live Device-wise Sensor Readings</p>
        </div>

        <div className="tl-header-actions">
          <span className="tl-live-badge">
            <span className="tl-live-dot" /> {isLive ? "LIVE" : "PAUSED"}
          </span>
          <button
            className={`tl-btn tl-btn-outline ${isLive ? "active" : ""}`}
            onClick={() => setIsLive((v) => !v)}
          >
            {isLive ? "Pause" : "Resume"}
          </button>
          <button className="tl-btn tl-btn-outline" onClick={fetchReadings}>
            <RefreshCw size={16} /> Refresh
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
          ⚠ Showing simulated live data — backend endpoint /api/telemetry/latest isn't returning live records yet.
        </div>
      )}

      <div className="tl-kpi-grid">
        <div className="tl-kpi-card">
          <div className="tl-kpi-icon">
            <Activity size={22} />
          </div>
          <div>
            <div className="tl-kpi-value">{kpis.totalSensors}</div>
            <div className="tl-kpi-label">Total Sensors</div>
          </div>
        </div>

        <div className="tl-kpi-card tl-kpi-success">
          <div className="tl-kpi-icon">
            <Wifi size={22} />
          </div>
          <div>
            <div className="tl-kpi-value">{kpis.onlineCount}</div>
            <div className="tl-kpi-label">Online</div>
          </div>
        </div>

        <div className="tl-kpi-card tl-kpi-warning">
          <div className="tl-kpi-icon">
            <AlertTriangle size={22} />
          </div>
          <div>
            <div className="tl-kpi-value">{kpis.warningCount}</div>
            <div className="tl-kpi-label">Warning</div>
          </div>
        </div>

        <div className="tl-kpi-card tl-kpi-danger">
          <div className="tl-kpi-icon">
            <WifiOff size={22} />
          </div>
          <div>
            <div className="tl-kpi-value">{kpis.offlineCount}</div>
            <div className="tl-kpi-label">Offline</div>
          </div>
        </div>
      </div>

      <div className="tl-filter-bar">
        <div className="tl-search-wrap">
          <Search size={16} />
          <input
            className="tl-input"
            placeholder="Search by device, customer, or sensor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select className="tl-select" value={deviceFilter} onChange={(e) => setDeviceFilter(e.target.value)}>
          <option value="All">All Devices</option>
          {deviceOptions.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>

        <select className="tl-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="All">All Status</option>
          <option value="Online">Online</option>
          <option value="Warning">Warning</option>
          <option value="Offline">Offline</option>
        </select>
      </div>

      <div className="tl-table-card">
        {loading ? (
          <div className="tl-loading-state">Loading telemetry...</div>
        ) : error ? (
          <div className="tl-empty-state">{error}</div>
        ) : filtered.length === 0 ? (
          <div className="tl-empty-state">No sensor readings found for the selected filters.</div>
        ) : (
          <table className="tl-table">
            <thead>
              <tr>
                <th>Device</th>
                <th>Customer</th>
                <th>Sensor</th>
                <th>Value</th>
                <th>Status</th>
                <th>Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => {
                const Icon = SENSOR_ICONS[r.sensorType] || Activity;
                return (
                  <tr key={r.id}>
                    <td>{r.deviceName}</td>
                    <td>{r.customerName}</td>
                    <td>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                        <Icon size={14} /> {r.sensorType}
                      </span>
                    </td>
                    <td className="tl-mono tl-value-flash" key={`${r.id}-${r.value}`}>
                      {r.status === "Offline" ? "—" : `${r.value} ${r.unit}`}
                    </td>
                    <td>{statusBadge(r.status)}</td>
                    <td className="tl-timestamp">{timeAgo(r.updatedAt)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
