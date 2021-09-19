import axiosClient from "./axiosClient"

const tagApi = {
  async getTag() {
    const url = "/tags"
    return await axiosClient.get(url)
  },
}
export default tagApi
