import baseAPI from "./baseAPI";

export default async function loginAPI(username, password) {
  return baseAPI.get("/users", {
    params: {
      username,
      password,
    },
  });
}
