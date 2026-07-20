import React, { useEffect, useState, useCallback } from "react";
import { getAlertsForDateRange } from "../../api/alertService";

const CUSTOMER_ID = "11111111-1111-1111-1111-111111111111";

const badgeClass = {
  CRITICAL: "sg-badge-red",
  WARNING: "sg-badge-orange",
  INFO: "sg-badge-blue",
};

function formatTime(isoString) {
  const d = new Date(isoString);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");
  return `${day}/${month} ${hours}:${minutes}`;
}

function getDefaultDates() {
  const today = new Date();
  const weekAgo = new Date();
  weekAgo.setDate(today.getDate() - 6);

  return {
    from: weekAgo.toISOString().split("T")[0],
    to: today.toISOString().split("T")[0],
  };
}

export default function RecentAlertTable() {
  const defaults = getDefaultDates();
  const [from, setFrom] = useState(defaults.from);
  const [to, setTo] = useState(defaults.to);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadAlerts = useCallback(async (rangeFrom, rangeTo) => {
    if (rangeFrom > rangeTo) {
      setError("'From' date must be before 'To' date.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const data = await getAlertsForDateRange(CUSTOMER_ID, rangeFrom, rangeTo);
      setAlerts(data);
    } catch (err) {
      setError("Couldn't load alerts.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAlerts(from, to);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleShow = () => loadAlerts(from, to);

  return (
    <div>
      <div className="table-header-row">
        <h3 className="widget-title" style={{ margin: 0 }}>Recent Alerts</h3>
      </div>

      <div className="telemetry-controls" style={{ margin: "12px 0 16px" }}>
        <div className="telemetry-field">
          <label htmlFor="alert-from">From</label>
          <input
            id="alert-from"
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
        </div>
        <div className="telemetry-field">
          <label htmlFor="alert-to">To</label>
          <input
            id="alert-to"
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </div>
        <button className="sg-btn sg-btn-primary" onClick={handleShow} disabled={loading}>
          {loading ? "Loading..." : "Show"}
        </button>
      </div>

      {error && <p style={{ color: "#dc2626", fontSize: 13 }}>{error}</p>}
      {!error && !loading && alerts.length === 0 && (
        <p style={{ color: "#64748b", fontSize: 13 }}>No alerts in this date range.</p>
      )}

      <div className="pl-table-wrap">
        <table className="sg-table">
          <thead>
            <tr>
              <th>Time</th>
              <th>Device / Trap</th>
              <th>Customer</th>
              <th>Severity</th>
            </tr>
          </thead>
          <tbody>
            {alerts.map((a, i) => (
              <tr key={i}>
                <td className="mono">{formatTime(a.key.ts)}</td>
                <td>{a.deviceName}</td>
                <td>Apollo</td>
                <td>
                  <span className={`sg-badge ${badgeClass[a.severity] || "sg-badge-blue"}`}>
                    {a.severity}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}