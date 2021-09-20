import React, { createContext, useState, useEffect } from "react";
import TagsApi from "../API/tagsApi";
import TasksApi from "../API/tasksApi";
import UsersApi from "../API/usersApi";

export const DataContext = createContext();

const DataContextProvider = ({ children }) => {
  const [listTasks, setListTaks] = useState([]);
  const [listUsers, setListUsers] = useState([]);
  const [listTags, setListTags] = useState([]);
  const [reload, setReload] = useState(0);

  // const onHandlerLogin = (props) => {
  //   setIsLogin(props);
  // };

  const onReload = () => {
    setReload(...(reload + 1));
  };
  useEffect(() => {
    const fetchTasksList = async () => {
      try {
        const response = await TasksApi.getAll();
        console.log(response.reverse());
        setListTaks(response);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchUsersList = async () => {
      try {
        const response = await UsersApi.getAll();
        console.log(response);
        setListUsers(response);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchTagsList = async () => {
      try {
        const response = await TagsApi.getAll();
        console.log(response);
        setListTags(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTasksList();
    fetchUsersList();
    fetchTagsList();
  }, [reload]);
  // Context data
  const ContextData = {
    listUsers,
    listTasks,
    listTags,
    reload,
    getReload() {
      setReload((num) => num + 1);
    },
    setReload,
  };

  // return provider - nhà kho
  return (
    <DataContext.Provider value={ContextData}>{children}</DataContext.Provider>
  );
};

export default DataContextProvider;
