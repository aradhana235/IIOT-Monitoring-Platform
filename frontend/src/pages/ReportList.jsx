import "../styles/Report.css";

import ReportCards from "../components/Dashboard/ReportCards";
import ReportFilter from "../components/Dashboard/ReportFilter";
import ReportTable from "../components/Dashboard/ReportTable";

export default function ReportList() {

    return (

        <div className="report-page">

            <div className="page-header">

                <div>

                    <h2>Report Management</h2>

                    <p>
                        Generate and download Industrial IIoT reports
                    </p>

                </div>

                <div className="header-actions">

                    <button className="refresh-btn">

                        Refresh

                    </button>

                    <button className="primary-btn">

                        + Generate Report

                    </button>

                </div>

            </div>

            <ReportCards />

            <ReportFilter />

            <ReportTable />

        </div>

    );

}