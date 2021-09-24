import axiosClient from "./axiosClient"

const userApi = {
  async getUser() {
    const url = "/users"
    return await axiosClient.get(url)
  }
}
export default userApi
