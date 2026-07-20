import React, { useState, useEffect, useCallback } from "react";
import { getPlantHealthScore } from "../../api/plantHealthService";

const CUSTOMER_ID = "11111111-1111-1111-1111-111111111111";

function getScoreColor(score) {
  if (score >= 80) return "#639922";
  if (score >= 50) return "#BA7517";
  return "#E24B4A";
}

export default function SensorStatusChart() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchScore = useCallback(async (date) => {
    try {
      setLoading(true);
      setError(null);
      const result = await getPlantHealthScore(CUSTOMER_ID, date);
      setScore(result);
    } catch (err) {
      setError("Couldn't load health score.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchScore(selectedDate);
  }, [selectedDate, fetchScore]);

  const color = score !== null ? getScoreColor(score) : "#94a3b8";
  const circumference = 2 * Math.PI * 90;
  const arcLength = circumference * 0.75;
  const filledLength = score !== null ? (arcLength * score) / 100 : 0;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "24px 0" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", marginBottom: 8 }}>
        <h3 className="widget-title" style={{ margin: 0 }}>
          Plant Health Score
        </h3>
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
      </div>

      {loading && <p style={{ color: "#64748b", fontSize: 13 }}>Loading...</p>}
      {error && <p style={{ color: "#dc2626", fontSize: 13 }}>{error}</p>}

      {!loading && !error && (
        <svg width="280" height="160" viewBox="0 0 280 160">
          <path
            d="M 30 140 A 110 110 0 0 1 250 140"
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="18"
            strokeLinecap="round"
          />
          <path
            d="M 30 140 A 110 110 0 0 1 250 140"
            fill="none"
            stroke={color}
            strokeWidth="18"
            strokeLinecap="round"
            strokeDasharray={`${filledLength} ${circumference}`}
          />
          <text x="140" y="105" textAnchor="middle" fontSize="42" fontWeight="600" fill="#1e293b">
            {score}
          </text>
          <text x="140" y="130" textAnchor="middle" fontSize="13" fill="#64748b">
            out of 100
          </text>
        </svg>
      )}
    </div>
  );
}