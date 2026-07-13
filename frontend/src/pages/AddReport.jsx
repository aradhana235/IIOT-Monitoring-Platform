import "../styles/Report.css";

export default function AddReport() {

  return (

    <div className="report-page">

      <div className="page-header">

        <div>

          <h2>Generate Report</h2>

          <p>Create Industrial IIoT Reports</p>

        </div>

      </div>

      <div className="form-card">

        <div className="form-grid">

          <div className="form-group">

            <label>Report Name</label>

            <input
              type="text"
              placeholder="Steam Saving Report"
            />

          </div>

          <div className="form-group">

            <label>Organization</label>

            <select>

              <option>Select Organization</option>

              <option>ABC Industries</option>

              <option>XYZ Industries</option>

            </select>

          </div>

          <div className="form-group">

            <label>Customer</label>

            <select>

              <option>Select Customer</option>

              <option>BridgeStone</option>

              <option>MRF</option>

              <option>CEAT</option>

            </select>

          </div>

          <div className="form-group">

            <label>Device</label>

            <select>

              <option>All Devices</option>

              <option>SteamTrap-101</option>

              <option>SteamTrap-205</option>

            </select>

          </div>

          <div className="form-group">

            <label>Report Type</label>

            <select>

              <option>Daily</option>

              <option>Weekly</option>

              <option>Monthly</option>

              <option>Yearly</option>

              <option>Custom</option>

            </select>

          </div>

          <div className="form-group">

            <label>Format</label>

            <select>

              <option>PDF</option>

              <option>Excel</option>

              <option>CSV</option>

            </select>

          </div>

          <div className="form-group">

            <label>Start Date</label>

            <input type="date"/>

          </div>

          <div className="form-group">

            <label>End Date</label>

            <input type="date"/>

          </div>

        </div>

        <div className="form-actions">

          <button className="refresh-btn">

            Cancel

          </button>

          <button className="primary-btn">

            Generate Report

          </button>

        </div>

      </div>

    </div>

  );

}