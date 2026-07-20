import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const TRAPS = [
  { name: "ST101", value: 40, color: "#16a34a" },
  { name: "ST102", value: 20, color: "#2563eb" },
  { name: "ST103", value: 25, color: "#f59e0b" },
  { name: "ST104", value: 15, color: "#dc2626" },
];

export default function TrapProblemStats() {
  return (
    <div>
      <h3 className="widget-title">Top Problematic Traps</h3>

      <div className="pl-charts-row">
        <div>
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