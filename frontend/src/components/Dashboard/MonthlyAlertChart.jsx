import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const alertData = [
  { month: "Jan", critical: 12, warning: 25, info: 40 },
  { month: "Feb", critical: 18, warning: 32, info: 35 },
  { month: "Mar", critical: 8, warning: 20, info: 28 },
  { month: "Apr", critical: 22, warning: 38, info: 45 },
  { month: "May", critical: 15, warning: 30, info: 50 },
  { month: "Jun", critical: 10, warning: 18, info: 32 },
];

export default function MonthlyAlertChart() {

  const totalCritical = alertData.reduce(
    (sum, item) => sum + item.critical,
    0
  );

  const totalWarning = alertData.reduce(
    (sum, item) => sum + item.warning,
    0
  );

  const totalInfo = alertData.reduce(
    (sum, item) => sum + item.info,
    0
  );

  return (

    <div className="chart-card">

      <div className="chart-header">

        <div>

          <h3>Monthly Alerts</h3>

          <p>Alert trend analysis (2026)</p>

        </div>

        <span className="live-badge">

          ● LIVE

        </span>

      </div>

      <ResponsiveContainer
        width="100%"
        height={300}
      >

        <BarChart data={alertData}>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#e2e8f0"
          />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Legend />

          <Bar
            dataKey="critical"
            fill="#ef4444"
            radius={[6,6,0,0]}
          />

          <Bar
            dataKey="warning"
            fill="#f59e0b"
            radius={[6,6,0,0]}
          />

          <Bar
            dataKey="info"
            fill="#2563eb"
            radius={[6,6,0,0]}
          />

        </BarChart>

      </ResponsiveContainer>

      <div className="alert-summary">

        <div className="summary-box critical">

          <h4>{totalCritical}</h4>

          <p>Critical</p>

        </div>

        <div className="summary-box warning">

          <h4>{totalWarning}</h4>

          <p>Warning</p>

        </div>

        <div className="summary-box info">

          <h4>{totalInfo}</h4>

          <p>Info</p>

        </div>

      </div>

    </div>

  );

}