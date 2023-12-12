import { Navigate, Outlet } from "react-router-dom";
import { NavBar } from "./Navbar.jsx";

export const Authorized = () => {
  if (localStorage.getItem("hanger_token")) {
    return (
      <>
        {/* double check NavBar import is correct */}
        <NavBar />
        <main className="p-4">
          <Outlet />
        </main>
      </>
    );
  }
  return <Navigate to="/login" replace />;
};
