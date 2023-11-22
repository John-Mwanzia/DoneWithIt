import client from "./client";
const endpoint = "/users";

const register = (userInfo) => {
  return client.post(endpoint, userInfo);
};

export default { register };
