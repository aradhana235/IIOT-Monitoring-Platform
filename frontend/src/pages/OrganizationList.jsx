import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Search,
  Eye,
  Pencil,
  Trash2,
  Building2,
} from "lucide-react";

import DeleteModal from "./DeleteModal";
import "../styles/Organization.css";

export default function OrganizationList() {
  const navigate = useNavigate();

  const [organizations, setOrganizations] = useState([]);
  const [filteredOrganizations, setFilteredOrganizations] = useState([]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const [loading, setLoading] = useState(true);

  const [selectedOrganization, setSelectedOrganization] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    loadOrganizations();
  }, []);

  useEffect(() => {
    filterOrganizations();
  }, [search, statusFilter, organizations]);

  const loadOrganizations = async () => {
    setLoading(true);

    // API Ready

    /*
    const res = await fetch("http://localhost:8080/api/organizations");
    const data = await res.json();
    setOrganizations(data);
    */

    const data = [
      {
        id: 1,
        organization_name: "MRF Limited",
        organization_code: "MRF001",
        industry_type: "Tyre",
        email: "admin@mrf.com",
        phone: "9876543210",
        city: "Chennai",
        state: "Tamil Nadu",
        country: "India",
        status: "ACTIVE",
      },
      {
        id: 2,
        organization_name: "Tata Steel",
        organization_code: "TS001",
        industry_type: "Steel",
        email: "admin@tatasteel.com",
        phone: "9876543211",
        city: "Jamshedpur",
        state: "Jharkhand",
        country: "India",
        status: "ACTIVE",
      },
      {
        id: 3,
        organization_name: "Reliance Industries",
        organization_code: "REL001",
        industry_type: "Oil & Gas",
        email: "admin@ril.com",
        phone: "9988776655",
        city: "Mumbai",
        state: "Maharashtra",
        country: "India",
        status: "INACTIVE",
      },
    ];

    setOrganizations(data);
    setLoading(false);
  };

  const filterOrganizations = () => {
    let data = [...organizations];

    if (search !== "") {
      data = data.filter(
        (item) =>
          item.organization_name
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          item.organization_code
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          item.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (statusFilter !== "ALL") {
      data = data.filter((item) => item.status === statusFilter);
    }

    setFilteredOrganizations(data);
  };

  const deleteOrganization = () => {
    setOrganizations((prev) =>
      prev.filter((item) => item.id !== selectedOrganization.id)
    );

    setShowDeleteModal(false);
  };

  return (
    <div className="organization-page">
      {/* Header */}

      <div className="page-header">
        <div>
          <h2>Organization Management</h2>
          <p>Manage Industrial Organizations</p>
        </div>

        <button
          className="add-btn"
          onClick={() => navigate("/organizations/add")}
        >
          <Plus size={18} />
          Add Organization
        </button>
      </div>

      {/* Search */}

      <div className="top-bar">
        <div className="search-box">
          <Search size={18} />

          <input
            type="text"
            placeholder="Search organization..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          className="status-filter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="ALL">All Status</option>
          <option value="ACTIVE">Active</option>
          <option value="INACTIVE">Inactive</option>
        </select>
      </div>

      {/* Summary */}

      <div className="summary-cards">
        <div className="summary-card">
          <h2>{organizations.length}</h2>
          <p>Total Organizations</p>
        </div>

        <div className="summary-card active">
          <h2>
            {
              organizations.filter((item) => item.status === "ACTIVE").length
            }
          </h2>

          <p>Active</p>
        </div>

        <div className="summary-card inactive">
          <h2>
            {
              organizations.filter((item) => item.status === "INACTIVE").length
            }
          </h2>

          <p>Inactive</p>
        </div>
      </div>

      {/* Table */}

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Logo</th>
              <th>Name</th>
              <th>Code</th>
              <th>Industry</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Location</th>
              <th>Status</th>
              <th width="170">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="9" className="loading">
                  Loading...
                </td>
              </tr>
            ) : filteredOrganizations.length === 0 ? (
              <tr>
                <td colSpan="9">
                  <div className="empty-state">
                    <Building2 size={60} />

                    <h3>No Organization Found</h3>

                    <p>Create your first organization.</p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredOrganizations.map((org) => (
                <tr key={org.id}>
                  <td>
                    <div className="logo-circle">
                      {org.organization_name.charAt(0)}
                    </div>
                  </td>

                  <td>{org.organization_name}</td>

                  <td>{org.organization_code}</td>

                  <td>{org.industry_type}</td>

                  <td>{org.email}</td>

                  <td>{org.phone}</td>

                  <td>
                    {org.city}, {org.country}
                  </td>

                  <td>
                    <span
                      className={
                        org.status === "ACTIVE"
                          ? "status-active"
                          : "status-inactive"
                      }
                    >
                      {org.status}
                    </span>
                  </td>

                  <td>
                    <div className="action-buttons">
                      <button
                        className="view-btn"
                        onClick={() =>
                          navigate(`/organizations/view/${org.id}`)
                        }
                      >
                        <Eye size={18} />
                      </button>

                      <button
                        className="edit-btn"
                        onClick={() =>
                          navigate(`/organizations/edit/${org.id}`)
                        }
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() => {
                          setSelectedOrganization(org);
                          setShowDeleteModal(true);
                        }}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <DeleteModal
        open={showDeleteModal}
        title="Delete Organization"
        message={`Are you sure you want to delete "${selectedOrganization?.organization_name}"?`}
        onCancel={() => setShowDeleteModal(false)}
        onConfirm={deleteOrganization}
      />
    </div>
  );
}