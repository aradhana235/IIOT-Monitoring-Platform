import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Otp from "../pages/Otp";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";

import ProtectedRoute from "./ProtectedRoute";
import Layout from "../components/Layout";

function AppRoutes() {

  return (

    <Routes>

      {/* Public Routes */}

      <Route path="/" element={<Login />} />

      <Route path="/login" element={<Login />} />

      <Route path="/otp" element={<Otp />} />


      {/* Protected Routes */}

      <Route element={<ProtectedRoute />}>

        <Route element={<Layout />}>

          <Route path="/home" element={<Home />} />

          <Route path="/dashboard" element={<Dashboard />} />

        </Route>

      </Route>

    </Routes>

  );

}

export default AppRoutes;