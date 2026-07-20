import React, { useState } from "react";

const DEVICES = [
  { name: "MCB TCP 903 RHS Platen trap/1055", customer: "Apollo", status: "Normal" },
  { name: "Row 13 Extension b/h TCP 9399/1056", customer: "Apollo", status: "Normal" },
  { name: "Mould shop Area/1047", customer: "Apollo", status: "Blocked" },
  { name: "MCB TCP 903 LHS Platen Trap/1043", customer: "Apollo", status: "Normal" },
  { name: "Row 12 Behind Press 9295 HP/1042", customer: "Apollo", status: "Partial Leak" },
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

export default function RecentDeviceTable() {
  const defaults = getDefaultDates();
  const [from, setFrom] = useState(defaults.from);
  const [to, setTo] = useState(defaults.to);

  return (
    <div>
      <div className="table-header-row">
        <h3 className="widget-title" style={{ margin: 0 }}>Recent Devices</h3>
      </div>

      <div className="telemetry-controls" style={{ margin: "12px 0 16px" }}>
        <div className="telemetry-field">
          <label htmlFor="device-from">From</label>
          <input
            id="device-from"
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
        </div>
        <div className="telemetry-field">
          <label htmlFor="device-to">To</label>
          <input
            id="device-to"
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
              <th>Device / Trap</th>
              <th>Customer</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {DEVICES.map((d) => (
              <tr key={d.name}>
                <td>{d.name}</td>
                <td>{d.customer}</td>
                <td>
                  <span className={`sg-badge ${badgeClass[d.status]}`}>{d.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}