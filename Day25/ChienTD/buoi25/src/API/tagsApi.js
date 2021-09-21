import axiosClient from "./axiosClient";

const TagsApi = {
  getAll(params) {
    const url = "/tags";
    return axiosClient.get(url, { params });
  },
};

export default TagsApi;
