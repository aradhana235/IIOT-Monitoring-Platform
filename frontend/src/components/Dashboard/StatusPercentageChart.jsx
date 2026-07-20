import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
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
import { getSensorStatusCounts } from "../../api/statusPercentageService";

const CUSTOMER_ID = "11111111-1111-1111-1111-111111111111";

const STATUS_ORDER = [
  { key: "normal", label: "Normal", color: "#22c55e" },
  { key: "partial", label: "Partial Leak", color: "#f59e0b" },
  { key: "blocked", label: "Blocked", color: "#3b82f6" },
  { key: "fullLeak", label: "Full Leak", color: "#ef4444" },
];

const DROPDOWN_OPTIONS = [
  { key: "all", label: "All", color: "#94a3b8" },
  ...STATUS_ORDER,
];

function Dropdown({ label, options, selected, onSelect }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((o) => o.key === selected);

  return (
    <div ref={ref} style={{ position: "relative", display: "inline-block" }}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        style={{
          padding: "6px 12px",
          fontSize: 12.5,
          fontWeight: 500,
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: 7,
          cursor: "pointer",
          color: "#475569",
          display: "flex",
          alignItems: "center",
          gap: 8,
          boxShadow: open ? "0 0 0 3px rgba(59,130,246,0.12)" : "none",
          borderColor: open ? "#93c5fd" : "#e2e8f0",
        }}
      >
        <span style={{ color: "#94a3b8", fontWeight: 600, fontSize: 11, textTransform: "uppercase", letterSpacing: 0.3 }}>
          {label}
        </span>
        <span
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: selectedOption?.color,
            flexShrink: 0,
          }}
        />
        <span style={{ color: "#1e293b", fontWeight: 600 }}>{selectedOption?.label}</span>
        <span style={{ fontSize: 9, color: "#94a3b8", marginLeft: 2 }}>▼</span>
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            right: 0,
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: 8,
            boxShadow: "0 8px 24px rgba(15,23,42,0.10)",
            zIndex: 20,
            minWidth: 160,
            padding: "4px",
          }}
        >
          {options.map((opt) => (
            <label
              key={opt.key}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "7px 10px",
                fontSize: 12.5,
                fontWeight: 500,
                cursor: "pointer",
                color: selected === opt.key ? "#1e293b" : "#64748b",
                borderRadius: 5,
                background: selected === opt.key ? "#f1f5f9" : "transparent",
              }}
            >
              <input
                type="radio"
                name={label}
                checked={selected === opt.key}
                onChange={() => {
                  onSelect(opt.key);
                  setOpen(false);
                }}
                style={{ width: 13, height: 13, accentColor: opt.color, margin: 0, cursor: "pointer" }}
              />
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: opt.color,
                  flexShrink: 0,
                }}
              />
              {opt.label}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export default function SensorStatusStackedChart() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [minStatus, setMinStatus] = useState("all");
  const [maxStatus, setMaxStatus] = useState("all");
  const [rawData, setRawData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (date) => {
    try {
      setLoading(true);
      setError(null);
      const result = await getSensorStatusCounts(CUSTOMER_ID, date);
      setRawData(result);
    } catch (err) {
      setError("Couldn't load sensor status data.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(selectedDate);
  }, [selectedDate, fetchData]);

  const minIndex = minStatus === "all" ? 0 : STATUS_ORDER.findIndex((s) => s.key === minStatus);
  const maxIndex = maxStatus === "all" ? STATUS_ORDER.length - 1 : STATUS_ORDER.findIndex((s) => s.key === maxStatus);

  const lowIndex = Math.min(minIndex, maxIndex);
  const highIndex = Math.max(minIndex, maxIndex);
  const activeStatuses = STATUS_ORDER.slice(lowIndex, highIndex + 1);

  const chartData = useMemo(() => {
    return rawData.map((row) => {
      const subsetTotal = activeStatuses.reduce((sum, s) => sum + row[s.key], 0);
      const newRow = { sensor: row.sensor };
      activeStatuses.forEach((s) => {
        newRow[s.key] = subsetTotal === 0 ? 0 : Number(((row[s.key] / subsetTotal) * 100).toFixed(1));
      });
      return newRow;
    });
  }, [activeStatuses, rawData]);

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14, flexWrap: "wrap", gap: 10 }}>
        <h3 className="widget-title" style={{ margin: 0 }}>
          Sensor-wise Status Distribution
        </h3>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            style={{
              padding: "6px 10px",
              fontSize: 12.5,
              border: "1px solid #e2e8f0",
              borderRadius: 7,
              color: "#334155",
            }}
          />
          <Dropdown label="Min" options={DROPDOWN_OPTIONS} selected={minStatus} onSelect={setMinStatus} />
          <Dropdown label="Max" options={DROPDOWN_OPTIONS} selected={maxStatus} onSelect={setMaxStatus} />
        </div>
      </div>

      {error && <p style={{ color: "#dc2626", fontSize: 13 }}>{error}</p>}
      {loading && <p style={{ color: "#64748b", fontSize: 13 }}>Loading...</p>}

      {!loading && !error && (
        <div style={{ width: "100%", height: 220, display: "flex", justifyContent: "center" }}>
          <ResponsiveContainer width="70%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 4, right: 4, left: 0, bottom: 0 }}
              barCategoryGap="8%"
              barGap={0}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis
                dataKey="sensor"
                tick={{ fontSize: 11.5, fill: "#94a3b8" }}
                axisLine={{ stroke: "#f1f5f9" }}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
                domain={[0, 100]}
                ticks={[0, 25, 50, 75, 100]}
                tickFormatter={(v) => `${v}%`}
                width={42}
              />
              <Tooltip
                formatter={(value) => `${value}%`}
                contentStyle={{
                  fontSize: 12,
                  borderRadius: 8,
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                }}
              />
              <Legend
                wrapperStyle={{ fontSize: 11.5, paddingTop: 8 }}
                iconType="circle"
                iconSize={8}
              />
              {activeStatuses.map((s, idx) => (
                <Bar
                  key={s.key}
                  dataKey={s.key}
                  name={s.label}
                  stackId="a"
                  fill={s.color}
                  radius={idx === activeStatuses.length - 1 ? [3, 3, 0, 0] : undefined}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}