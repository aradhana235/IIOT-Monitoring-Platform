import "../styles/Report.css";

export default function EditReport() {

    return (

        <div className="report-page">

            <div className="page-header">

                <h2>Edit Report</h2>

                <p>Update Report Information</p>

            </div>

            <div className="form-card">

                <div className="form-grid">

                    <div className="form-group">

                        <label>Report Name</label>

                        <input
                            type="text"
                            defaultValue="Steam Saving Report"
                        />

                    </div>

                    <div className="form-group">

                        <label>Report Type</label>

                        <select defaultValue="Monthly">

                            <option>Daily</option>
                            <option>Weekly</option>
                            <option>Monthly</option>
                            <option>Yearly</option>

                        </select>

                    </div>

                </div>

                <div className="form-actions">

                    <button className="refresh-btn">
                        Cancel
                    </button>

                    <button className="primary-btn">
                        Update Report
                    </button>

                </div>

            </div>

        </div>

    );

}