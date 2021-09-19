import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getUser } from "../../utils/common";
import { Button,Form } from 'react-bootstrap';

function Login() {
  const history = useHistory();
  const [users, setUsers] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUser()
      .then((res) => res.data)
      .then((e) => {
        setData(e);
      });
  }, []);
 
  const handleSubmit = (e) => {
    e.preventDefault();
    if (users === "" || password === "") {
      alert("Vui lòng nhập tên đăng nhập mật khẩu");
      setLoading(false);
      } else if(users !== data[0].username) {
        setLoading(false);
          alert("user sai")
      } else if(password !== data[0].password) {
        setLoading(false);
        alert("password sai")
    }

    if (users === data[0].username && password === data[0].password) {
        localStorage.setItem("user", users);
        localStorage.setItem("password", password);
        history.push("/Timer");
      }
  }


  return (
    <div className="container-fluid d-flex justify-content-center">
  <div className="formLogin col-6 d-flex flex-column align-items-center">
    <Form  className="form" onSubmit={(e) => handleSubmit(e)} >
    <h2>Login</h2>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Username</Form.Label>
    <Form.Control 
      type="text"
      name="username"
      placeholder="username"
      onChange={(e) => setUsers(e.target.value)}
      value={users} />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control 
     type="password"
      name="password"
      placeholder="password"
      onChange={(e) => setPassword(e.target.value)}
      value={password} />
  </Form.Group>
  {error}
  <Button variant="primary" type="submit"className="btn btn-light btn-login">
    Submit
  </Button>
</Form>
</div>
</div>
   
  );
}

export default Login;