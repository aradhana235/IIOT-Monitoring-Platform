import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/AddDevice.css";

export default function EditDevice() {

  const navigate = useNavigate();
  const { id } = useParams();

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

  useEffect(() => {

    // Backend API
    // GET /api/devices/{id}

    setDevice({
      deviceId: "DEV001",
      deviceName: "Steam Trap 01",
      deviceType: "Steam Trap",
      organization: "MRF Ltd",
      customer: "MRF Chennai",
      plant: "Plant A",
      area: "Boiler",
      status: "ONLINE",
    });

  }, [id]);

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
    // PUT /api/devices/{id}

    alert("Device Updated Successfully");

    navigate("/devices");
  };

  return (
    <div className="form-page">

      <div className="form-card">

        <h2>Edit Device</h2>

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
              Update Device
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}