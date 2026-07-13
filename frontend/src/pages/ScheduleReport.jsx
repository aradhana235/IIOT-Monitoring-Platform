import "../styles/Report.css";

export default function ScheduleReport() {

    return (

        <div className="report-page">

            <div className="page-header">

                <div>

                    <h2>Schedule Report</h2>

                    <p>
                        Automatically generate and email reports
                    </p>

                </div>

            </div>

            <div className="form-card">

                <div className="form-grid">

                    <div className="form-group">

                        <label>Schedule Name</label>

                        <input
                            type="text"
                            placeholder="Daily Steam Report"
                        />

                    </div>

                    <div className="form-group">

                        <label>Report Type</label>

                        <select>

                            <option>Steam Saving</option>

                            <option>Alert Report</option>

                            <option>Energy Report</option>

                            <option>Telemetry Report</option>

                        </select>

                    </div>

                    <div className="form-group">

                        <label>Customer</label>

                        <select>

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

                        <label>Frequency</label>

                        <select>

                            <option>Daily</option>

                            <option>Weekly</option>

                            <option>Monthly</option>

                        </select>

                    </div>

                    <div className="form-group">

                        <label>Time</label>

                        <input type="time"/>

                    </div>

                    <div className="form-group">

                        <label>Email</label>

                        <input
                            type="email"
                            placeholder="admin@company.com"
                        />

                    </div>

                    <div className="form-group">

                        <label>Format</label>

                        <select>

                            <option>PDF</option>

                            <option>Excel</option>

                            <option>CSV</option>

                        </select>

                    </div>

                </div>

                <div className="form-actions">

                    <button className="refresh-btn">

                        Cancel

                    </button>

                    <button className="primary-btn">

                        Save Schedule

                    </button>

                </div>

            </div>

        </div>

    );

}