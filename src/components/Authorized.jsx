import { Navigate, Outlet } from "react-router-dom";
import { NavBar } from "./NavBar";

export const Authorized = () => {
  if (localStorage.getItem("hanger_token")) {
    return (
      <>
        {/* double check NavBar import is correct */}
        <NavBar />
        <main className="__authorized-container__">
          <Outlet />
        </main>
      </>
    );
  }
  return <Navigate to="/login" replace />;
};
