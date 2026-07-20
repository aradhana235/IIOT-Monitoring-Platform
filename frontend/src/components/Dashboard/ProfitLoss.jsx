import React, { useState } from "react";

const TABS = [
  { key: "week", label: "This Week" },
  { key: "month", label: "This Month" },
  { key: "year", label: "This Year" },
];

const ROWS = {
  week: [
    { customer: "Apollo", loss: "2,340 kg", impact: "₹ 18,720", saved: "1,120 kg", costSaved: "₹ 8,960" },
    
  ],
  month: [
    { customer: "Apollo", loss: "9,840 kg", impact: "₹ 78,720", saved: "4,860 kg", costSaved: "₹ 38,880" },
    
  ],
  year: [
    { customer: "Apollo", loss: "1,18,080 kg", impact: "₹ 9,44,640", saved: "58,320 kg", costSaved: "₹ 4,66,560" },
   
  ],
};

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

export default function ProfitLossTable() {
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
    </div>
  );
}