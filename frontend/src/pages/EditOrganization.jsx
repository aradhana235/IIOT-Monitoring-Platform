import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/AddOrganization.css";

export default function EditOrganization() {

  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    organization_name: "",
    organization_code: "",
    industry_type: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "",
    logo_url: "",
    status: "ACTIVE",
  });

  useEffect(() => {

    // ================= API =================

    /*
    fetch(`http://localhost:8080/api/organizations/${id}`)
      .then(res => res.json())
      .then(data => setFormData(data));
    */

    // Dummy Data

    setFormData({
      organization_name: "MRF Limited",
      organization_code: "MRF001",
      industry_type: "Tyre",
      email: "admin@mrf.com",
      phone: "9876543210",
      address: "Industrial Area",
      city: "Chennai",
      state: "Tamil Nadu",
      country: "India",
      logo_url: "",
      status: "ACTIVE",
    });

  }, [id]);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    /*
    fetch(`http://localhost:8080/api/organizations/${id}`,{
      method:"PUT",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(formData)
    });
    */

    alert("Organization Updated Successfully");

    navigate("/organizations");
  };

  return (

    <div className="add-org-page">

      <div className="form-header">

        <h2>Edit Organization</h2>

        <p>Update organization details</p>

      </div>

      <form
        className="organization-form"
        onSubmit={handleSubmit}
      >

        <div className="form-grid">

          <div className="form-group">
            <label>Organization Name</label>
            <input
              type="text"
              name="organization_name"
              value={formData.organization_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Organization Code</label>
            <input
              type="text"
              name="organization_code"
              value={formData.organization_code}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Industry Type</label>
            <input
              type="text"
              name="industry_type"
              value={formData.industry_type}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="form-group full">
            <label>Address</label>
            <textarea
              rows="3"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>State</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Country</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Logo URL</label>
            <input
              type="text"
              name="logo_url"
              value={formData.logo_url}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Status</label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="ACTIVE">ACTIVE</option>
              <option value="INACTIVE">INACTIVE</option>
            </select>

          </div>

        </div>

        <div className="form-actions">

          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate("/organizations")}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="save-btn"
          >
            Update Organization
          </button>

        </div>

      </form>

    </div>

  );

}