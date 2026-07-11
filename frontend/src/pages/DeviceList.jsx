import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Search,
  Eye,
  Pencil,
  Trash2,
  Cpu,
} from "lucide-react";

import "../styles/Device.css";

export default function DeviceList() {

  const navigate = useNavigate();

  const [devices, setDevices] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {

    loadDevices();

  }, []);

  const loadDevices = () => {

    setDevices([
      {
        id: "ST-1001",
        name: "Steam Trap 01",
        type: "Steam Trap",
        plant: "MRF Chennai",
        area: "Boiler Area",
        status: "ONLINE",
        lastSeen: "2 min ago",
      },
      {
        id: "WT-1002",
        name: "Water Meter 01",
        type: "Water Meter",
        plant: "MRF Chennai",
        area: "Utility",
        status: "OFFLINE",
        lastSeen: "1 hour ago",
      },
      {
        id: "GS-1003",
        name: "Gas Sensor",
        type: "Gas Sensor",
        plant: "Tata Steel",
        area: "Blast Furnace",
        status: "ONLINE",
        lastSeen: "Just Now",
      },
    ]);

  };

  const filteredDevices = devices.filter(
    (device) =>
      device.name.toLowerCase().includes(search.toLowerCase()) ||
      device.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="device-page">

      <div className="page-header">

        <div>
          <h2>Device Management</h2>
          <p>Manage Industrial IoT Devices</p>
        </div>

        <button
          className="add-btn"
          onClick={() => navigate("/devices/add")}
        >
          <Plus size={18} />
          Add Device
        </button>

      </div>

      <div className="top-bar">

        <div className="search-box">

          <Search size={18} />

          <input
            type="text"
            placeholder="Search Device..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

      </div>

      <div className="summary-cards">

        <div className="summary-card">
          <h2>{devices.length}</h2>
          <span>Total Devices</span>
        </div>

        <div className="summary-card green">
          <h2>
            {devices.filter((d) => d.status === "ONLINE").length}
          </h2>
          <span>Online</span>
        </div>

        <div className="summary-card red">
          <h2>
            {devices.filter((d) => d.status === "OFFLINE").length}
          </h2>
          <span>Offline</span>
        </div>

      </div>

      <div className="table-wrapper">

        <table>

          <thead>

            <tr>

              <th>Device ID</th>

              <th>Name</th>

              <th>Type</th>

              <th>Plant</th>

              <th>Area</th>

              <th>Status</th>

              <th>Last Seen</th>

              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {filteredDevices.length === 0 ? (

              <tr>

                <td colSpan="8">

                  <div className="empty-state">

                    <Cpu size={60} />

                    <h3>No Device Found</h3>

                  </div>

                </td>

              </tr>

            ) : (

              filteredDevices.map((device) => (

                <tr key={device.id}>

                  <td>{device.id}</td>

                  <td>{device.name}</td>

                  <td>{device.type}</td>

                  <td>{device.plant}</td>

                  <td>{device.area}</td>

                  <td>

                    <span
                      className={
                        device.status === "ONLINE"
                          ? "active-badge"
                          : "inactive-badge"
                      }
                    >
                      {device.status}
                    </span>

                  </td>

                  <td>{device.lastSeen}</td>

                  <td>

                    <div className="action-btns">

                      <button
                        onClick={() =>
                          navigate(`/devices/view/${device.id}`)
                        }
                      >
                        <Eye size={18} />
                      </button>

                      <button
                        onClick={() =>
                          navigate(`/devices/edit/${device.id}`)
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