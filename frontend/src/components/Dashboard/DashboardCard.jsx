import React from "react";

const RADIUS = 34;
const CIRC = 2 * Math.PI * RADIUS;

function StatRing({ value, max, color }) {
  const pct = max > 0 ? Math.min(value / max, 1) : 0;
  const offset = CIRC - pct * CIRC;

  return (
    <div className="stat-ring-wrap">
      <svg viewBox="0 0 80 80">
        <circle
          className="stat-ring-track"
          cx="40"
          cy="40"
          r={RADIUS}
        />

        <circle
          className="stat-ring-value-path"
          cx="40"
          cy="40"
          r={RADIUS}
          stroke={color}
          strokeDasharray={CIRC}
          strokeDashoffset={offset}
        />
      </svg>

      <div
        className="stat-ring-number"
        style={{ color }}
      >
        {value}
      </div>
    </div>
  );
}

export default function DashboardCard({ stats }) {

  const data = stats || {
    total: 31,
    normal: 25,
    blocked: 2,
    partial: 1,
    fullLeak: 3,
  };

  const cards = [
    { label: "TOTAL", value: data.total, color: "#c026d3" },
    { label: "NORMAL", value: data.normal, color: "#16a34a" },
    { label: "BLOCKED", value: data.blocked, color: "#2563eb" },
    { label: "PARTIAL", value: data.partial, color: "#f59e0b" },
    { label: "FULL LEAK", value: data.fullLeak, color: "#dc2626" },
  ];

  return (
    <>
      {/* Banner */}

      <div className="dashboard-banner">
        <div className="banner-content">

          <div>
            <h1>Real Time Device Status</h1>
            <p>Steam Monitoring System</p>
          </div>

          <div className="live-badge">
            <span className="live-dot"></span>
            LIVE
          </div>

        </div>
      </div>

      {/* Cards */}

      <div className="stat-cards-grid">
        {cards.map((c) => (
          <div
            className="stat-card"
            key={c.label}
          >
            <span className="stat-card-label">
              {c.label}
            </span>

            <StatRing
              value={c.value}
              max={data.total || 1}
              color={c.color}
            />
          </div>
        ))}
      </div>
    </>
  );
}