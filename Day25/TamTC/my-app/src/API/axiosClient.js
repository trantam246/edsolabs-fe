import axios from "axios"
import queryString from "query-string"

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_USER_API,
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
})

axiosClient.interceptors.request.use(
  async (config) => config,
  (error) => {
    return Promise.reject(error)
  }
)
axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) return response.data
  },
  (error) => {
    return Promise.reject(error)
  }
)
export default axiosClient
