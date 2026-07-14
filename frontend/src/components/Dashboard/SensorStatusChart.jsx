import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";

const DATA = [
  { name: "Devices", total: 31, alerts: 0 },
  { name: "Leaks", total: 0, alerts: 24 },
];

export default function SensorStatusChart() {
  return (
    <div>
      <h3 className="widget-title">Devices vs Leaks</h3>
      <div style={{ width: "100%", height: 200 }}>
        <ResponsiveContainer>
          <BarChart data={DATA} margin={{ top: 8, right: 12, left: -12, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#64748b" }} axisLine={{ stroke: "#e2e8f0" }} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} />
            <Tooltip />
            <Bar dataKey="alerts" fill="#16a34a" radius={[4, 4, 0, 0]} barSize={28} />
            <Bar dataKey="total" fill="#2563eb" radius={[4, 4, 0, 0]} barSize={28} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="chart-legend-row">
        <span className="chart-legend-item">
          <span className="chart-legend-swatch" style={{ background: "#16a34a" }} />
          alerts
        </span>
        <span className="chart-legend-item">
          <span className="chart-legend-swatch" style={{ background: "#2563eb" }} />
          total
        </span>
      </div>
    </div>
  );
}
