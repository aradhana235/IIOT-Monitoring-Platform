import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Otp from "../pages/Otp";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";

<<<<<<< HEAD
import ProtectedRoute from "./ProtectedRoute";
import Layout from "../components/Layout";
=======
/* Layout */
import Layout from "../components/Layout";
import ProtectedRoute from "./ProtectedRoute";

/* Organization */
import OrganizationList from "../pages/OrganizationList";
import AddOrganization from "../pages/AddOrganization";
import EditOrganization from "../pages/EditOrganization";
import ViewOrganization from "../pages/ViewOrganization";

/* Device */
import DeviceList from "../pages/DeviceList";
import AddDevice from "../pages/AddDevice";
import EditDevice from "../pages/EditDevice";
import ViewDevice from "../pages/ViewDevice";
>>>>>>> 9e08fb9 (Initial commit)

function AppRoutes() {

  return (
<<<<<<< HEAD

=======
>>>>>>> 9e08fb9 (Initial commit)
    <Routes>

      {/* Public Routes */}

      <Route path="/" element={<Login />} />
<<<<<<< HEAD

      <Route path="/login" element={<Login />} />

      <Route path="/otp" element={<Otp />} />


=======
      <Route path="/login" element={<Login />} />
      <Route path="/otp" element={<Otp />} />

>>>>>>> 9e08fb9 (Initial commit)
      {/* Protected Routes */}

      <Route element={<ProtectedRoute />}>

        <Route element={<Layout />}>

<<<<<<< HEAD
          <Route path="/home" element={<Home />} />

          <Route path="/dashboard" element={<Dashboard />} />

=======
          {/* Dashboard */}

          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Organization */}

          <Route
            path="/organizations"
            element={<OrganizationList />}
          />

          <Route
            path="/organizations/add"
            element={<AddOrganization />}
          />

          <Route
            path="/organizations/edit/:id"
            element={<EditOrganization />}
          />

          <Route
            path="/organizations/view/:id"
            element={<ViewOrganization />}
          />

          {/* Device */}

          <Route
            path="/devices"
            element={<DeviceList />}
          />

          <Route
            path="/devices/add"
            element={<AddDevice />}
          />

          <Route
            path="/devices/edit/:id"
            element={<EditDevice />}
          />

          <Route
            path="/devices/view/:id"
            element={<ViewDevice />}
          />

>>>>>>> 9e08fb9 (Initial commit)
        </Route>

      </Route>

    </Routes>
<<<<<<< HEAD

  );

=======
  );
>>>>>>> 9e08fb9 (Initial commit)
}

export default AppRoutes;