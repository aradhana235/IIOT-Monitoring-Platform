import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

const telemetryData = [
  {
    time: "10 AM",
    temperature: 82,
    pressure: 28,
  },
  {
    time: "11 AM",
    temperature: 90,
    pressure: 31,
  },
  {
    time: "12 PM",
    temperature: 102,
    pressure: 35,
  },
  {
    time: "1 PM",
    temperature: 118,
    pressure: 37,
  },
  {
    time: "2 PM",
    temperature: 110,
    pressure: 34,
  },
  {
    time: "3 PM",
    temperature: 125,
    pressure: 39,
  },
  {
    time: "4 PM",
    temperature: 132,
    pressure: 42,
  },
  {
    time: "5 PM",
    temperature: 128,
    pressure: 40,
  },
];

export default function TelemetryChart() {

  return (

    <div className="chart-card">

      <div className="chart-header">

        <h3>Telemetry Overview</h3>

        <span>Today</span>

      </div>

      <ResponsiveContainer
        width="100%"
        height={320}
      >

        <LineChart data={telemetryData}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="time" />

          <YAxis />

          <Tooltip />

          <Legend />

          <Line
            type="monotone"
            dataKey="temperature"
            stroke="#2563eb"
            strokeWidth={3}
            name="Temperature (°C)"
          />

          <Line
            type="monotone"
            dataKey="pressure"
            stroke="#16a34a"
            strokeWidth={3}
            name="Pressure (Bar)"
          />

        </LineChart>

      </ResponsiveContainer>

    </div>

  );

}