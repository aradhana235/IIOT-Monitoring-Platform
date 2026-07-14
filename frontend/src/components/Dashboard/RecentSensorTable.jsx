import React from "react";

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

export default function RecentSensorTable() {
  return (
    <div>
      <div className="table-header-row">
        <h3 className="widget-title" style={{ margin: 0 }}>Recent Sensors</h3>
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
