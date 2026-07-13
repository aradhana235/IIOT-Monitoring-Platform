import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";

export default function EditAlert() {

  const navigate = useNavigate();

  return (

    <div className="page">

      <div className="page-header">

        <div>

          <h2>Edit Alert</h2>

          <p>Update Existing Alert</p>

        </div>

      </div>

      <div className="form-card">

        <div className="form-grid">

          <div className="form-group">

            <label>Customer</label>

            <select defaultValue="BridgeStone">

              <option>BridgeStone</option>
              <option>MRF</option>
              <option>CEAT</option>

            </select>

          </div>

          <div className="form-group">

            <label>Device</label>

            <select defaultValue="SteamTrap-001">

              <option>SteamTrap-001</option>
              <option>SteamTrap-002</option>

            </select>

          </div>

          <div className="form-group">

            <label>Sensor</label>

            <select defaultValue="Steam Trap">

              <option>Steam Trap</option>
              <option>Temperature</option>
              <option>Pressure</option>

            </select>

          </div>

          <div className="form-group">

            <label>Alert Type</label>

            <select defaultValue="Full Leak">

              <option>Full Leak</option>
              <option>Partial Leak</option>
              <option>Blocked</option>
              <option>Offline</option>

            </select>

          </div>

          <div className="form-group">

            <label>Severity</label>

            <select defaultValue="Critical">

              <option>Critical</option>
              <option>Medium</option>
              <option>Low</option>

            </select>

          </div>

          <div className="form-group">

            <label>Status</label>

            <select defaultValue="Open">

              <option>Open</option>
              <option>Acknowledged</option>
              <option>Resolved</option>

            </select>

          </div>

          <div className="form-group full-width">

            <label>Description</label>

            <textarea
              rows="5"
              defaultValue="Steam leakage detected continuously for the last 15 minutes."
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

            Update Alert

          </button>

        </div>

      </div>

    </div>

  );

}