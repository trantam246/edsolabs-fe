import axiosClient from "./axiosClient";

const TasksApi = {
  getAll(params) {
    const url = "/tasks";
    return axiosClient.get(url, { params });
  },

  postTask(params) {
    const url = "/tasks";
    return axiosClient.post(url, params);
  },

  deleteTask(id) {
    const url = "/tasks/" + id;
    return axiosClient.delete(url);
  },

  putTask(id, params) {
    const url = "/tasks/" + id;
    return axiosClient.put(url, params);
  }
};
export default TasksApi;
