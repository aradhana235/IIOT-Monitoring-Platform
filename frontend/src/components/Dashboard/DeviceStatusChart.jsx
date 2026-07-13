import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

import {
  Wifi,
  WifiOff,
  Wrench,
} from "lucide-react";

const data = [
  {
    name: "Online",
    value: 119,
  },
  {
    name: "Offline",
    value: 7,
  },
  {
    name: "Maintenance",
    value: 5,
  },
];

const COLORS = [
  "#22c55e",
  "#ef4444",
  "#f59e0b",
];

export default function DeviceStatusChart() {

  const total = data.reduce(
    (sum, item) => sum + item.value,
    0
  );

  return (

    <div className="chart-card">

      <div className="chart-header">

        <div>

          <h3>Device Status</h3>

          <p>Real-time monitoring</p>

        </div>

        <span className="live-badge">
          ● LIVE
        </span>

      </div>

      <ResponsiveContainer
        width="100%"
        height={300}
      >

        <PieChart>

          <Pie
            data={data}
            innerRadius={70}
            outerRadius={100}
            dataKey="value"
            paddingAngle={4}
          >

            {
              data.map((entry,index)=>(

                <Cell
                  key={index}
                  fill={COLORS[index]}
                />

              ))
            }

          </Pie>

          <Tooltip />

          <Legend verticalAlign="bottom"/>

        </PieChart>

      </ResponsiveContainer>

      <div className="device-total">

        Total Devices

        <strong>{total}</strong>

      </div>

      <div className="device-summary">

        <div className="summary-card">

          <Wifi
            size={20}
            color="#22c55e"
          />

          <div>

            <h4>Online</h4>

            <p>119</p>

          </div>

        </div>

        <div className="summary-card">

          <WifiOff
            size={20}
            color="#ef4444"
          />

          <div>

            <h4>Offline</h4>

            <p>7</p>

          </div>

        </div>

        <div className="summary-card">

          <Wrench
            size={20}
            color="#f59e0b"
          />

          <div>

            <h4>Maintenance</h4>

            <p>5</p>

          </div>

        </div>

      </div>

    </div>

  );

}