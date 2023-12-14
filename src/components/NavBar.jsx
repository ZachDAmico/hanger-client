import { NavLink, useNavigate } from "react-router-dom";

export const NavBar = () => {
  const navigate = useNavigate();
  return (
    <div className="h-[100%] w-[128px] fixed z-1 top-0 left-0 bg-slate-500 overflow-x-hidden py-5 flex flex-col items-start justify-between">
      {localStorage.getItem("hanger_token") !== null ? (
        <div className="navbar__item -translate-y-2">
          <button
            className="btn-delete"
            onClick={() => {
              localStorage.removeItem("hanger_token");
              navigate("/login");
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <>
          <div className="navbar__item">
            <NavLink
              className="text-left underline text-blue-600 hover:text-purple-700"
              to={"/login"}
            >
              Login
            </NavLink>
          </div>
          <li className="navbar__item">
            <NavLink
              className="text-left underline text-blue-600 hover:text-purple-700"
              to={"/register"}
            >
              Register
            </NavLink>
          </li>
        </>
      )}
      <div className="btn-navbar">
        <NavLink className="" to={"/"}>
          Home
        </NavLink>
      </div>
      <div className="navbar__item">
        <NavLink className="btn-navbar" to={"/profile"}>
          Profile
        </NavLink>
      </div>
    </div>
  );
};
