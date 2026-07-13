import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Search,
  Eye,
  Pencil,
  Trash2,
  Thermometer,
} from "lucide-react";

import "../styles/Sensor.css";

export default function SensorList() {
  const navigate = useNavigate();

  const [sensors, setSensors] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadSensors();
  }, []);

  const loadSensors = () => {
    setSensors([
      {
        id: "TS-1001",
        name: "Temperature Sensor",
        type: "Temperature",
        device: "Steam Trap 01",
        unit: "°C",
        status: "ACTIVE",
        reading: "124.8 °C",
      },
      {
        id: "PS-1002",
        name: "Pressure Sensor",
        type: "Pressure",
        device: "Boiler 01",
        unit: "Bar",
        status: "ACTIVE",
        reading: "8.2 Bar",
      },
      {
        id: "FS-1003",
        name: "Flow Sensor",
        type: "Flow",
        device: "Water Meter 01",
        unit: "L/min",
        status: "INACTIVE",
        reading: "0",
      },
    ]);
  };

  const filteredSensors = sensors.filter(
    (sensor) =>
      sensor.name.toLowerCase().includes(search.toLowerCase()) ||
      sensor.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="device-page">
      <div className="page-header">
        <div>
          <h2>Sensor Management</h2>
          <p>Manage Industrial IoT Sensors</p>
        </div>

        <button
          className="add-btn"
          onClick={() => navigate("/sensors/add")}
        >
          <Plus size={18} />
          Add Sensor
        </button>
      </div>

      <div className="top-bar">
        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search Sensor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="summary-cards">
        <div className="summary-card">
          <h2>{sensors.length}</h2>
          <span>Total Sensors</span>
        </div>

        <div className="summary-card green">
          <h2>
            {sensors.filter((s) => s.status === "ACTIVE").length}
          </h2>
          <span>Active</span>
        </div>

        <div className="summary-card red">
          <h2>
            {sensors.filter((s) => s.status === "INACTIVE").length}
          </h2>
          <span>Inactive</span>
        </div>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Sensor ID</th>
              <th>Name</th>
              <th>Type</th>
              <th>Device</th>
              <th>Unit</th>
              <th>Status</th>
              <th>Reading</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredSensors.length === 0 ? (
              <tr>
                <td colSpan="8">
                  <div className="empty-state">
                    <Thermometer size={60} />
                    <h3>No Sensor Found</h3>
                  </div>
                </td>
              </tr>
            ) : (
              filteredSensors.map((sensor) => (
                <tr key={sensor.id}>
                  <td>{sensor.id}</td>
                  <td>{sensor.name}</td>
                  <td>{sensor.type}</td>
                  <td>{sensor.device}</td>
                  <td>{sensor.unit}</td>

                  <td>
                    <span
                      className={
                        sensor.status === "ACTIVE"
                          ? "active-badge"
                          : "inactive-badge"
                      }
                    >
                      {sensor.status}
                    </span>
                  </td>

                  <td>{sensor.reading}</td>

                  <td>
                    <div className="action-btns">
                      <button
                        onClick={() =>
                          navigate(`/sensors/view/${sensor.id}`)
                        }
                      >
                        <Eye size={18} />
                      </button>

                      <button
                        onClick={() =>
                          navigate(`/sensors/edit/${sensor.id}`)
                        }
                      >
                        <Pencil size={18} />
                      </button>

                      <button>
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}