import React from "react";

const ALERTS = [
  { time: "22/05 09:14", device: "Row 11 Behind Press 9293 HP/1051", customer: "Apollo", severity: "Critical" },
  { time: "21/05 17:02", device: "Curing mexanine Behind Panel/1050", customer: "Apollo", severity: "Warning" },
  { time: "21/05 11:40", device: "Row 14 Behine Press 9362 HP/1053", customer: "Apollo", severity: "Warning" },
  { time: "20/05 08:55", device: "Mould shop Area/1047", customer: "Apollo", severity: "Critical" },
];

const badgeClass = {
  Critical: "sg-badge-red",
  Warning: "sg-badge-orange",
  Info: "sg-badge-blue",
};

export default function RecentAlertTable() {
  return (
    <div>
      <div className="table-header-row">
        <h3 className="widget-title" style={{ margin: 0 }}>Recent Alerts</h3>
      </div>
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
            {ALERTS.map((a, i) => (
              <tr key={i}>
                <td className="mono">{a.time}</td>
                <td>{a.device}</td>
                <td>{a.customer}</td>
                <td>
                  <span className={`sg-badge ${badgeClass[a.severity]}`}>{a.severity}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
