import { useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  Pencil,
  CheckCircle,
  TriangleAlert,
  Cpu,
  Thermometer,
  Building2,
  Calendar,
  User,
} from "lucide-react";

export default function ViewAlert() {

  const navigate = useNavigate();

  return (

    <div className="page">

      <div className="page-header">

        <div>

          <h2>Alert Details</h2>

          <p>Industrial IIoT Alert Information</p>

        </div>

        <div className="header-actions">

          <button
            className="cancel-btn"
            onClick={() => navigate("/alerts")}
          >

            <ArrowLeft size={18} />

            Back

          </button>

          <button
            className="save-btn"
            onClick={() => navigate("/alerts/edit/1")}
          >

            <Pencil size={18} />

            Edit

          </button>

        </div>

      </div>

      {/* Basic Details */}

      <div className="detail-card">

        <h3>Basic Information</h3>

        <div className="detail-grid">

          <div>

            <label>Alert ID</label>

            <p>ALT-000001</p>

          </div>

          <div>

            <label>Status</label>

            <span className="status open">

              Open

            </span>

          </div>

          <div>

            <label>Severity</label>

            <span className="severity critical">

              Critical

            </span>

          </div>

          <div>

            <label>Alert Type</label>

            <p>Full Steam Leak</p>

          </div>

        </div>

      </div>

      {/* Device */}

      <div className="detail-card">

        <h3>Device Information</h3>

        <div className="detail-grid">

          <div>

            <label>Organization</label>

            <p>

              <Building2 size={16}/>

              ABC Industries

            </p>

          </div>

          <div>

            <label>Customer</label>

            <p>BridgeStone</p>

          </div>

          <div>

            <label>Device</label>

            <p>

              <Cpu size={16}/>

              SteamTrap-001

            </p>

          </div>

          <div>

            <label>Sensor</label>

            <p>

              <Thermometer size={16}/>

              Steam Sensor

            </p>

          </div>

        </div>

      </div>

      {/* Threshold */}

      <div className="detail-card">

        <h3>Threshold Information</h3>

        <div className="detail-grid">

          <div>

            <label>Threshold Value</label>

            <p>180 °C</p>

          </div>

          <div>

            <label>Current Value</label>

            <p>245 °C</p>

          </div>

          <div>

            <label>Generated At</label>

            <p>

              <Calendar size={16}/>

              14 Jul 2026 10:45 AM

            </p>

          </div>

          <div>

            <label>Assigned To</label>

            <p>

              <User size={16}/>

              Maintenance Team

            </p>

          </div>

        </div>

      </div>

      {/* Description */}

      <div className="detail-card">

        <h3>Description</h3>

        <p className="description">

          Steam leakage detected continuously for more than
          15 minutes.

          Device crossed configured threshold.

          Immediate inspection is recommended.

        </p>

      </div>

      {/* Footer */}

      <div className="form-actions">

        <button className="save-btn">

          <CheckCircle size={18}/>

          Resolve Alert

        </button>

      </div>

    </div>

  );

}