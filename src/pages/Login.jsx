import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Login = ({ setCurrentUser }) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const existDialog = useRef();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8000/login`, {
      method: "POST",

      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((authInfo) => {
        if (authInfo.token) {
          // if (authInfo.valid) {
          localStorage.setItem("hanger_token", JSON.stringify(authInfo));
          setCurrentUser(authInfo);
          navigate("/");
        } else {
          existDialog.current.showModal();
        }
      });
  };

  return (
    <div
      className="__login-background__  bg-black flex flex-col items-center justify-start min-h-screen bg-fixed"
      style={{
        backgroundImage: 'url("https://i.imgur.com/Aexb7zi.png")',
        backgroundSize: "2300px auto",
        backgroundPosition: "calc(15% - 15px) calc(0% - 300px)",
        backgroundRepeat: "no-repeat",
      }}
    >
      <main className="container--login">
        <dialog className="dialog dialog--auth" ref={existDialog}>
          <div>User does not exist</div>
          <button
            className="button--close"
            onClick={(e) => existDialog.current.close()}
          >
            Close
          </button>
        </dialog>

        <section className="flex items-center justify-center">
          <form
            className="form--login"
            onSubmit={handleLogin}
            style={{ color: "white" }}
          >
            <h1 className="text-4xl mt-7 mb-3">Hanger Management</h1>
            <h2 className="text-xl mb-10 flex justify-center">
              Please sign in
            </h2>
            <fieldset className="mb-4">
              <label htmlFor="username"> Username </label>
              <input
                type="username"
                id="inputUsername"
                value={username}
                onChange={(evt) => setUsername(evt.target.value)}
                className="form-control text-black"
                placeholder="Username"
                required
                autoFocus
              />
            </fieldset>
            <fieldset className="mb-4">
              <label htmlFor="inputPassword"> Password </label>
              <input
                type="password"
                id="inputPassword"
                value={password}
                onChange={(evt) => setPassword(evt.target.value)}
                className="form-control text-black"
                placeholder="Password"
              />
            </fieldset>
            <fieldset>
              <button
                type="submit"
                className="button p-3 rounded-md bg-red-500 text-black"
              >
                Sign in
              </button>
            </fieldset>
          </form>
        </section>
        <div className="loginLinks">
          <section className="link--register flex items-center justify-center">
            <Link
              className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
              to="/register"
            >
              Not a member yet?
            </Link>
          </section>
        </div>
      </main>
    </div>
  );
};
