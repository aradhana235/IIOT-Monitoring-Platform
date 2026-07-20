import React, { useState } from "react";

const SENSORS = [
  { id: "ST101", type: "Temperature", customer: "Apollo", value: "142°C", status: "Normal" },
  { id: "ST102", type: "Pressure", customer: "CEAT", value: "6.2 bar", status: "Normal" },
  { id: "ST103", type: "Vibration", customer: "BKT", value: "3.8 mm/s", status: "Partial Leak" },
  { id: "ST104", type: "Acoustic", customer: "Alkem", value: "84 dB", status: "Blocked" },
];

const badgeClass = {
  Normal: "sg-badge-green",
  Blocked: "sg-badge-blue",
  "Partial Leak": "sg-badge-orange",
  "Full Leak": "sg-badge-red",
};

function getDefaultDates() {
  const today = new Date();
  const weekAgo = new Date();
  weekAgo.setDate(today.getDate() - 6);

  return {
    from: weekAgo.toISOString().split("T")[0],
    to: today.toISOString().split("T")[0],
  };
}

export default function RecentSensorTable() {
  const defaults = getDefaultDates();
  const [from, setFrom] = useState(defaults.from);
  const [to, setTo] = useState(defaults.to);

  return (
    <div>
      <div className="table-header-row">
        <h3 className="widget-title" style={{ margin: 0 }}>Recent Sensors</h3>
      </div>

      <div className="telemetry-controls" style={{ margin: "12px 0 16px" }}>
        <div className="telemetry-field">
          <label htmlFor="sensor-from">From</label>
          <input
            id="sensor-from"
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
        </div>
        <div className="telemetry-field">
          <label htmlFor="sensor-to">To</label>
          <input
            id="sensor-to"
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </div>
        <button className="sg-btn sg-btn-primary">
          Show
        </button>
      </div>

      <div className="pl-table-wrap">
        <table className="sg-table">
          <thead>
            <tr>
              <th>Sensor ID</th>
              <th>Type</th>
              <th>Customer</th>
              <th>Reading</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {SENSORS.map((s) => (
              <tr key={s.id}>
                <td className="mono">{s.id}</td>
                <td>{s.type}</td>
                <td>{s.customer}</td>
                <td className="mono">{s.value}</td>
                <td>
                  <span className={`sg-badge ${badgeClass[s.status]}`}>{s.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}