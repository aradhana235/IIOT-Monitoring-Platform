import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from "recharts";

const STATE_DATA = [
  { time: "10:00", inlet: 25, outlet: 18 },
  { time: "10:30", inlet: 30, outlet: 22 },
  { time: "11:00", inlet: 28, outlet: 20 },
  { time: "11:30", inlet: 36, outlet: 26 },
  { time: "12:00", inlet: 32, outlet: 24 },
  { time: "12:30", inlet: 39, outlet: 28 },
];

function ThermoIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="2">
      <path d="M14 14.76V4a2 2 0 0 0-4 0v10.76a4 4 0 1 0 4 0z" />
    </svg>
  );
}

function BarsIcon() {
  return (
    <span className="dd-icon-badge">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
        <path d="M4 20V10M12 20V4M20 20v-7" />
      </svg>
    </span>
  );
}

function Ring({ color, size = 56 }) {
  const r = (size - 8) / 2;
  const c = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth="4"
        strokeDasharray={c}
        strokeDashoffset={c * 0.15}
      />
    </svg>
  );
}

function TempCard({ label, value, lastUpdate }) {
  return (
    <div className="dd-card">
      <div className="dd-card-header">
        <ThermoIcon />
        <span className="dd-card-title">{label}</span>
      </div>
      <div className="dd-card-sub">Last update {lastUpdate} hour ago</div>
      <div className="dd-temp-value">{value}°C</div>
    </div>
  );
}

function MetricCard({ direction, label, ringColor, sub, value, prefix }) {
  return (
    <div className="dd-card dd-metric-card">
      <div className="dd-metric-label">
        <span className={`dd-arrow ${direction}`}>{direction === "up" ? "▲" : "▼"}</span>
        {label}
      </div>
      <Ring color={ringColor} />
      <div className="dd-card-sub" style={{ marginTop: 8 }}>{sub}</div>
      <div className="dd-metric-value">{prefix}{value}</div>
    </div>
  );
}

function RiskCard({ title, value, ringColor, big = false }) {
  return (
    <div className={`dd-card dd-risk-card ${big ? "dd-risk-card-tall" : ""}`}>
      <div className="dd-card-title-plain">{title}</div>
      <Ring color={ringColor} size={64} />
      <div className="dd-metric-value">₹ {value}</div>
    </div>
  );
}

export default function DeviceDetail({ device, onBack }) {
  return (
    <div className="device-detail">
      <div className="dd-breadcrumb">
        <button className="dd-back-btn" onClick={onBack}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Back to Dashboard
        </button>
        <span className="dd-breadcrumb-name">{device?.label || "Device"}</span>
      </div>

      <div className="device-detail-grid">
        {/* Left column */}
        <div className="dd-left-col">
          <div className="dd-row-2">
            <TempCard label="Inlet" value="0" lastUpdate="NaN" />
            <TempCard label="Outlet" value="0" lastUpdate="NaN" />
          </div>

          <div className="dd-card dd-sensor-status">
            <BarsIcon />
            <span>Sensor Status: <strong className="dd-status-normal">Normal</strong></span>
          </div>

          <div className="dd-card dd-alert-banner">
            🚨 ALERT : No Alert
          </div>

          <div className="dd-card dd-state-chart">
            <h3 className="widget-title" style={{ marginBottom: 2 }}>State chart</h3>
            <div className="dd-card-sub" style={{ marginBottom: 10 }}>Realtime - last 2 hours</div>
            <div style={{ width: "100%", height: 260 }}>
              <ResponsiveContainer>
                <LineChart data={STATE_DATA} margin={{ top: 8, right: 12, left: -12, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="time" tick={{ fontSize: 12, fill: "#64748b" }} axisLine={{ stroke: "#e2e8f0" }} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Line type="monotone" dataKey="inlet" stroke="#16a34a" strokeWidth={2.5} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="outlet" stroke="#dc2626" strokeWidth={2.5} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="dd-right-col">
          <div className="dd-row-2">
            <MetricCard direction="up" label="Steam Save" ringColor="#16a34a" sub="Steam save (kg)" value="800" />
            <MetricCard direction="up" label="Cost Save" ringColor="#16a34a" sub="Cost save prevented" value="84000" prefix="₹ " />
          </div>

          <div className="dd-row-2">
            <MetricCard direction="down" label="Steam Loss" ringColor="#dc2626" sub="duration steam loss kg" value="1200" />
            <MetricCard direction="down" label="Cost Loss" ringColor="#dc2626" sub="duration cost loss" value="250000" prefix="₹ " />
          </div>

          <RiskCard title="Daily Steam Cost Risk (₹)" value="3200" ringColor="#dc2626" />
          <RiskCard title="90-Day Forecasted Steam" value="1500000" ringColor="#dc2626" />
        </div>
      </div>
    </div>
  );
}
