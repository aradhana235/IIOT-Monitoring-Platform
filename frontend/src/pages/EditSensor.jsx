import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/Form.css";

export default function EditSensor() {

  const navigate = useNavigate();
  const { id } = useParams();

  const [sensor, setSensor] = useState({
    sensorId: id,
    sensorName: "Temperature Sensor",
    sensorType: "Temperature",
    device: "Steam Trap 01",
    unit: "°C",
    status: "ACTIVE",
    location: "Boiler Area",
    description: "Steam Temperature Monitoring Sensor",
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

    alert("Sensor Updated Successfully");

    navigate("/sensors");
  };

  return (
    <div className="form-page">

      <div className="form-card">

        <h2>Edit Sensor</h2>

        <p>Update Sensor Information</p>

        <form onSubmit={handleSubmit}>

          <div className="form-grid">

            <div className="form-group">
              <label>Sensor ID</label>
              <input
                type="text"
                name="sensorId"
                value={sensor.sensorId}
                disabled
              />
            </div>

            <div className="form-group">
              <label>Sensor Name</label>
              <input
                type="text"
                name="sensorName"
                value={sensor.sensorName}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Sensor Type</label>
              <select
                name="sensorType"
                value={sensor.sensorType}
                onChange={handleChange}
              >
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
              >
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
              />
            </div>

            <div className="form-group full-width">
              <label>Description</label>
              <textarea
                rows="4"
                name="description"
                value={sensor.description}
                onChange={handleChange}
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
              Update Sensor
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}