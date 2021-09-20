import axiosClient from "./axiosClient";

const TasksApi = {
  getAll(params) {
    const url = "/tasks";
    return axiosClient.get(url, { params });
  },

  postTask(params) {
    const url = "/tasks";
    return axiosClient.post(url, params);
  }
};
export default TasksApi;
