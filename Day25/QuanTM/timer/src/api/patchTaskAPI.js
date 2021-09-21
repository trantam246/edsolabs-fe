import baseAPI from "./baseAPI";

export default async function loginAPI(id, data) {
  return baseAPI.patch(`/tasks/${id}`, data);
}
