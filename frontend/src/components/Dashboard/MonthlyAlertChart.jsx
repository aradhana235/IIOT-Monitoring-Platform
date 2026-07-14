import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";

const DATA = [
  { month: "Feb", alerts: 18 },
  { month: "Mar", alerts: 26 },
  { month: "Apr", alerts: 21 },
  { month: "May", alerts: 34 },
  { month: "Jun", alerts: 24 },
  { month: "Jul", alerts: 15 },
];

export default function MonthlyAlertChart() {
  return (
    <div>
      <h3 className="widget-title">Monthly Alert Trend</h3>
      <div style={{ width: "100%", height: 240 }}>
        <ResponsiveContainer>
          <AreaChart data={DATA} margin={{ top: 8, right: 12, left: -12, bottom: 0 }}>
            <defs>
              <linearGradient id="alertGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7c3aed" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#7c3aed" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#64748b" }} axisLine={{ stroke: "#e2e8f0" }} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} />
            <Tooltip />
            <Area type="monotone" dataKey="alerts" stroke="#7c3aed" strokeWidth={2.5} fill="url(#alertGradient)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
