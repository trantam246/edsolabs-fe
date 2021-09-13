import React from "react";
import { Link } from "react-router-dom";

import signInLogo from "../images/login-logo.png";
import signUpLogo from "../images/signup-logo.png";
import userIcon from "../images/user.png";
import pwIcon from "../images/key.png";

export default function Authentication(props) {
  const { pathname } = props.location;
  const setUpPage =
    pathname === "/"
      ? {
          logo: signInLogo,
          theme: "l-login-theme",
          h2: "Welcome Back!",
          h1: "Please, Log In.",
          submit: "Continue",
          nav: "Create an Account",
          navLink: "/signup",
        }
      : {
          logo: signUpLogo,
          theme: "l-signup-theme",
          h2: "Hi there!",
          h1: "Let's Get Started",
          submit: "Create an Account",
          nav: "Log In",
          navLink: "/",
        };

  return (
    <main className={`${setUpPage.theme}`} id="container">
      <img src={setUpPage.logo} alt="logo" className="logo-image" />
      <section className="welcome-white grid-center">
        <h2 className="font-weight-400">{setUpPage.h2}</h2>
        <h1 className="font-weight-800 text-center">{setUpPage.h1}</h1>
      </section>
      <form className="form-container">
        <div className="input">
          <img src={userIcon} alt="username icon" className="icon" />
          <input type="text" name="username" placeholder="Username" />
        </div>
        <div className="input">
          <img src={pwIcon} alt="password icon" className="icon" />
          <input type="password" name="password" placeholder="Password" />
        </div>
        <div className="button-container">
          <button className="btn submit-btn">
            {setUpPage.submit}
            {pathname === "/" && (
              <i className="material-icons-outlined"> chevron_right </i>
            )}
          </button>
          <div className="separator-container">
            <hr className="line-separator" />
            <p className="text-separator">Or</p>
            <hr className="line-separator" />
          </div>
          <Link to={setUpPage.navLink} className="btn nav-btn grid-center">
            {setUpPage.nav}
          </Link>
        </div>
      </form>
    </main>
  );
}
