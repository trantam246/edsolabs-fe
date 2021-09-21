import axiosClient from "./axiosClient";

const UsersApi = {
  getAll(params) {
    const url = "/users";
    return axiosClient.get(url, { params });
  },
};

export default UsersApi;
