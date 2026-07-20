import React, { useEffect, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";
import { getMonthlyAlertTrend } from "../../api/alertTrendService";

const CUSTOMER_ID = "11111111-1111-1111-1111-111111111111"; // abhi hardcoded

export default function MonthlyAlertChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrend = async () => {
      try {
        setLoading(true);
        const currentYear = new Date().getFullYear();
        const result = await getMonthlyAlertTrend(CUSTOMER_ID, currentYear);
        setData(result);
      } catch (err) {
        setError("Couldn't load alert trend.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrend();
  }, []);

  return (
    <div>
      <h3 className="widget-title">Monthly Alert Trend</h3>

      {error && <p style={{ color: "#dc2626", fontSize: 13 }}>{error}</p>}
      {!error && !loading && data.length === 0 && (
        <p style={{ color: "#64748b", fontSize: 13 }}>No alert trend data available.</p>
      )}

      <div style={{ width: "100%", height: 240 }}>
        <ResponsiveContainer>
          <AreaChart data={data} margin={{ top: 8, right: 12, left: -12, bottom: 0 }}>
            <defs>
              <linearGradient id="alertGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7c3aed" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#7c3aed" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#64748b" }} axisLine={{ stroke: "#e2e8f0" }} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} />
            <Tooltip />
            <Area type="monotone" dataKey="alerts" stroke="#7c3aed" strokeWidth={2.5} fill="url(#alertGradient)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}