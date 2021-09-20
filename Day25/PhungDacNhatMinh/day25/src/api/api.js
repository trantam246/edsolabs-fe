import axios from "axios";

export const getUser = async () => {
  return await axios.get(`${process.env.REACT_APP_API_USER}`);
};
export const getTasks = async () => {
  return await axios.get(`${process.env.REACT_APP_API_TASK}`);
};
export const getTags = async () => {
  return await axios.get(`${process.env.REACT_APP_API_TAG}`);
};
export const createTasks = async (task) => {
  return await axios.post(`${process.env.REACT_APP_API_TASK}`, task);
};
export const updateTasks = async (id, obj) => {
  return await axios.patch(`${process.env.REACT_APP_API_TASK}/${id}`, obj);
};
export const deleteTasks = async (id) => {
  return await axios.delete(`${process.env.REACT_APP_API_TASK}/${id}`);
};
