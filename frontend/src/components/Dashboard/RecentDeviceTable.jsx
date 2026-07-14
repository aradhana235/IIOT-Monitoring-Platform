import React from "react";

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

export default function RecentDeviceTable() {
  return (
    <div>
      <div className="table-header-row">
        <h3 className="widget-title" style={{ margin: 0 }}>Recent Devices</h3>
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
