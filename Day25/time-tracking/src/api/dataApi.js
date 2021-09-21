import axiosClient from './axiosClient';

const dataApi = {
  getTasks() {
    return axiosClient.get(`${process.env.REACT_APP_URL}/tasks`);
  },
  getTags() {
    return axiosClient.get(`${process.env.REACT_APP_URL}/tags`);
  },
  addTask(task) {
    return axiosClient.post(`${process.env.REACT_APP_URL}/tasks`, task);
  },
  deleteTask(index) {
    return axiosClient.delete(`${process.env.REACT_APP_URL}/tasks/${index}`);
  },
  updateTask(idTask, taskUpdate) {
    return axiosClient.patch(
      `${process.env.REACT_APP_URL}/tasks/${idTask}`,
      taskUpdate,
    );
  },
};

export default dataApi;
