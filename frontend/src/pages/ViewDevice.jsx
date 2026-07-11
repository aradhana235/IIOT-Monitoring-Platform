import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Cpu,
  MapPin,
  Factory,
  Activity,
  Calendar,
} from "lucide-react";

import "../styles/ViewDevice.css";

export default function ViewDevice() {

  const navigate = useNavigate();

  // Backend API se baad me aayega
  const device = {
    id: "8d9d8c1d-a842-43f1-b71b-98b7d5c61a20",
    deviceName: "Steam Trap - 001",
    deviceType: "Steam Trap",
    plant: "MRF Chennai",
    area: "Boiler Section",
    status: "ONLINE",
    lastSeen: "10 Jul 2026 11:30 AM",
    description: "Main Steam Trap Device",
    createdAt: "01 Jul 2026",
    updatedAt: "10 Jul 2026",
  };

  return (
    <div className="view-device-page">

      <div className="page-header">

        <div>

          <h2>View Device</h2>

          <p>Complete Device Information</p>

        </div>

        <button
          className="back-btn"
          onClick={() => navigate("/devices")}
        >
          <ArrowLeft size={18} />
          Back
        </button>

      </div>

      <div className="device-card">

        <div className="device-avatar">

          <Cpu size={50} />

        </div>

        <div className="device-title">

          <h2>{device.deviceName}</h2>

          <span
            className={
              device.status === "ONLINE"
                ? "status online"
                : "status offline"
            }
          >
            {device.status}
          </span>

        </div>

      </div>

      <div className="details-grid">

        <div className="detail-box">
          <Cpu size={20} />
          <div>
            <label>Device ID</label>
            <p>{device.id}</p>
          </div>
        </div>

        <div className="detail-box">
          <Activity size={20} />
          <div>
            <label>Device Type</label>
            <p>{device.deviceType}</p>
          </div>
        </div>

        <div className="detail-box">
          <Factory size={20} />
          <div>
            <label>Plant</label>
            <p>{device.plant}</p>
          </div>
        </div>

        <div className="detail-box">
          <MapPin size={20} />
          <div>
            <label>Area</label>
            <p>{device.area}</p>
          </div>
        </div>

        <div className="detail-box">
          <Calendar size={20} />
          <div>
            <label>Last Seen</label>
            <p>{device.lastSeen}</p>
          </div>
        </div>

        <div className="detail-box">
          <Calendar size={20} />
          <div>
            <label>Created Date</label>
            <p>{device.createdAt}</p>
          </div>
        </div>

        <div className="detail-box">
          <Calendar size={20} />
          <div>
            <label>Updated Date</label>
            <p>{device.updatedAt}</p>
          </div>
        </div>

        <div className="detail-box full-width">
          <Activity size={20} />
          <div>
            <label>Description</label>
            <p>{device.description}</p>
          </div>
        </div>

      </div>

    </div>
  );
}