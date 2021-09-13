import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import statusBar from "../assets/StatusBar.svg";
import maskGroup from "../assets/MaskGroup.svg";
import continues from "../assets/Continue.svg";
import group from "../assets/Group.svg";
import key from "../assets/key.svg";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = (e) => {
    e.preventDefault();
    // console.log(email, password);
  };
  return (
    <main className="container container__signin">
      <header className="hearder">
        <img src={statusBar} alt="Status Bar" />
        <img src={maskGroup} alt="Mask Group" className="header__image" />
        <div className="heaer__title">
          <h4>Welcome Back</h4>
          <h2>Please, Log In.</h2>
        </div>
      </header>
      <form onSubmit={(event) => handleLogin(event)} className="form">
        <div className="form__user">
          <i className="form__icon far fa-user"></i>
          <input
            type="email"
            name="email"
            placeholder="johnsondoe@nomail.com"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form__pass">
          <img className="form__icon" src={key} alt="pass" />
          <input
            type="password"
            name="password"
            placeholder="********************"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn__continue">
          <img src={continues} alt="Continue" />
        </button>
        <img src={group} alt="Group" className="form__unline" />
        <Link to="/signout" className="btn btn__custom">
          Create an Account
        </Link>
      </form>
    </main>
  );
};

export default SignIn;
