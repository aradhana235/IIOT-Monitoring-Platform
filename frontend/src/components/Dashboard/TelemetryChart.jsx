import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from "recharts";

const DEFAULT_DATA = [
  { date: "19/05", blocked: 17, leak: 0, normal: 3, partial: 3 },
  { date: "20/05", blocked: 12, leak: 0, normal: 5, partial: 8 },
  { date: "21/05", blocked: 11, leak: 1, normal: 5, partial: 8 },
  { date: "22/05", blocked: 11, leak: 1, normal: 5, partial: 8 },
];

export default function TelemetryChart() {
  const [from, setFrom] = useState("2026-05-19");
  const [to, setTo] = useState("2026-05-22");
  const [data, setData] = useState(DEFAULT_DATA);

  const handleShowChart = () => {
    // Placeholder: wire this up to the real telemetry API using `from` / `to`
    setData(DEFAULT_DATA);
  };

  const handleRefresh = () => {
    setData(DEFAULT_DATA);
  };

  return (
    <div>
      <h3 className="widget-title">Telemetry Trend</h3>

      <div className="telemetry-controls">
        <div className="telemetry-field">
          <label>From</label>
          <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
        </div>
        <div className="telemetry-field">
          <label>To</label>
          <input type="date" value={to} onChange={(e) => setTo(e.target.value)} />
        </div>
        <button className="sg-btn sg-btn-primary" onClick={handleShowChart}>Show Chart</button>
        <button className="sg-btn sg-btn-refresh" onClick={handleRefresh}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M21 12a9 9 0 1 1-3-6.7M21 4v5h-5" />
          </svg>
          Refresh
        </button>
      </div>

      <div style={{ width: "100%", height: 280 }}>
        <ResponsiveContainer>
          <BarChart data={data} margin={{ top: 8, right: 12, left: -12, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
            <XAxis dataKey="date" tick={{ fontSize: 12, fill: "#64748b" }} axisLine={{ stroke: "#e2e8f0" }} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} />
            <Tooltip />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar dataKey="blocked" fill="#2563eb" radius={[4, 4, 0, 0]} barSize={16} />
            <Bar dataKey="leak" fill="#dc2626" radius={[4, 4, 0, 0]} barSize={16} />
            <Bar dataKey="normal" fill="#16a34a" radius={[4, 4, 0, 0]} barSize={16} />
            <Bar dataKey="partial" fill="#f59e0b" radius={[4, 4, 0, 0]} barSize={16} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
