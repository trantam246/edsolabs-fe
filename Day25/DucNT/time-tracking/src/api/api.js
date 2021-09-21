import axios from "axios";

export const getTasks = async () => {
  return await axios.get(`${process.env.REACT_APP_TASKS}`);
};
export const getTags = async () => {
  return await axios.get(`${process.env.REACT_APP_TAGS}`);
};
export const addTasks = async (task) => {
  return await axios.post(`${process.env.REACT_APP_TASKS}`, task);
};
export const updateTasks = async (id, obj) => {
  return await axios.patch(`${process.env.REACT_APP_TASKS}/${id}`, obj);
};
export const removeTasks = async (id) => {
  return await axios.delete(`${process.env.REACT_APP_TASKS}/${id}`);
};
