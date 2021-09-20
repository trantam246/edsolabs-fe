import React, { useState, useContext, useEffect } from "react";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";

import tasksAPI from "../../api/tasksAPI";
import tagsAPI from "../../api/tagsAPI";

const AppContext = React.createContext();
const theme = createTheme();

const getLocalUser = () => {
  const user = localStorage.getItem("user");
  if (user) {
    return JSON.parse(user);
  }
  return null;
};

const ContextProvider = (props) => {
  const [user, setUser] = useState(getLocalUser());
  const [tasks, setTasks] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    Promise.all([tasksAPI(), tagsAPI()]).then(([tasksRes, tagsRes]) => {
      setTags(tagsRes.data);
      setTasks(tasksRes.data);
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <AppContext.Provider
      value={{ user, setUser, tasks, setTasks, tags, setTags }}
    >
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, ContextProvider };
