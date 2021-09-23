import React, { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";

const TagContext = createContext();

export const TagContextProvider = ({ children }) => {
  const [tags, setTags] = useState([]);
  const [notify, setNotify] = useState(false);
  const [notifyTitle, setNotifyTitle] = useState("");
  const [statusNotify, setStatusNotify] = useState("");

  useEffect(() => {
    getAllTags();
  }, []);

  const getAllTags = () => {
    axios
      .get(`http://localhost:3004/tags`)
      .then((res) => {
        setTags(res.data);
      })
      .catch((e) => {
      });
  };

  const callSnackbar = (content, status) => {
    setNotify(true);
    setNotifyTitle(content);

    if (["success", "warning", "error", "info"].includes(status)) {
      setStatusNotify(status);
    }
    setTimeout(() => {
      setNotify(false);
    }, 5000);
  };

  return (
    <TagContext.Provider
      value={{
        tags,
        notify,
        notifyTitle,
        statusNotify,
        callSnackbar,
        setNotify,
      }}
    >
      {children}
    </TagContext.Provider>
  );
};

export const useTagContext = () => {
  return useContext(TagContext);
};