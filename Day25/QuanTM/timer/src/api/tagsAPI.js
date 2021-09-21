import baseAPI from "./baseAPI";

const tagsAPI = async () => {
  return baseAPI.get("/tags");
};

export default tagsAPI;
