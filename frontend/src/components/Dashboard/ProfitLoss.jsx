import React, { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const TABS = [
  { key: "week", label: "This Week" },
  { key: "month", label: "This Month" },
  { key: "year", label: "This Year" },
];

const ROWS = {
  week: [
    { customer: "Apollo", loss: "2,340 kg", impact: "₹ 18,720", saved: "1,120 kg", costSaved: "₹ 8,960" },
    { customer: "CEAT", loss: "1,860 kg", impact: "₹ 14,880", saved: "980 kg", costSaved: "₹ 7,840" },
    { customer: "BKT", loss: "1,410 kg", impact: "₹ 11,280", saved: "740 kg", costSaved: "₹ 5,920" },
  ],
  month: [
    { customer: "Apollo", loss: "9,840 kg", impact: "₹ 78,720", saved: "4,860 kg", costSaved: "₹ 38,880" },
    { customer: "CEAT", loss: "7,920 kg", impact: "₹ 63,360", saved: "3,940 kg", costSaved: "₹ 31,520" },
    { customer: "BKT", loss: "5,610 kg", impact: "₹ 44,880", saved: "2,780 kg", costSaved: "₹ 22,240" },
  ],
  year: [
    { customer: "Apollo", loss: "1,18,080 kg", impact: "₹ 9,44,640", saved: "58,320 kg", costSaved: "₹ 4,66,560" },
    { customer: "CEAT", loss: "95,040 kg", impact: "₹ 7,60,320", saved: "47,280 kg", costSaved: "₹ 3,78,240" },
    { customer: "BKT", loss: "67,320 kg", impact: "₹ 5,38,560", saved: "33,360 kg", costSaved: "₹ 2,66,880" },
  ],
};

const TRAPS = [
  { name: "ST101", value: 40, color: "#16a34a" },
  { name: "ST102", value: 20, color: "#2563eb" },
  { name: "ST103", value: 25, color: "#f59e0b" },
  { name: "ST104", value: 15, color: "#dc2626" },
];

function exportToExcel(rows) {
  const header = ["Customer Name", "Steam Loss", "Cost Impact", "Steam Saved", "Cost Saved"];
  const lines = [header.join(",")].concat(
    rows.map((r) => [r.customer, r.loss, r.impact, r.saved, r.costSaved].join(","))
  );
  const csv = lines.join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "profit_loss_report.csv";
  link.click();
  URL.revokeObjectURL(url);
}

export default function ProfitLoss() {
  const [tab, setTab] = useState("week");
  const rows = ROWS[tab];

  return (
    <div>
      <div className="pl-header">
        <h3 className="widget-title" style={{ margin: 0 }}>Profit &amp; Loss Analytics</h3>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
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
          <button className="sg-btn sg-btn-export" onClick={() => exportToExcel(rows)}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 19h16" />
            </svg>
            Export Excel
          </button>
        </div>
      </div>

      <div className="pl-table-wrap">
        <table className="sg-table">
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Steam Loss</th>
              <th>Cost Impact</th>
              <th>Steam Saved</th>
              <th>Cost Saved</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.customer}>
                <td>{r.customer}</td>
                <td className="mono neg">{r.loss}</td>
                <td className="mono neg">{r.impact}</td>
                <td className="mono pos">{r.saved}</td>
                <td className="mono pos">{r.costSaved}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pl-charts-row">
        <div>
          <h4 className="pl-section-title">Top Problematic Traps</h4>
          <div style={{ width: "100%", height: 220 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={TRAPS}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={0}
                  outerRadius={85}
                  label={({ value }) => value}
                >
                  {TRAPS.map((t) => (
                    <Cell key={t.name} fill={t.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="pie-legend">
            {TRAPS.map((t) => (
              <span className="pie-legend-item" key={t.name}>
                <span className="pie-legend-swatch" style={{ background: t.color }} />
                {t.name}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h4 className="pl-section-title">Trap Problem Count</h4>
          <div className="problem-list">
            {TRAPS.map((t) => (
              <div className="problem-row" key={t.name}>
                <span className="problem-name">{t.name}</span>
                <div className="problem-bar-track">
                  <div
                    className="problem-bar-fill"
                    style={{ width: `${t.value}%`, background: t.color }}
                  />
                </div>
                <span className="problem-value" style={{ color: t.color }}>{t.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
