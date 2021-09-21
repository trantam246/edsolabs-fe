import React, { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { DataContext } from "../context/dataContent";

function Login(props) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [isAuthLogin, setIsAuthLogin] = useState(-1);
  const [userLocalStore, setUserLocalStore] = useState();
  const {listUsers} = useContext(DataContext);

  const changeUser = (e) => {
    setUser(e.target.value);
  };
  const changePass = (e) => {
    setPass(e.target.value);
  };
  const handlerSubmit = (e) => {
    e.preventDefault();
    props.onLogin(listUsers[isLogin]);
    if (listUsers[isLogin] === undefined) {
      alert("tài khoản hoặc mật khẩu không chính xác");
    }
  };

  useEffect(() => {
    if (userLocalStore) {
      const tkLocal = userLocalStore.username;
      const mkLocal = userLocalStore.password;
      if (
        listUsers.findIndex(
          (x) => x.username === tkLocal && x.password === mkLocal
        ) >= 0
      ) {
        setIsLogin(
          listUsers.findIndex(
            (x) => x.username === tkLocal && x.password === mkLocal
          )
        );
        props.onLogin(userLocalStore);
      }
    } else {
      setIsAuthLogin(
        listUsers.findIndex((x) => x.username === user && x.password === pass)
      );
      if (isAuthLogin < 0) {
        setIsLogin(false);
      } else {
        setIsLogin(isAuthLogin);
        const tk = listUsers[isAuthLogin];
        localStorage.setItem("user", JSON.stringify(tk));
        setUserLocalStore(tk);
      }
    }
  }, [listUsers, isAuthLogin, user, pass, userLocalStore, props]);

  return (
    <Box
      width="500px"
      height="300px"
      bgcolor="lightblue"
      border={2}
      sx={{
        boxShadow: 3,
        bgcolor: "background.paper",
        m: 1,
        p: 1,
        mt: 10,
      }}
      borderRadius={5}
      textAlign="center"
    >
      <Box component="h1" sx={{ m: 0 }}>
        Login
      </Box>
      <Box
        component="form"
        onSubmit={handlerSubmit}
        width="300px"
        display="inline-block"
      >
        <Box>
          <Box component="label" display="block" textAlign="left">
            Username
          </Box>
          <TextField
            id="outlined-password-input"
            type="text"
            autoComplete="current-password"
            sx={{ mb: 2, width: "300px" }}
            onChange={changeUser}
          />
        </Box>
        <Box>
          <Box component="label" display="block" textAlign="left">
            Password
          </Box>
          <TextField
            id="outlined-password-input"
            type="password"
            autoComplete="current-password"
            sx={{ mb: 2, width: "300px" }}
            onChange={changePass}
          />
        </Box>
        <Box textAlign="right">
          <Button type="submit" variant="contained">
            Login
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Login;
