import TasksApi from "./API/tasksApi";
import UsersApi from "./API/usersApi";
import Box from "@mui/material/Box";
import TagsApi from "./API/tagsApi";
import React, { useState, useEffect } from "react";
import Login from "./Login/Login";
import "./App.css";
import Home from "./home/home";
import DataContextProvider from "./context/dataContent";

function App() {
  const [listTasks, setListTaks] = useState([]);
  const [listUsers, setListUsers] = useState([]);
  const [listTags, setListTags] = useState([]);
  const [isLogin, setIsLogin] = useState(false);

  const onHandlerLogin = (props) => {
    setIsLogin(props);
  };

  // useEffect(() => {
  //   const fetchTasksList = async () => {
  //     try {
  //       const response = await TasksApi.getAll();
  //       setListTaks(response);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   const fetchUsersList = async () => {
  //     try {
  //       const response = await UsersApi.getAll();
  //       setListUsers(response);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   const fetchTagsList = async () => {
  //     try {
  //       const response = await TagsApi.getAll(); 
  //       setListTags(response);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchTasksList();
  //   fetchUsersList();
  //   fetchTagsList();
  // }, []);

  return (
    <DataContextProvider>
      <Box
        className="App"
        display="flex"
        justifyContent="center"
        width="100%"
        height="100vh"
        textAlign="center"
      >
        {isLogin ? (
          <Home data={isLogin} />
        ) : (
          <Login dataUser={listUsers} onLogin={onHandlerLogin} />
        )}
      </Box>
    </DataContextProvider>
  );
}

export default App;
