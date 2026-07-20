import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { getStatusCountsRange } from "../../api/statusCountService";

const CUSTOMER_ID = "11111111-1111-1111-1111-111111111111"; // abhi hardcoded, baad me context/props se aayega

function formatLabel(isoDate) {
  const [, m, d] = isoDate.split("-");
  return `${d}/${m}`;
}

export default function TelemetryChart() {
  const [from, setFrom] = useState("2026-07-13");
  const [to, setTo] = useState("2026-07-15");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadData = async (rangeFrom, rangeTo) => {
    if (rangeFrom > rangeTo) {
      setError("'From' date must be before 'To' date.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const result = await getStatusCountsRange(CUSTOMER_ID, rangeFrom, rangeTo);
      setData(result);
    } catch (err) {
      setError("Couldn't load telemetry. Try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleShowChart = () => loadData(from, to);
  const handleRefresh = () => loadData(from, to);

  const chartData = data.map((d) => ({ ...d, date: formatLabel(d.date) }));

  return (
    <div>
      <h3 className="widget-title">Telemetry Trend</h3>

      <div className="telemetry-controls">
        <div className="telemetry-field">
          <label htmlFor="telemetry-from">From</label>
          <input
            id="telemetry-from"
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
        </div>
        <div className="telemetry-field">
          <label htmlFor="telemetry-to">To</label>
          <input
            id="telemetry-to"
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </div>
        <button className="sg-btn sg-btn-primary" onClick={handleShowChart} disabled={loading}>
          {loading ? "Loading..." : "Show Chart"}
        </button>
        <button className="sg-btn sg-btn-refresh" onClick={handleRefresh} disabled={loading}>
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            style={{ animation: loading ? "sg-spin 0.8s linear infinite" : "none" }}
          >
            <path d="M21 12a9 9 0 1 1-3-6.7M21 4v5h-5" />
          </svg>
          Refresh
        </button>
      </div>

      {error && <p style={{ color: "#dc2626", fontSize: 13, margin: "0 0 8px" }}>{error}</p>}

      {!error && chartData.length === 0 && !loading && (
        <p style={{ color: "#64748b", fontSize: 13, margin: "0 0 8px" }}>
          No telemetry data in this date range.
        </p>
      )}

      <div style={{ width: "100%", height: 280 }}>
        <ResponsiveContainer>
          <BarChart data={chartData} margin={{ top: 8, right: 12, left: -12, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
            <XAxis dataKey="date" tick={{ fontSize: 12, fill: "#64748b" }} axisLine={{ stroke: "#e2e8f0" }} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} />
            <Tooltip />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar dataKey="blocked" fill="#2563eb" radius={[4, 4, 0, 0]} barSize={16} />
            <Bar dataKey="leak" fill="#dc2626" radius={[4, 4, 0, 0]} barSize={16} />
            <Bar dataKey="normal" fill="#16a34a" radius={[4, 4, 0, 0]} barSize={16} />
            <Bar dataKey="partial" fill="#f59e0b" radius={[4, 4, 0, 0]} barSize={16} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <style>{`
        @keyframes sg-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}