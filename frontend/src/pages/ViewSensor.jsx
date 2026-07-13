import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Thermometer } from "lucide-react";
import "../styles/Form.css";

export default function ViewSensor() {

  const navigate = useNavigate();
  const { id } = useParams();

  // Dummy Data
  const sensor = {
    sensorId: id,
    sensorName: "Temperature Sensor",
    sensorType: "Temperature",
    device: "Steam Trap 01",
    unit: "°C",
    status: "ACTIVE",
    location: "Boiler Area",
    lastReading: "124.8 °C",
    description: "Steam temperature monitoring sensor.",
  };

  return (
    <div className="form-page">

      <div className="form-card">

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <div>
            <h2>Sensor Details</h2>
            <p>View Industrial IoT Sensor Information</p>
          </div>

          <button
            className="cancel-btn"
            onClick={() => navigate("/sensors")}
          >
            <ArrowLeft size={18} />
            Back
          </button>
        </div>

        <div className="details-grid">

          <div className="detail-box">
            <label>Sensor ID</label>
            <span>{sensor.sensorId}</span>
          </div>

          <div className="detail-box">
            <label>Sensor Name</label>
            <span>{sensor.sensorName}</span>
          </div>

          <div className="detail-box">
            <label>Sensor Type</label>
            <span>{sensor.sensorType}</span>
          </div>

          <div className="detail-box">
            <label>Device</label>
            <span>{sensor.device}</span>
          </div>

          <div className="detail-box">
            <label>Measurement Unit</label>
            <span>{sensor.unit}</span>
          </div>

          <div className="detail-box">
            <label>Status</label>

            <span
              className={
                sensor.status === "ACTIVE"
                  ? "active-badge"
                  : "inactive-badge"
              }
            >
              {sensor.status}
            </span>

          </div>

          <div className="detail-box">
            <label>Location</label>
            <span>{sensor.location}</span>
          </div>

          <div className="detail-box">
            <label>Last Reading</label>
            <span>{sensor.lastReading}</span>
          </div>

          <div className="detail-box full-width">
            <label>Description</label>
            <span>{sensor.description}</span>
          </div>

        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "30px",
          }}
        >
          <Thermometer size={70} color="#2563eb" />
        </div>

      </div>

    </div>
  );
}