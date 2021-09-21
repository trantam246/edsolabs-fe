import React, { useContext, createContext, useState } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [loginSuccess, setLoginSuccess] = useState(
    localStorage.getItem("user") ? true : false
  );

  const getAllUsers = () => {
    return axios.get(`${process.env.REACT_APP_API_URL}/users`);
  };

  const saveOnLocalStorage = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    setLoginSuccess(true);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setLoginSuccess(false);
  };

  const data = {
    name: "Sonhellu",
    getAllUsers,
    saveOnLocalStorage,
    logout,
    loginSuccess,
  };

  return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  return useContext(UserContext);
};
