import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getUser } from "../../api/api";
Login.propTypes = {};

function Login() {
  const history = useHistory();
  const [users, setUsers] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => e.preventDefault();
  useEffect(() => {
    getUser()
      .then((res) => res.data)
      .then((e) => {
        setData(e);
      });
  }, []);
  const handleLogin = () => {
    if (users === "" || password === "") {
      setError("Have not entered user or password!");
    } else if (users !== data[0].username) {
      setError("User does not exist!");
    } else if (password !== data[0].password) {
      setError("wrong password!");
    } else if (users === data[0].username && password === data[0].password) {
      localStorage.setItem("user", users);
      localStorage.setItem("password", password);
      history.push("/Timer");
    }
  };

  return (
    <main className="container-fluid d-flex justify-content-center">
      <div className="Box col-6 d-flex flex-column align-items-center">
        <header className="Box__header">
          <h2>Login</h2>
        </header>
        <section className="Box__content d-flex justify-content-center">
          <form className="form">
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                name="username"
                placeholder="username"
                onChange={(e) => setUsers(e.target.value)}
                value={users}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
          </form>
        </section>
        {error && <div className="Box__error">{error}</div>}
        <footer className="Box__footer d-flex justify-content-end">
          <form action="" onSubmit={(e) => handleSubmit(e)}>
            <button
              type="submit"
              className="btn btn-light btn-login"
              onClick={handleLogin}
            >
              Login
            </button>
          </form>
        </footer>
      </div>
    </main>
  );
}

export default Login;
