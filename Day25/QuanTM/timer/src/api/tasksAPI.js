import baseAPI from "./baseAPI";

const taskAPI = async () => {
  return baseAPI.get("/tasks");
};

export default taskAPI;
