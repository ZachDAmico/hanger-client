import { Route, Routes } from "react-router-dom";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { Authorized } from "./Authorized";
import { LandingPage } from "../pages/LandingPage";

export const ApplicationViews = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* Outlet element inside Authorized component so all remaining routes will render as children of Authorized - aka if user is authorized to view said routes */}
      <Route element={<Authorized />} />
      <Route path="/" element={<LandingPage />} />
    </Routes>
  );
};
