import { useNavigate } from "react-router-dom";
import { Save, ArrowLeft } from "lucide-react";

export default function AddAlert() {

  const navigate = useNavigate();

  return (

    <div className="page">

      <div className="page-header">

        <div>

          <h2>Add Alert</h2>

          <p>Create New Industrial Alert</p>

        </div>

      </div>

      <div className="form-card">

        <div className="form-grid">

          <div className="form-group">

            <label>Customer</label>

            <select>

              <option>Select Customer</option>

              <option>BridgeStone</option>

              <option>CEAT</option>

              <option>MRF</option>

            </select>

          </div>

          <div className="form-group">

            <label>Device</label>

            <select>

              <option>Select Device</option>

              <option>SteamTrap-001</option>

              <option>SteamTrap-002</option>

            </select>

          </div>

          <div className="form-group">

            <label>Sensor</label>

            <select>

              <option>Select Sensor</option>

              <option>Temperature</option>

              <option>Pressure</option>

              <option>Steam Trap</option>

            </select>

          </div>

          <div className="form-group">

            <label>Alert Type</label>

            <select>

              <option>Full Leak</option>

              <option>Partial Leak</option>

              <option>Blocked</option>

              <option>Offline</option>

            </select>

          </div>

          <div className="form-group">

            <label>Severity</label>

            <select>

              <option>Critical</option>

              <option>Medium</option>

              <option>Low</option>

            </select>

          </div>

          <div className="form-group">

            <label>Status</label>

            <select>

              <option>Open</option>

              <option>Acknowledged</option>

              <option>Resolved</option>

            </select>

          </div>

          <div className="form-group full-width">

            <label>Description</label>

            <textarea
              rows="5"
              placeholder="Enter Alert Description..."
            />
          </div>

        </div>

        <div className="form-actions">

          <button
            className="cancel-btn"
            onClick={() => navigate("/alerts")}
          >

            <ArrowLeft size={18} />

            Cancel

          </button>

          <button className="save-btn">

            <Save size={18} />

            Save Alert

          </button>

        </div>

      </div>

    </div>

  );

}