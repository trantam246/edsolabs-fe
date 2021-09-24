import axiosClient from "./axiosClient"

const studentApi = {
  getStudents() {
    const url = "/students"
    return axiosClient.get(url)
  },
}
export default studentApi
