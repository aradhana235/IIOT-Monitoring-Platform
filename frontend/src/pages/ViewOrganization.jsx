import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  Factory,
  Globe,
  ArrowLeft,
} from "lucide-react";

import "../styles/ViewOrganization.css";

export default function ViewOrganization() {

  const navigate = useNavigate();
  const { id } = useParams();

  const [organization, setOrganization] = useState({});

  useEffect(() => {

    // ================= API =================

    /*
    fetch(`http://localhost:8080/api/organizations/${id}`)
      .then(res => res.json())
      .then(data => setOrganization(data));
    */

    // Dummy Data

    setOrganization({

      organization_name: "MRF Limited",

      organization_code: "MRF001",

      industry_type: "Tyre Manufacturing",

      email: "admin@mrf.com",

      phone: "9876543210",

      address: "Industrial Area, SIPCOT",

      city: "Chennai",

      state: "Tamil Nadu",

      country: "India",

      logo_url: "",

      status: "ACTIVE",

      created_at: "01-Jul-2026",

      updated_at: "10-Jul-2026"

    });

  }, [id]);

  return (

    <div className="view-page">

      <div className="view-header">

        <div>

          <h2>Organization Details</h2>

          <p>Industrial IoT Platform</p>

        </div>

        <button
          className="back-btn"
          onClick={() => navigate("/organizations")}
        >
          <ArrowLeft size={18}/>
          Back
        </button>

      </div>

      <div className="profile-card">

        <div className="profile-left">

          <div className="company-logo">

            {organization.organization_name?.charAt(0)}

          </div>

        </div>

        <div className="profile-right">

          <h2>{organization.organization_name}</h2>

          <p>{organization.organization_code}</p>

          <span
            className={
              organization.status === "ACTIVE"
                ? "status active"
                : "status inactive"
            }
          >
            {organization.status}
          </span>

        </div>

      </div>

      <div className="details-grid">

        <div className="detail-card">

          <Building2 size={22} />

          <div>

            <span>Organization</span>

            <h4>{organization.organization_name}</h4>

          </div>

        </div>

        <div className="detail-card">

          <Factory size={22} />

          <div>

            <span>Industry</span>

            <h4>{organization.industry_type}</h4>

          </div>

        </div>

        <div className="detail-card">

          <Mail size={22} />

          <div>

            <span>Email</span>

            <h4>{organization.email}</h4>

          </div>

        </div>

        <div className="detail-card">

          <Phone size={22} />

          <div>

            <span>Phone</span>

            <h4>{organization.phone}</h4>

          </div>

        </div>

        <div className="detail-card">

          <MapPin size={22} />

          <div>

            <span>Address</span>

            <h4>{organization.address}</h4>

          </div>

        </div>

        <div className="detail-card">

          <Globe size={22} />

          <div>

            <span>Location</span>

            <h4>

              {organization.city},

              {" "}

              {organization.state},

              {" "}

              {organization.country}

            </h4>

          </div>

        </div>

      </div>

      <div className="audit-card">

        <h3>Audit Information</h3>

        <div className="audit-row">

          <span>Created On</span>

          <strong>{organization.created_at}</strong>

        </div>

        <div className="audit-row">

          <span>Updated On</span>

          <strong>{organization.updated_at}</strong>

        </div>

      </div>

    </div>

  );

}