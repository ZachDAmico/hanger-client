import { NavLink, useNavigate } from "react-router-dom";

export const NavBar = () => {
  const navigate = useNavigate();
  return (
    <div className="h-[100%] w-[128px bg-black text-white flex flex-row items-center justify-around">
      {localStorage.getItem("hanger_token") !== null ? (
        <div
          className="navbar__item -translate-y-2 flex flex-row items-center gap-80 mt-8"
          style={{ lineHeight: "1.5" }}
        >
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
      {/* <div className="btn-navbar">
        <NavLink className="" to={"/"}>
          Home
        </NavLink>
      </div>
      <div className="navbar__item">
        <NavLink className="btn-navbar" to={"/profile"}>
          Profile
        </NavLink>
      </div> */}
    </div>
  );
};
