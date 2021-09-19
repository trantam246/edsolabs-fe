import axiosClient from "./axiosClient"

const taskApi = {
  async getTask() {
    const url = "/tasks"
    return await axiosClient.get(url)
  },
  async addTask(task) {
    const url = "/tasks"
    const request = { ...task }
    return await axiosClient.post(url, request)
  },
  async updateTask(task, id) {
    const url = "/tasks/" + id
    const request = { ...task }
    return await axiosClient.put(url, request)
  },
}
export default taskApi
