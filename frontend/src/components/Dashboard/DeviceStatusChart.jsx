import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const DATA = [
  { name: "Blocked", value: 1, color: "#2563eb" },
  { name: "Full Leak", value: 0, color: "#dc2626" },
  { name: "Normal", value: 29, color: "#16a34a" },
  { name: "Partial Leak", value: 1, color: "#f59e0b" },
];

export default function DeviceStatusChart() {
  return (
    <div>
      <h3 className="widget-title">Device Status</h3>
      <div style={{ width: "100%", height: 200 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={DATA}
              dataKey="value"
              nameKey="name"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={2}
            >
              {DATA.map((d) => (
                <Cell key={d.name} fill={d.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="chart-legend-row">
        {DATA.map((d) => (
          <span className="chart-legend-item" key={d.name}>
            <span className="chart-legend-swatch" style={{ background: d.color }} />
            {d.name}
          </span>
        ))}
      </div>
    </div>
  );
}
