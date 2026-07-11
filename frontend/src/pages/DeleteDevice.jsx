import { useNavigate, useParams } from "react-router-dom";
import { Trash2, ArrowLeft } from "lucide-react";
import { useState } from "react";

import "../styles/DeleteDevice.css";

export default function DeleteDevice() {

  const navigate = useNavigate();
  const { id } = useParams();

  // Backend se baad me aayega
  const [device] = useState({
    id: id,
    deviceName: "Steam Trap-001",
    deviceType: "Steam Trap",
    plant: "MRF Chennai",
    area: "Boiler Section",
  });

  const handleDelete = async () => {

    // Backend API
    // await axios.delete(`http://localhost:8080/api/devices/${id}`);

    alert("Device Deleted Successfully");

    navigate("/devices");
  };

  return (
    <div className="delete-device-page">

      <div className="delete-card">

        <div className="delete-icon">
          <Trash2 size={60} />
        </div>

        <h2>Delete Device</h2>

        <p>
          Are you sure you want to delete this device?
        </p>

        <div className="device-info">

          <div>
            <label>Device Name</label>
            <span>{device.deviceName}</span>
          </div>

          <div>
            <label>Device Type</label>
            <span>{device.deviceType}</span>
          </div>

          <div>
            <label>Plant</label>
            <span>{device.plant}</span>
          </div>

          <div>
            <label>Area</label>
            <span>{device.area}</span>
          </div>

        </div>

        <div className="delete-buttons">

          <button
            className="back-btn"
            onClick={() => navigate("/devices")}
          >
            <ArrowLeft size={18} />
            Cancel
          </button>

          <button
            className="delete-btn"
            onClick={handleDelete}
          >
            <Trash2 size={18} />
            Delete Device
          </button>

        </div>

      </div>

    </div>
  );
}