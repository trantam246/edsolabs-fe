/* eslint-disable import/no-anonymous-default-export */
import http from './http';
const getAdmin = () => {
  return http.get('/users/1');
};
const getTasks = () => {
  return http.get('/tasks');
};
const getTags = () => {
  return http.get('/tags');
};
const createTask = (data) => {
  return http.post('/tasks', data);
};
const updateTask = (id, data) => {
  return http.put(`/tasks/${id}`, data);
};
const removeTask = (id) => {
  return http.delete(`/tasks/${id}`);
};
export default {
  getAdmin,
  getTasks,
  getTags,
  createTask,
  updateTask,
  removeTask,
};
