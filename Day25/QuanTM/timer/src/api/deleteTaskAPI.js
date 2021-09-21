import baseAPI from "./baseAPI";

export default async function loginAPI(id) {
  return baseAPI.delete(`/tasks/${id}`);
}
