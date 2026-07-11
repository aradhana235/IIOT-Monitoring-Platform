import { Routes, Route } from "react-router-dom";


import Login from "../pages/Login";
import Otp from "../pages/Otp";

import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";


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





function AppRoutes(){


return (

<Routes>



{/* =====================
    PUBLIC ROUTES
===================== */}


<Route 
    path="/"
    element={<Login />}
/>


<Route
    path="/login"
    element={<Login />}
/>


<Route
    path="/otp"
    element={<Otp />}
/>





{/* =====================
    PROTECTED ROUTES
===================== */}


<Route element={<ProtectedRoute />}>


<Route element={<Layout />}>



{/* Dashboard */}


<Route
    path="/home"
    element={<Home />}
/>


<Route
    path="/dashboard"
    element={<Dashboard />}
/>





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





{/* Devices */}


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




</Route>


</Route>


</Routes>

);


}



export default AppRoutes;