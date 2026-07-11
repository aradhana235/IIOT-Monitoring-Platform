import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AddDevice.css";

export default function AddDevice() {

  const navigate = useNavigate();

  const [device, setDevice] = useState({
    deviceId: "",
    deviceName: "",
    deviceType: "",
    organization: "",
    customer: "",
    plant: "",
    area: "",
    status: "ONLINE",
  });

  const handleChange = (e) => {
    setDevice({
      ...device,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(device);

    // Backend API
    // POST /api/devices

    navigate("/devices");
  };

  return (
    <div className="form-page">

      <div className="form-card">

        <h2>Add Device</h2>

        <form onSubmit={handleSubmit}>

          <div className="form-grid">

            <div>
              <label>Device ID</label>
              <input
                name="deviceId"
                value={device.deviceId}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Device Name</label>
              <input
                name="deviceName"
                value={device.deviceName}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Device Type</label>
              <select
                name="deviceType"
                value={device.deviceType}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option>Steam Trap</option>
                <option>Water Meter</option>
                <option>Flow Meter</option>
                <option>Gas Sensor</option>
                <option>Temperature Sensor</option>
              </select>
            </div>

            <div>
              <label>Organization</label>
              <select
                name="organization"
                value={device.organization}
                onChange={handleChange}
              >
                <option>Select</option>
                <option>MRF Ltd</option>
                <option>Tata Steel</option>
              </select>
            </div>

            <div>
              <label>Customer</label>
              <select
                name="customer"
                value={device.customer}
                onChange={handleChange}
              >
                <option>Select</option>
                <option>MRF Chennai</option>
                <option>Tata Jamshedpur</option>
              </select>
            </div>

            <div>
              <label>Plant</label>
              <select
                name="plant"
                value={device.plant}
                onChange={handleChange}
              >
                <option>Select</option>
                <option>Plant A</option>
                <option>Plant B</option>
              </select>
            </div>

            <div>
              <label>Area</label>
              <select
                name="area"
                value={device.area}
                onChange={handleChange}
              >
                <option>Select</option>
                <option>Boiler</option>
                <option>Utility</option>
                <option>Production</option>
              </select>
            </div>

            <div>
              <label>Status</label>
              <select
                name="status"
                value={device.status}
                onChange={handleChange}
              >
                <option>ONLINE</option>
                <option>OFFLINE</option>
              </select>
            </div>

          </div>

          <div className="form-actions">

            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate("/devices")}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="save-btn"
            >
              Save Device
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}