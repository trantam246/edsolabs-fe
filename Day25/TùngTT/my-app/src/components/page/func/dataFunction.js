import http from './useData'
const getAll = () => {
  return http.get("/tasks");
};

const get = id => {
  return http.get(`/tasks/${id}`);
};

const create = data => {
  return http.post("/tasks", data);
};

const update = (id, data) => {
  return http.put(`/tasks/${id}`, data);
};

const remove = id => {
  return http.delete(`/tasks/${id}`);
};
const getTag = () => {
  return http.get("/tags");
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  getTag
};