import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Form.css";

export default function AddSensor() {

  const navigate = useNavigate();

  const [sensor, setSensor] = useState({
    sensorId: "",
    sensorName: "",
    sensorType: "",
    device: "",
    unit: "",
    status: "ACTIVE",
    location: "",
    description: "",
  });

  const handleChange = (e) => {
    setSensor({
      ...sensor,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(sensor);

    alert("Sensor Added Successfully");

    navigate("/sensors");
  };

  return (
    <div className="form-page">

      <div className="form-card">

        <h2>Add Sensor</h2>

        <p>Create a new Industrial IoT Sensor</p>

        <form onSubmit={handleSubmit}>

          <div className="form-grid">

            <div className="form-group">
              <label>Sensor ID</label>
              <input
                type="text"
                name="sensorId"
                value={sensor.sensorId}
                onChange={handleChange}
                placeholder="TS-1001"
                required
              />
            </div>

            <div className="form-group">
              <label>Sensor Name</label>
              <input
                type="text"
                name="sensorName"
                value={sensor.sensorName}
                onChange={handleChange}
                placeholder="Temperature Sensor"
                required
              />
            </div>

            <div className="form-group">
              <label>Sensor Type</label>
              <select
                name="sensorType"
                value={sensor.sensorType}
                onChange={handleChange}
                required
              >
                <option value="">Select Type</option>
                <option>Temperature</option>
                <option>Pressure</option>
                <option>Flow</option>
                <option>Humidity</option>
                <option>Gas</option>
                <option>Current</option>
                <option>Voltage</option>
                <option>Steam Trap</option>
              </select>
            </div>

            <div className="form-group">
              <label>Device</label>
              <select
                name="device"
                value={sensor.device}
                onChange={handleChange}
                required
              >
                <option value="">Select Device</option>
                <option>Steam Trap 01</option>
                <option>Steam Trap 02</option>
                <option>Boiler 01</option>
                <option>Water Meter 01</option>
              </select>
            </div>

            <div className="form-group">
              <label>Measurement Unit</label>
              <input
                type="text"
                name="unit"
                value={sensor.unit}
                onChange={handleChange}
                placeholder="°C / Bar / L/min"
              />
            </div>

            <div className="form-group">
              <label>Status</label>
              <select
                name="status"
                value={sensor.status}
                onChange={handleChange}
              >
                <option>ACTIVE</option>
                <option>INACTIVE</option>
                <option>MAINTENANCE</option>
              </select>
            </div>

            <div className="form-group full-width">
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={sensor.location}
                onChange={handleChange}
                placeholder="Boiler Area"
              />
            </div>

            <div className="form-group full-width">
              <label>Description</label>
              <textarea
                rows="4"
                name="description"
                value={sensor.description}
                onChange={handleChange}
                placeholder="Enter description..."
              />
            </div>

          </div>

          <div className="form-buttons">

            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate("/sensors")}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="save-btn"
            >
              Save Sensor
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}