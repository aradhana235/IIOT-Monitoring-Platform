import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const TABS = [
  { key: "week", label: "This Week" },
  { key: "month", label: "This Month" },
  { key: "year", label: "This Year" },
];

const ROWS = {
  week: [
    { customer: "Apollo", loss: "2,340 kg", saved: "1,120 kg" },
    
  ],
  month: [
    { customer: "Apollo", loss: "9,840 kg", saved: "4,860 kg" },
    
  ],
  year: [
    { customer: "Apollo", loss: "1,18,080 kg", saved: "58,320 kg" },
    
  ],
};

function parseNum(str) {
  return parseInt(String(str).replace(/[^0-9]/g, ""), 10) || 0;
}

export default function SteamLossChart() {
  const [tab, setTab] = useState("week");
  const rows = ROWS[tab];

  const chartData = rows.map((r) => ({
    customer: r.customer,
    "Steam loss (kg)": parseNum(r.loss),
    "Steam saved (kg)": parseNum(r.saved),
  }));

  return (
    <div>
      <div className="pl-header">
        <h3 className="widget-title" style={{ margin: 0 }}>Steam Loss vs Saved by Customer</h3>
        <div className="pl-tabs">
          {TABS.map((t) => (
            <button
              key={t.key}
              className={`sg-btn sg-btn-tab ${tab === t.key ? "active" : ""}`}
              onClick={() => setTab(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ width: "100%", height: 240 }}>
        <ResponsiveContainer>
          <BarChart data={chartData} margin={{ top: 8, right: 12, left: -12, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
            <XAxis dataKey="customer" tick={{ fontSize: 12, fill: "#64748b" }} axisLine={{ stroke: "#e2e8f0" }} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} />
            <Tooltip />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar dataKey="Steam loss (kg)" fill="#dc2626" radius={[4, 4, 0, 0]} barSize={22} />
            <Bar dataKey="Steam saved (kg)" fill="#16a34a" radius={[4, 4, 0, 0]} barSize={22} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}