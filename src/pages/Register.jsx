import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Register = ({ setCurrentUser }) => {
  const [email, setEmail] = useState("enter email");
  const [password, setPassword] = useState("enter password");
  const [firstName, setFirstName] = useState("enter your first name");
  const [lastName, setLastName] = useState("enter your last name");
  const [userName, setUserName] = useState("choose your username");
  const [imgUrl, setImgUrl] = useState("www.picyourimage.com");
  const existDialog = useRef();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8000/register`, {
      method: "POST",
      body: JSON.stringify({
        username: userName,
        email,
        password,
        first_name: firstName,
        last_name: lastName,
        img_url: imgUrl,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((authInfo) => {
        if (authInfo && authInfo.token) {
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
      className="__register-background__  bg-black flex flex-col items-center justify-start min-h-screen bg-fixed"
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
            onSubmit={handleRegister}
            style={{ color: "white" }}
          >
            <h1 className="text-4xl mt-7 mb-3">Hanger Management</h1>
            <h2 className="text-xl mb-10 flex justify-center">
              Register new account
            </h2>
            <fieldset className="mb-4">
              <label htmlFor="firstName"> First name: </label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(evt) => setFirstName(evt.target.value)}
                className="form-control text-black"
                placeholder=""
                required
                autoFocus
              />
            </fieldset>
            <fieldset className="mb-4">
              <label htmlFor="lastName"> Last name: </label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(evt) => setLastName(evt.target.value)}
                className="form-control text-black"
                placeholder=""
                required
                autoFocus
              />
            </fieldset>
            <fieldset className="mb-4">
              <label htmlFor="inputEmail"> User Name: </label>
              <input
                type="text"
                id="inputUsername"
                value={userName}
                onChange={(evt) => setUserName(evt.target.value)}
                className="form-control text-black"
                placeholder="User Name"
                required
                autoFocus
              />
            </fieldset>
            <fieldset className="mb-4">
              <label htmlFor="inputEmail"> Email address: </label>
              <input
                type="email"
                id="inputEmail"
                value={email}
                onChange={(evt) => setEmail(evt.target.value)}
                className="form-control text-black"
                placeholder="Email address"
                required
                autoFocus
              />
            </fieldset>
            <fieldset className="mb-4">
              <label htmlFor="inputPassword"> Password: </label>
              <input
                type="password"
                id="inputPassword"
                value={password}
                onChange={(evt) => setPassword(evt.target.value)}
                className="form-control text-black"
                placeholder="Password"
              />
            </fieldset>
            <fieldset className="mb-4">
              <label htmlFor="inputProfileImg"> Profile Image: </label>
              <input
                type="text"
                id="inputProfileImg"
                value={imgUrl}
                onChange={(evt) => setImgUrl(evt.target.value)}
                className="form-control text-black"
                placeholder="ImageUrl"
              />
            </fieldset>
            <fieldset>
              <button
                type="submit"
                className="button p-3 rounded-md bg-red-500 text-black"
              >
                Register
              </button>
            </fieldset>
          </form>
        </section>
        <div className="loginLinks flex items-center justify-center">
          <section className="link--register">
            <Link
              className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
              to="/login"
            >
              Already have an account?
            </Link>
          </section>
        </div>
      </main>
    </div>
  );
};
