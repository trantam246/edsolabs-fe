import baseAPI from "./baseAPI";

export default async function loginAPI(data) {
  return baseAPI.post("/tasks", data);
}
