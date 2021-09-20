import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";

function Login(props) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [isAuthLogin, setIsAuthLogin] = useState(-1);
  const [userLocalStore, setUserLocalStore] = useState();
  const { dataUser } = props;
  const changeUser = (e) => {
    setUser(e.target.value);
  };
  const changePass = (e) => {
    setPass(e.target.value);
  };
  // const dataLocalStore = () => {
  //   if (userLocalStore) {
  //     const tkLocal = userLocalStore.username;
  //     const mkLocal = userLocalStore.password;
  //     if (
  //       dataUser.findIndex(
  //         (x) => x.username === tkLocal && x.password === mkLocal
  //       ) >= 0
  //     ) {
  //       setIsLogin(userLocalStore);
  //       props.onLogin(userLocalStore);
  //     }
  //   }
  // };
  const handlerSubmit = (e) => {
    e.preventDefault();
    props.onLogin(dataUser[isLogin]);
    if (dataUser[isLogin] === undefined) {
      alert(dataUser[isLogin])
      alert("tài khoản hoặc mật khẩu không chính xác");
    }
  };

  useEffect(() => {
    if (userLocalStore) {
      const tkLocal = userLocalStore.username;
      const mkLocal = userLocalStore.password;
      if (
        dataUser.findIndex(
          (x) => x.username === tkLocal && x.password === mkLocal
        ) >= 0
      ) {
        setIsLogin(
          dataUser.findIndex(
            (x) => x.username === tkLocal && x.password === mkLocal
          )
        );
        props.onLogin(userLocalStore);
      }
    } else {
      setIsAuthLogin(
        dataUser.findIndex((x) => x.username === user && x.password === pass)
      );
      if (isAuthLogin < 0) {
        setIsLogin(false);
      } else {
        setIsLogin(isAuthLogin);
        const tk = dataUser[isAuthLogin];
        localStorage.setItem("user", JSON.stringify(tk));
        setUserLocalStore(tk);
      }
    }
  }, [dataUser, isAuthLogin, user, pass, userLocalStore, props]);

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
