import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Save,
  ArrowLeft,
  Upload,
  Building2,
} from "lucide-react";

import "../styles/AddOrganization.css";

export default function AddOrganization() {

  const navigate = useNavigate();

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

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({

      ...formData,
      [name]: value,

    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    console.log(formData);

    // API Ready

    /*
    await fetch("http://localhost:8080/api/organizations",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(formData)
    });
    */

    alert("Organization Added Successfully");

    navigate("/organizations");

  };

  return (

    <div className="organization-form-page">

      <div className="form-header">

        <div>

          <h2>Add Organization</h2>

          <p>Create Industrial Organization</p>

        </div>

        <button
          className="back-btn"
          onClick={() => navigate("/organizations")}
        >

          <ArrowLeft size={18}/>

          Back

        </button>

      </div>

      <form
        className="organization-form"
        onSubmit={handleSubmit}
      >

        <div className="form-grid">

          <div className="form-group">

            <label>Organization Name *</label>

            <input
              type="text"
              name="organization_name"
              value={formData.organization_name}
              onChange={handleChange}
              required
            />

          </div>

          <div className="form-group">

            <label>Organization Code *</label>

            <input
              type="text"
              name="organization_code"
              value={formData.organization_code}
              onChange={handleChange}
              required
            />

          </div>

          <div className="form-group">

            <label>Industry Type</label>

            <select
              name="industry_type"
              value={formData.industry_type}
              onChange={handleChange}
            >

              <option value="">Select</option>

              <option>Tyre</option>

              <option>Steel</option>

              <option>Chemical</option>

              <option>Power</option>

              <option>Food</option>

              <option>Textile</option>

              <option>Oil & Gas</option>

            </select>

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

          <div className="form-group full">

            <label>Address</label>

            <textarea
              rows="4"
              name="address"
              value={formData.address}
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

              <option>ACTIVE</option>

              <option>INACTIVE</option>

            </select>

          </div>

          <div className="form-group">

            <label>Organization Logo</label>

            <input type="file"/>

          </div>

        </div>

        <div className="form-footer">

          <button
            type="submit"
            className="save-btn"
          >

            <Save size={18}/>

            Save Organization

          </button>

        </div>

      </form>

    </div>

  );

}