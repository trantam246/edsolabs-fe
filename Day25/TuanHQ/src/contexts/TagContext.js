import React, { useContext, createContext, useState, useEffect } from 'react';
import axios from 'axios';

const TagContext = createContext();

export const TagContextProvider = ({ children }) => {
  const [tags, setTags] = useState([]);

  const [snackbar, setSnackbar] = useState(false);
  const [contentSnackbat, setContentSnackbat] = useState(null);
  /** success, info, warning, error */
  const [statusSnackbar, setStatusSnackbar] = useState('success');

  /** get all tags in db */
  const getAllTags = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/tags`)
      .then((res) => {
        setTags(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getAllTags();
  }, []);

  /** call snackbar with content */
  const callSnackbar = (content, status) => {
    setSnackbar(true);
    setContentSnackbat(content);

    const statusList = ['success', 'warning', 'error', 'info'];
    if (statusList.includes(status)) {
      setStatusSnackbar(status);
    }

    setTimeout(() => {
      setSnackbar(false);
    }, 3000);
  };

  const data = {
    tags,
    snackbar,
    contentSnackbat,
    statusSnackbar,
    callSnackbar,
    setSnackbar,
  };
  return <TagContext.Provider value={data}>{children}</TagContext.Provider>;
};

export const useTagContext = () => {
  return useContext(TagContext);
};
